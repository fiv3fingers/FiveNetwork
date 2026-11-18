import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#091724",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "FiveNetwork — Connecting talent. Creating opportunity.",
  description:
    "FiveNetwork connects emerging software talent with career support, professional connections, and potential opportunities across the US technology industry.",
  openGraph: {
    type: "website",
    title: "FiveNetwork — Your potential deserves a bigger network",
    description:
      "Career support, connections, and the next step forward for emerging technology talent.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
