"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component from next/image
import { motion, AnimatePresence } from "framer-motion";
// Removed unused import: import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  // Removed unused variable: const pathname = usePathname();

  // Deteksi scroll untuk mengubah style navbar saat scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Deteksi active section berdasarkan scroll position
    const handleSectionDetection = () => {
      const sections = ["home", "about", "projects", "skills", "menfess"];
      const scrollPosition = window.scrollY + 100;
      
      // Default ke home jika di bagian paling atas
      if (scrollPosition < 300) {
        setActiveSection("home");
        return;
      }

      // Cek section lain
      for (const section of sections) {
        if (section === "home") continue; // Skip home karena sudah ditangani di atas
        
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionDetection);
    
    // Initial section detection - pastikan "home" aktif saat load
    setActiveSection("home");
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionDetection);
    };
  }, []);

  // Animasi untuk navbar background
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  // Tombol hamburger animasi
  const Path = props => (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
  );

  // List menu navigasi
  const navLinks = [
    { text: "Home", href: "#home" },
    { text: "About", href: "#about" },
    { text: "Projects", href: "#projects" },
    { text: "Skills", href: "#skills" },
  ];

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo & Nama */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 overflow-hidden">
                <Image 
                  src="/favicon.png" 
                  alt="HAZART Logo" 
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">HAZART</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">portofolio</span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group
                  ${activeSection === link.href.substring(1) 
                    ? "text-indigo-600 dark:text-indigo-400" 
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
              >
                {link.text}
                {activeSection === link.href.substring(1) ? (
                  <motion.span 
                    layoutId="activeSection"
                    className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-full -z-10"
                  />
                ) : (
                  <span className="absolute inset-0 bg-transparent group-hover:bg-gray-50 dark:group-hover:bg-gray-800/30 rounded-full -z-10 transition-colors duration-300"></span>
                )}
              </Link>
            ))}
            
            {/* Tombol Kontak */}
            <Link href="#menfess" className="ml-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <button className="relative px-5 py-2 bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 rounded-full font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-all duration-300">
                  Send Menfess
                </button>
              </div>
            </Link>
          </div>

          {/* Tombol Menu Mobile */}
          <button 
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 23 23">
              <Path
                animate={isMenuOpen ? "open" : "closed"}
                initial={false}
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5", stroke: "currentColor" },
                  open: { d: "M 3 16.5 L 17 2.5", stroke: "currentColor" }
                }}
              />
              <Path
                d="M 2 9.5 L 20 9.5"
                animate={isMenuOpen ? "open" : "closed"}
                initial={false}
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
              />
              <Path
                animate={isMenuOpen ? "open" : "closed"}
                initial={false}
                variants={{
                  closed: { d: "M 2 16.5 L 20 16.5", stroke: "currentColor" },
                  open: { d: "M 3 2.5 L 17 16.5", stroke: "currentColor" }
                }}
              />
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden mt-4 rounded-2xl overflow-hidden shadow-xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 space-y-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                  >
                    <Link 
                      href={link.href}
                      className={`flex items-center space-x-2 w-full px-4 py-3 rounded-xl ${
                        activeSection === link.href.substring(1) 
                          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getLinkIcon(link.href.substring(1))}
                      <span>{link.text}</span>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 + navLinks.length * 0.05 }}
                  className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700"
                >
                  <Link 
                    href="#menfess" 
                    className="flex items-center justify-center space-x-2 w-full py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Send Menfess</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Helper untuk icon pada mobile menu
function getLinkIcon(section) {
  switch (section) {
    case 'home':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'about':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'projects':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      );
    case 'skills':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return null;
  }
}