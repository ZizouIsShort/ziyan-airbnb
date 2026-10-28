import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Serviced apartments for Rent in Candolim, Goa, India - Airbnb",
  description:
    "Entire serviced apartment in Candolim, India. 3 guests · 1 bedroom · 1 bed · 1 bathroom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
