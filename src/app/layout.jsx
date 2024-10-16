import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/Footer";

import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Test.ai",
  description: "AI-Powered Quizzes Tailored to Boost Your Knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans dark:bg-black`}
      >
        <Analytics />
        <Providers>
          <Toaster />
          <header className="flex-none w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar />
          </header>
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-black h-screen font-sans">
            {children}
          </main>
          {/* <footer className="bottom left-0 w-full"> */}
          {/*   <Footer /> */}
          {/* </footer> */}
        </Providers>
      </body>
    </html>
  );
}
