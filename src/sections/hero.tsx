"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [imageScale, setImageScale] = useState(1.5); // Keeping your original scale
  
  const textOptions = ['Hi, Im Mulfi Hazwi Artaf' ];
  
  useEffect(() => {
    const fullText = textOptions[currentTextIndex];
    
    // Typing effect
    if (!typingComplete && !isErasing) {
      const typingInterval = setInterval(() => {
        setTypedText(prev => {
          if (prev.length < fullText.length) {
            return prev + fullText[prev.length];
          } else {
            clearInterval(typingInterval);
            setTypingComplete(true);
            return prev;
          }
        });
      }, 100);
      
      return () => clearInterval(typingInterval);
    }
    
    // Pause when complete before erasing
    if (typingComplete && !isErasing) {
      const pauseTimeout = setTimeout(() => {
        setIsErasing(true);
        setTypingComplete(false);
      }, 2000);
      
      return () => clearTimeout(pauseTimeout);
    }
    
    // Erasing effect
    if (isErasing) {
      const eraseInterval = setInterval(() => {
        setTypedText(prev => {
          if (prev.length > 0) {
            return prev.slice(0, -1);
          } else {
            clearInterval(eraseInterval);
            setIsErasing(false);
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
            return '';
          }
        });
      }, 50);
      
      return () => clearInterval(eraseInterval);
    }
  }, [currentTextIndex, typingComplete, isErasing, textOptions]);
  
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-purple-700/20 -top-10 -right-16 blur-3xl"></div>
        <div className="absolute w-64 h-64 rounded-full bg-blue-600/20 bottom-0 left-0 blur-3xl"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-500/10 bottom-20 right-20 blur-3xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTh2MmgtMnYtMmgyem0tNCAwaDJ2MmgtMnYtMnptMCA4aDJ2MmgtMnYtMnoiIGZpbGw9IiM0NDQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
      
      <div className="container mx-auto px-4 z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-0">
                
      <div className="md:w-1/2 relative flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-md mx-auto mb-4">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-ping"></div>
            
            {/* Foto dengan efek skala - now with rounded-full for mobile */}
            <div 
              className="relative flex items-center left-center h-full overflow-hidden rounded-full"
              style={{ transform: `scale(${imageScale})`, transition: 'transform 0.3s ease' }}
            >
              <img 
                src="/test-Photoroom.png" 
                alt="Developer" 
                className="w-full h-auto object-cover z-10" 
              />
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 text-left mt-8 md:mt-0">
          <div className="relative inline-block">
            <span className="absolute -inset-1 -skew-y-3 bg-black-600/70 blur-xl"></span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 h-14 flex items-center">
            -- -
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-600">{typedText}</span>
            <span className="animate-blink ml-1">|</span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-300 max-w-xl mb-8 text-justify">
            Dear all,
            I am a 6th semester Informatics Engineering student with high adaptability in various situations.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
        <a href="#about" className="animate-bounce text-white opacity-70 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}