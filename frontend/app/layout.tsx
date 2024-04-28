import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/Providers";
import Footer from "@/app/footer";

import 'remixicon/fonts/remixicon.css';
import "./globals.css";
import Header from "@/app/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jolibi: Recruiting Made Easy",
  description: "AI-powered recruiting platform for modern businesses.",
};

const RootLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex justify-between min-h-[100vh] flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );

}

export default RootLayout;
