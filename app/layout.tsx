import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";

const metadataDescription =
  "AI Code Explainer by Monish Labs — Founder & Full-Stack Developer at Monishlabs. Translate complex Python, Node.js, Express.js, JavaScript, TypeScript, React, Next.js, Shopify Liquid, HTML5, CSS3, Git, MongoDB, and PostgreSQL into friendly English or kannada walkthroughs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aicodexp.vercel.app"),
  applicationName: "AI Code Explainer",
  title: "AI Code Explainer | Monish Labs",
  description: metadataDescription,
  keywords: [
    "AI Code Explainer",
    "Monish Labs",
    "Monishlabs",
    "Founder & Full-Stack Developer",
    "Python",
    "Node.js",
    "Express.js",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Shopify",
    "Liquid",
    "HTML5",
    "CSS3",
    "Git",
    "MongoDB",
    "PostgreSQL",
    "kannada code explanations",
    "code tutor",
    "developer productivity",
  ],
  category: "technology",
  authors: [
    {
      name: "Monish Labs",
      url: "https://github.com/Monishvr/ai-code",
    },
  ],
  creator: "Monish Labs",
  publisher: "Monish Labs",
  robots: "index, follow",
  alternates: {
    canonical: "https://aicodexp.vercel.app/",
  },
  openGraph: {
    title: "AI Code Explainer by Monish Labs | Bilingual Code Tutor",
    description: metadataDescription,
    url: "https://aicodexp.vercel.app/",
    siteName: "AI Code Explainer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Code Explainer by Monish Labs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Code Explainer | Monish Labs",
    description: metadataDescription,
    creator: "@monishlabs",
    site: "@monishlabs",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "author:position": "Founder & Full-Stack Developer at Monishlabs",
    "author:skills":
      "Python, Node.js, Express.js, JavaScript, TypeScript, React, Next.js, Shopify, Liquid, HTML5, CSS3, Git, MongoDB, PostgreSQL",
  },
};

const themeInitializationScript = `
  (function() {
    try {
      const theme = localStorage.getItem('code-explainer-theme') || 'system';
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const currentTheme = theme === 'system' ? systemTheme : theme;
      document.documentElement.classList.add(currentTheme);
    } catch (e) {}
  })();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Code Explainer",
  url: "https://aicodexp.vercel.app/",
  description: metadataDescription,
  applicationCategory: "EducationalApplication",
  operatingSystem: "All",
  inLanguage: ["en", "bn"],
  creator: {
    "@type": "Person",
    name: "Monish Labs",
    jobTitle: "Founder & Full-Stack Developer",
    url: "https://github.com/Monishvr/ai-code",
    sameAs: [
      "https://monishlabs.vercel.app/",
      "https://github.com/Monishvr/ai-code",
    ],
    knowsAbout: [
      "Python",
      "Node.js",
      "Express.js",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Shopify",
      "Liquid",
      "HTML5",
      "CSS3",
      "Git",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  keywords: [
    "AI Code Explainer",
    "Monish Labs",
    "Monishlabs",
    "Full-Stack Developer",
    "kannada code explanations",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3B82F6" />
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
