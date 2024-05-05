import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Title from "@/components/title";
import Popular from "@/components/popular";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  return (
    <div className="w-full grow flex flex-col items-center py-16 space-y-8">
      <Title></Title>
      <Popular></Popular>
    </div>
  );
}
