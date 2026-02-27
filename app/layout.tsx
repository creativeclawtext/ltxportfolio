import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "James McKay — AI Video Creator",
  description:
    "AI Video Creator & Content Producer. Two decades of creating and producing, AI-native workflows, and videos that hold attention. Built with LTX-2.",
  openGraph: {
    title: "James McKay — AI Video Creator",
    description:
      "AI Video Creator & Content Producer. Built with LTX-2.",
    type: "website",
    images: [{ url: "/reel/thumb-v2.jpg", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "James McKay — AI Video Creator",
    description: "AI Video Creator & Content Producer. Built with LTX-2.",
    images: ["/reel/thumb-v2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-ltx-black focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
