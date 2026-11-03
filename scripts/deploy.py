import os
import sys
import gzip
import hashlib
import json
import urllib.request
import urllib.error
import subprocess
import time
from concurrent.futures import ThreadPoolExecutor

def get_access_token():
    return subprocess.check_output(["gcloud", "auth", "print-access-token"]).decode().strip()

def collect_files(out_dir):
    files = {}
    for root, _, filenames in os.walk(out_dir):
        for fname in filenames:
            abs_path = os.path.join(root, fname)
            rel_path = "/" + os.path.relpath(abs_path, out_dir).replace("\\", "/")
            with open(abs_path, "rb") as f:
                content = f.read()
            gzipped = gzip.compress(content, mtime=0)
            file_hash = hashlib.sha256(gzipped).hexdigest()
            files[rel_path] = {
                "hash": file_hash,
                "gzipped": gzipped,
                "abs_path": abs_path
            }
    return files

def request_with_retry(req, max_retries=5):
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            time.sleep(1 + attempt * 1.5)

def deploy_site(project_id, site_id, out_dir="out"):
    token = get_access_token()
    print(f"\n==========================================")
    print(f"Deploying to Firebase Hosting: {site_id}")
    print(f"Project: {project_id}")
    print(f"==========================================")
    
    print("Collecting and hashing files...")
    files_map = collect_files(out_dir)
    print(f"Total files to deploy: {len(files_map)}")
    
    headers = {
        "Authorization": f"Bearer {token}",
        "x-goog-user-project": project_id,
        "Content-Type": "application/json"
    }
    
    # 1. Create Version
    print("1. Creating new version...")
    req = urllib.request.Request(
        f"https://firebasehosting.googleapis.com/v1beta1/projects/{project_id}/sites/{site_id}/versions",
        data=json.dumps({"config": {"cleanUrls": True}}).encode("utf-8"),
        headers=headers,
        method="POST"
    )
    raw_res = request_with_retry(req)
    version_data = json.loads(raw_res)
    version_name = version_data["name"]
    print(f"   Version created: {version_name}")
    
    # 2. Populate Files
    print("2. Populating files manifest...")
    hashes_payload = {path: info["hash"] for path, info in files_map.items()}
    req = urllib.request.Request(
        f"https://firebasehosting.googleapis.com/v1beta1/{version_name}:populateFiles",
        data=json.dumps({"files": hashes_payload}).encode("utf-8"),
        headers=headers,
        method="POST"
    )
    raw_res = request_with_retry(req)
    populate_data = json.loads(raw_res)
    
    upload_url = populate_data.get("uploadUrl")
    required_hashes = set(populate_data.get("uploadRequiredHashes") or [])
    print(f"   Files requiring upload: {len(required_hashes)} / {len(files_map)}")
    
    # 3. Upload Required Files
    if required_hashes:
        print("3. Uploading required files in parallel...")
        hash_to_data = {info["hash"]: info["gzipped"] for info in files_map.values()}
        
        def upload_hash(h):
            for attempt in range(5):
                try:
                    u_req = urllib.request.Request(
                        f"{upload_url}/{h}",
                        data=hash_to_data[h],
                        headers={
                            "Authorization": f"Bearer {token}",
                            "x-goog-user-project": project_id,
                            "Content-Type": "application/octet-stream"
                        },
                        method="POST"
                    )
                    with urllib.request.urlopen(u_req, timeout=30) as u_resp:
                        u_resp.read()
                    return h
                except Exception as e:
                    if attempt == 4:
                        raise
                    time.sleep(1 + attempt)

        with ThreadPoolExecutor(max_workers=3) as executor:
            completed = 0
            for _ in executor.map(upload_hash, required_hashes):
                completed += 1
                if completed % 10 == 0 or completed == len(required_hashes):
                    print(f"   Uploaded {completed}/{len(required_hashes)} files...")
    else:
        print("3. All file hashes already cached on Firebase CDN.")
    
    # 4. Finalize Version
    print("4. Finalizing version...")
    req = urllib.request.Request(
        f"https://firebasehosting.googleapis.com/v1beta1/{version_name}?update_mask=status",
        data=json.dumps({"status": "FINALIZED"}).encode("utf-8"),
        headers=headers,
        method="PATCH"
    )
    raw_res = request_with_retry(req)
    finalize_data = json.loads(raw_res)
    print(f"   Status: {finalize_data.get('status')}")
    
    # 5. Release
    print("5. Releasing to live site...")
    req = urllib.request.Request(
        f"https://firebasehosting.googleapis.com/v1beta1/projects/{project_id}/sites/{site_id}/releases?versionName={version_name}",
        data=b"{}",
        headers=headers,
        method="POST"
    )
    raw_res = request_with_retry(req)
    
    site_url = f"https://{site_id}.web.app"
    print(f"\nSUCCESS! Site is live at: {site_url}")
    return site_url

DEV_SITES = [
    "bitzzdev",
    "devborah"
]

ALL_PROD_SITES = [
    # Primary & Orb audio brand sites
    "orbmusic", "orbtune", "orbsound", "orbhz", "orbdolby",
    "orbsong", "orbaudio", "orbstream", "orbplayer", "orbbeat",
    "orbbeats", "orbwave", "orbwaves", "orbbass", "orbhifi",
    "orbtrack", "orbtracks", "orbtunes", "orbsounds", "orbsongs",
    # Developer personal / portfolio mirrors
    "bitzzdev", "bitzdev", "bitz", "devborah", "bitupanborah",
    "biswaadev", "biswadev", "biswajittanti",
    # Cultural & community domains
    "suno", "assam", "zubeen", "zubeengarg", "auno", "oryn", "veya"
]

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "dev":
            sites = DEV_SITES
        elif sys.argv[1] == "all":
            sites = ALL_PROD_SITES
        else:
            sites = sys.argv[1:]
    else:
        sites = ALL_PROD_SITES
    for s in sites:
        deploy_site("test-netly", s)
