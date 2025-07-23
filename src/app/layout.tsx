import type { Metadata } from "next";
import Link from "next/link";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "500",
})

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat_alternates",
  subsets: ["latin"],
  weight: "500",
})

export const metadata: Metadata = {
  title: "Dino Time",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <body
        className={`${montserrat.className} ${montserratAlternates.variable} antialiased w-full p-2`}
      >
        <header className="w-full flex justify-around">
          <Link href="/" className="important text-3xl">Dino Time</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
