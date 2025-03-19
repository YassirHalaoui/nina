import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niya Beauty - Premium Curly Hair Salon",
  description: "Morocco's first specialized curly hair salon dedicated to celebrating and enhancing your natural beauty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}