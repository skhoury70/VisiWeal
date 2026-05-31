import { ReactNode } from "react";
import {
  Roboto_Serif,
  Roboto,
  Roboto_Mono,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { cookies } from "next/headers";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const robotoSerif = Roboto_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "600"],
});

const baseUrl = "https://visiweal.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C1820",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  publisher: "Visiweal",
  creator: "Visiweal",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${robotoSerif.variable} ${roboto.variable} ${robotoMono.variable} ${ibmPlexArabic.variable} ${isRtl ? ibmPlexArabic.className : roboto.className}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `new MutationObserver(()=>{document.querySelectorAll("[fdprocessedid]").forEach(e=>e.removeAttribute("fdprocessedid"))}).observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:["fdprocessedid"]})`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased" style={{ backgroundColor: "#0C1820" }}>
        {children}
      </body>
    </html>
  );
}
