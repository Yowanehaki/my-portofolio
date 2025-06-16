// src/app/layout.tsx
import "@/app/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CursorTrailEffect from "@/components/cursoreffect";
import { Montserrat } from "next/font/google";

// Define the font
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

// Metadata for SEO
export const metadata = {
  title: "Hazart's site",
  description: "Portofolio website for Hazart",
  icons: {
    icon: "mha.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} scroll-smooth dark`}>
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Skip to content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:text-blue-600 focus:z-50">
          Skip to content
        </a>

        <CursorTrailEffect />
        
        <Navbar />
        
        <main id="main-content" className="flex-1 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
        
        <Footer />
      </body>
    </html>
  );
}