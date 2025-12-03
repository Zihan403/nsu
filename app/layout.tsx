import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NSU Alumni Melbourne | North South University Alumni Network",
  description: "Connecting North South University alumni in Melbourne and beyond. Join our vibrant community for networking, mentoring, and professional growth.",
  keywords: "NSU, North South University, Alumni, Melbourne, Bangladesh, Networking, Mentoring",
  icons: {
    icon: '/assets/images/logos/Logo.jfif',
    shortcut: '/assets/images/logos/Logo.jfif',
    apple: '/assets/images/logos/Logo.jfif',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logos/Logo.jfif" type="image/jpeg" />
        <link rel="shortcut icon" href="/assets/images/logos/Logo.jfif" type="image/jpeg" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
