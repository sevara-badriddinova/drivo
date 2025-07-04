import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/_components/header";
import { Toaster } from "sonner";

const inter = Inter({subsets:["latin"]});

export const metadata = {
  title: "Drivo",
  description: "Find your dream car",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/logo-white.png" sizes="any" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Toaster richColors/>
      </body>
    </html>
  );
}
