import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import NavBar from "@/components/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bloguls",
  description: "Blogus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={cn(
          "h-dvh w-full bg-background font-sans flex flex-col antialiased",
          fontSans.variable
        )}
      >
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
