import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maca Coffee - অর্ডার করুন",
  description: "প্রাকৃতিক শক্তি বৃদ্ধির সমাধান - অর্ডার করুন এখনই",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-bangla">{children}</body>
    </html>
  );
}
