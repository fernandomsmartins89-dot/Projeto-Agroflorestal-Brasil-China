import type { Metadata } from "next";
import { DM_Sans, Lexend } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Apresentação Interativa",
  description: "Apresentação interativa moderna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${lexend.variable} scroll-smooth`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
