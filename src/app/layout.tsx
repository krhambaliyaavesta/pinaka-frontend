import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProviderWrapper } from "@/presentation/templates/common/ToastProviderWrapper";
import MainLayoutWrapper from "@/presentation/layouts/common/MainLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pinaka - Team Feedback Platform",
  description: "A platform for team feedback and kudos sharing",
  icons: {
    icon: [
      {
        url: "/images/pinaka_logo.png",
        href: "/images/pinaka_logo.png",
      },
    ],
    apple: {
      url: "/images/pinaka_logo.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ToastProviderWrapper>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </ToastProviderWrapper>
      </body>
    </html>
  );
}
