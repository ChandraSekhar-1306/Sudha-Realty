import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/components/ReduxProvider";
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// export const metadata: Metadata = {
//   title: "Sudha Realty",
//   description: "Your trusted real estate partner for personalized property solutions.",
// };
export const metadata: Metadata = {
  title: {
    default: "Sudha Realty",
    template: "%s | Sudha Realty",
  },
  description:
    "Your trusted real estate partner for personalized property solutions. Explore curated listings, book consultations, and find your dream property with Sudha Realty.",
  keywords: [
    "real estate",
    "property listings",
    "buy property",
    "sell property",
    "Sudha Realty",
    "real estate consultation",
    "homes for sale",
    "apartments",
    "flats in India",
    "flats in Hyderabad",
  ],
  authors: [{ name: "Sudha Realty", url: "https://sudharealty.in" }],
  creator: "Sudha Realty",
  publisher: "Sudha Realty",
  openGraph: {
    title: "Sudha Realty - Your Trusted Real Estate Partner",
    description:
      "Your trusted real estate partner for personalized property solutions. Explore curated listings, book consultations, and find your dream property with Sudha Realty.",
    url: "https://sudharealty.in",
    siteName: "Sudha Realty",
    images: [
      {
        url: "/plainlogo.jpg",
        width: 1200,
        height: 630,
        alt: "Sudha Realty",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
 
  icons: {
    icon: "/favicon.ico",
   
  },
  
  metadataBase: new URL("https://sudharealty.in"),
  alternates: {
    canonical: "https://sudharealty.in",
    languages: {
      "en-IN": "https://sudharealty.in/en-IN",
    },
  },
  category: "Real Estate",
};



function AppContent({ children }: { children: React.ReactNode }) {


  

  return (
    <div>
     
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/logo.ico" />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <AppContent>
            {children}
               <Analytics />
            </AppContent>
        </ReduxProvider>
      </body>
    </html>
  );
}
