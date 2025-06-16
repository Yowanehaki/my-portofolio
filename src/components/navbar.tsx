"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, SVGMotionProps } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
      const sections = ["home", "about", "projects", "skills", "contactme"];
      const scrollPosition = window.scrollY + 100;
      
      // Get window height untuk deteksi bottom
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Jika hampir di bottom, set ke contactme
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveSection("contactme");
        return;
      }
      
      // Default ke home jika di bagian paling atas
      if (scrollPosition < 300) {
        setActiveSection("home");
        return;
      }

      // Cek section lain dari bawah ke atas
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section === "home") continue; // Skip home karena sudah ditangani di atas
        
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop - 200 && scrollPosition < offsetTop + height) {
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
  const Path = (props: SVGMotionProps<SVGPathElement>) => (
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
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="relative w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 overflow-hidden">
                <Image 
                  src="/image.png" 
                  alt="HAZART Logo" 
                  width={40}
                  height={40}
                  className="opacity-50"
                />
              </div>
            </div>
          </Link>

          {/* Menu Desktop - Centered */}
          <div className={`flex items-center space-x-1 transition-all duration-300 px-6 py-3 
            ${isScrolled 
              ? "border border-gray-200/20 dark:border-gray-700/30 rounded-2xl" 
              : "border border-gray-200/10 dark:border-gray-700/20 rounded-2xl"
            }`}>
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group
                  ${activeSection === link.href.substring(1) 
                    ? "text-indigo-600 dark:text-indigo-400" 
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  const sectionId = link.href.substring(1);
                  
                  if (sectionId === 'home') {
                    window.scrollTo({ 
                      top: 0, 
                      behavior: 'smooth' 
                    });
                    return;
                  }
                  
                  const element = document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
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
          </div>

          {/* Contact Me Button */}
          <div className="flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <Link 
                href="#contactme"
                className="relative px-6 py-2.5 bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 rounded-full font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-all duration-300 border border-indigo-200 dark:border-indigo-800 shadow-lg inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contactme');
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex justify-between items-center transition-all duration-300">
          {/* Logo & Nama Mobile */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="relative w-7 h-7 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                <Image 
                  src="/image.png" 
                  alt="HAZART Logo" 
                  width={28}
                  height={28}
                  className="w-full h-full object-cover opacity-80 dark:opacity-100"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-800 dark:text-white tracking-tight">HAZART</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 -mt-0.5">portofolio</span>
            </div>
          </Link>

          {/* Tombol Menu Mobile */}
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 23 23" className="text-gray-700 dark:text-white">
              <Path
                animate={isMenuOpen ? "open" : "closed"}
                initial={false}
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5", stroke: "currentColor" },
                  open: { d: "M 3 16.5 L 17 2.5", stroke: "currentColor" }
                }}
                strokeWidth={2}
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
                strokeWidth={2}
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
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        const sectionId = link.href.substring(1);
                        
                        // Handle home section - scroll to top
                        if (sectionId === 'home') {
                          window.scrollTo({ 
                            top: 0, 
                            behavior: 'smooth' 
                          });
                          return;
                        }
                        
                        const element = document.getElementById(sectionId);
                        if (element) {
                          element.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }
                      }}
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
                    href="#contactme" 
                    className="flex items-center justify-center space-x-2 w-full py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      const element = document.getElementById('contactme');
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Contact Me</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// Helper untuk icon pada mobile menu
function getLinkIcon(sections: string) {
  switch (sections) {
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