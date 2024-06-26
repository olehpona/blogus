import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import NavBar from "@/components/navbar";
import { UserStoreContextProvider } from "@/lib/stores/user";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bloguls",
  description: "Blogus",
};

export default async function RootLayout({
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
        <UserStoreContextProvider>
          <NavBar></NavBar>
          {children}
        </UserStoreContextProvider>
      </body>
    </html>
  );
}
