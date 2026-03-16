import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "劍獅塔羅 | Jianshi Tarot",
  description: "以台南安平劍獅守護文化融合偉特塔羅智慧，讓古老的牌卡為你指引命運方向。",
  keywords: "塔羅牌, 劍獅, 台南, 占卜, 命運, tarot",
  openGraph: {
    title: "劍獅塔羅 | Jianshi Tarot",
    description: "讓劍獅守護神為你指引命運——台南文化 × 偉特塔羅",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifTC.variable} antialiased bg-[#0B0D1A]`}
      >
        {children}
      </body>
    </html>
  );
}
