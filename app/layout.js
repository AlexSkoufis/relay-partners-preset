import { Bricolage_Grotesque, Instrument_Serif, Manrope } from "next/font/google";
import site from "@/content/site.json";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    siteName: site.meta.siteName,
    locale: site.meta.locale,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#141f2c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
