"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Next.js Image component

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageScale, setImageScale] = useState(0.8); // Changed initial value to 0.8 to match usage
  const skills = ['FE','IT Enthusiast','UI/UX'];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('about');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">About Me</h2>
              <div className="h-1 w-24 bg-indigo-600 mt-2 rounded-full"></div>
            </div>
            
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-4 text-justify">
              I am a passionate software developer specializing in modern web technologies. With a keen eye for design and a love for clean code, 
              I create efficient and scalable applications that provide exceptional user experiences.
            </p>
          
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8 text-justify">
              My journey in web development began when I entered Institut Teknologi Sumatera (ITERA) in 2022. As a Software Engineer, 
              I&apos;ve been developing my skills and knowledge in creating responsive and interactive user interfaces.
            </p>
            
            <div className="pt-3">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Interest</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="relative flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-md mx-auto mb-4">
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-tr rounded-full blur-2xl opacity-30"></div>
              
              {/* Foto dengan efek skala - reduced size */}
              <div 
                className="relative flex items-center justify-center h-full"
                style={{ transform: `scale(${imageScale})`, transition: 'transform 0.3s ease' }}
                onMouseEnter={() => setImageScale(0.85)} // Slightly larger on hover
                onMouseLeave={() => setImageScale(0.8)}  // Return to smaller size
              >
                <Image 
                  src="/Logo_ITERA.png" 
                  alt="Developer Campus" 
                  width={320}
                  height={320}
                  className="w-full h-auto max-w-xs object-contain z-10" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}