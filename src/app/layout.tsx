import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';

const minecraftFont = localFont({
  src: './fonts/Minecraftia-Regular.ttf',
  variable: '--font-minecraft', // This creates a CSS variable
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FarmCraft",
  description:
    "Your comprehensive guide to automated Minecraft farms. Discover crop farms, mob farms, and resource generation systems with detailed build tutorials.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${minecraftFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
