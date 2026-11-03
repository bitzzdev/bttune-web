import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  APP_NAME,
  APP_CONFIG,
  PRIMARY_DOMAIN,
  ALL_PRODUCTION_DOMAINS,
  FAQ_ITEMS,
  TEAM_MEMBERS,
} from "@/data/landingData";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(PRIMARY_DOMAIN),
  title: {
    default: `${APP_NAME} - Free Ad-Free Music Streaming Client for Android | Studio 8D DSP & Synced Lyrics`,
    template: `%s | ${APP_NAME} Music`,
  },
  description:
    `Download official ${APP_NAME} APK for Android. High-fidelity, open-source, subscription-free music streaming client engineered with Jetpack Compose, 8D Spatial DSP audio, syllable-synchronized lyrics, and offline cache. Zero ads, zero telemetry.`,
  applicationName: APP_NAME,
  keywords: [
    APP_NAME,
    `${APP_NAME} APK`,
    `${APP_NAME} Android`,
    `${APP_NAME} Music Player`,
    `${APP_NAME} App`,
    "Orini",
    "Orini Music",
    "Orini App",
    "Orini Player",
    "Orini Audio",
    "Orini APK",
    "OriniTune",
    "Oroni",
    "Oroni Music",
    "YouTube Music Client",
    "Free Music Streaming",
    "Ad-free Music App",
    "Open Source Music Player",
    "Jetpack Compose Music Player",
    "8D Spatial Audio",
    "Audio DSP Equalizer",
    "Syllable Synced Lyrics",
    "Offline Music Player",
    "Kotlin Android Music Player",
    "Dev Borah",
    "Bitupan Borah",
    "bitzzdev",
    "bitz.dev",
    "Biswajit Tanti",
    "biswaa.dev",
    "biswadev",
    "Trisan Tanti",
  ],
  authors: [
    { name: "Biswajit Tanti (biswaa.dev)", url: "https://biswadev.vercel.app/" },
    { name: "Dev Borah (aka Bitupan Borah / bitzzdev)", url: "https://bitz.is-a.dev" },
    { name: "Trisan Tanti", url: "https://github.com/biswaadev" },
  ],
  creator: "Biswajit Tanti (biswaa.dev) & Dev Borah (Bitupan Borah / bitzzdev)",
  publisher: "Orini Open Source Audio Team",
  alternates: {
    canonical: `${PRIMARY_DOMAIN}/`,
    languages: {
      "en-US": `${PRIMARY_DOMAIN}/`,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${APP_NAME} Music`,
    url: `${PRIMARY_DOMAIN}/`,
    title: `${APP_NAME} - Free Ad-Free Music Streaming Client for Android`,
    description:
      `Download official ${APP_NAME} APK for Android. Jetpack Compose, Syllable Lyrics Sync, 8D Spatial Audio DSP, Studio Audio Quality, and Persistent Offline Cache. Zero ads.`,
    images: [
      {
        url: "/assets/with-bg.svg",
        width: 512,
        height: 512,
        alt: `${APP_NAME} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@biswaadev",
    creator: "@bitzzdev",
    title: `${APP_NAME} - Free Ad-Free Music Streaming Client for Android`,
    description:
      `Download official ${APP_NAME} APK for Android. 100M+ songs, Jetpack Compose, 8D Spatial Audio DSP, real-time syllable-synced lyrics, and offline playback. Zero ads.`,
    images: ["/assets/with-bg.svg"],
  },
  icons: {
    icon: [
      { url: "/assets/with-bg.svg", type: "image/svg+xml" },
    ],
    shortcut: "/assets/with-bg.svg",
    apple: "/assets/with-bg.svg",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "0Vp-A-VHoH6ip6wBqsRfAu7KfiGuoBwy9l3qscPk5gw",
  },
  category: "MultimediaApplication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Rich Structured Data (JSON-LD) for Google Search and AI Overviews
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    alternateName: [
      "Orini Music",
      "Orini Audio",
      "Orini Player",
      "OriniTune",
      "Oroni Music",
      "BTtune",
    ],
    operatingSystem: "Android 8.0+ (Oreo through Android 15 & 16)",
    applicationCategory: "MultimediaApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "12850",
      reviewCount: "8600",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "An open-source, subscription-free audio client engineered with Jetpack Compose, Kotlin Coroutines, 8D Spatial DSP audio, and syllable-synchronized lyrics with zero advertisements.",
    softwareVersion: APP_CONFIG.version,
    fileSize: APP_CONFIG.apkSize,
    image: `${PRIMARY_DOMAIN}/assets/with-bg.svg`,
    downloadUrl: APP_CONFIG.directDownloadUrl,
    url: `${PRIMARY_DOMAIN}/`,
    author: [
      {
        "@type": "Person",
        name: "Biswajit Tanti",
        alternateName: ["biswaa.dev", "biswadev"],
        jobTitle: "Lead Developer & Audio Engine Architect",
        url: "https://biswadev.vercel.app/",
        sameAs: [
          "https://github.com/biswaadev",
          "https://www.instagram.com/biswaa.dev",
          "https://biswaadev.web.app",
          "https://biswajittanti.web.app",
        ],
      },
      {
        "@type": "Person",
        name: "Dev Borah",
        alternateName: ["Bitupan Borah", "bitzzdev", "bitz.dev"],
        jobTitle: "Lead Architect, UI/UX Designer & Web/Android Developer",
        url: "https://bitz.is-a.dev",
        sameAs: [
          "https://github.com/bitzzdev",
          "https://www.instagram.com/bitz.dev",
          "https://bitzzdev.web.app",
          "https://bitupanborah.web.app",
          "https://devborah.web.app",
        ],
      },
      {
        "@type": "Person",
        name: "Trisan Tanti",
        jobTitle: "Core Android Developer",
        url: "https://github.com/biswaadev",
        sameAs: ["https://github.com/biswaadev"],
      },
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: `${PRIMARY_DOMAIN}/`,
    alternateName: ["Orini Music", "Orini Player", "Oroni Music"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${PRIMARY_DOMAIN}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: `${PRIMARY_DOMAIN}/`,
    logo: `${PRIMARY_DOMAIN}/assets/no-bg.svg`,
    sameAs: [
      APP_CONFIG.repoUrl,
      ...ALL_PRODUCTION_DOMAINS.map((d) => `https://${d}`),
    ],
    founders: [
      {
        "@type": "Person",
        name: "Biswajit Tanti",
        alternateName: "biswaa.dev",
        url: "https://biswadev.vercel.app/",
      },
      {
        "@type": "Person",
        name: "Dev Borah (Bitupan Borah)",
        alternateName: "bitzzdev",
        url: "https://bitz.is-a.dev",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${PRIMARY_DOMAIN}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Screenshots & UI",
        item: `${PRIMARY_DOMAIN}/#screens`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Core Features",
        item: `${PRIMARY_DOMAIN}/#features`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Architecture",
        item: `${PRIMARY_DOMAIN}/#architecture`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Core Developers",
        item: `${PRIMARY_DOMAIN}/#team`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "FAQ",
        item: `${PRIMARY_DOMAIN}/#faq`,
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Inter Font Family */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        {/* Google Structured Data / JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbsSchema),
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden font-inter selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
        {children}
      </body>
    </html>
  );
}
