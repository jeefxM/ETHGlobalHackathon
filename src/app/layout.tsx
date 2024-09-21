"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThirdwebAppWrapper from "./components/Thridweb";
import { Toaster } from "@/components/ui/toaster";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const kmrMelangeGroteskBold = localFont({
  src: [
    {
      path: "../../public/fonts/KMRMelangeGrotesk-Bold.otf",
      weight: "600",
    },
  ],
  variable: "--font-kmr-bold",
});
const kmrMelangeGroteskRegular = localFont({
  src: [
    {
      path: "../../public/fonts/KMRMelangeGrotesk-Regular.otf",
      weight: "600",
    },
  ],
  variable: "--font-kmr-regular",
});

const kmrMelangeGroteskSemiBold = localFont({
  src: [
    {
      path: "../../public/fonts/KMRMelangeGrotesk-SemiBold.otf",
      weight: "600",
    },
  ],
  variable: "--font-kmr-semiBold",
});

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const fonts = [
  kmrMelangeGroteskBold.variable,
  kmrMelangeGroteskSemiBold.variable,
  kmrMelangeGroteskRegular.variable,
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fonts} bg-[#FEF3FF] font-kmr font font-kmrSemiBold`}
    >
      <head></head>
      <body>
        <ThirdwebAppWrapper>
          <EdgeStoreProvider>
            {children}
            <Toaster />
          </EdgeStoreProvider>
        </ThirdwebAppWrapper>
      </body>
    </html>
  );
}
