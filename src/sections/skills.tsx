"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import skills from "@/data/skills";

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Intersection Observer to trigger animations when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    const section = document.getElementById('skills');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white inline-block relative">
              My Skills
              <div className="absolute bottom-0 left-0 h-1 w-full bg-indigo-600 transform origin-left scale-x-0 transition-transform duration-500" 
                style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}></div>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              A showcase of my technical expertise and proficiency in various technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 justify-items-center">
            {skills.map((skill, index) => (
              <SkillIcon 
                key={skill.name} 
                skill={skill} 
                index={index} 
                isVisible={isVisible} 
              />
            ))}
          </div>
        </div>
        
        {/* Background decoration - reduced size and opacity */}
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-indigo-300 dark:bg-indigo-900 rounded-full filter blur-3xl opacity-15 -translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute bottom-1/4 right-0 w-56 h-56 bg-purple-300 dark:bg-purple-900 rounded-full filter blur-3xl opacity-15 translate-x-1/3"></div>
      </div>
    </section>
  );
}

// Animated Skill Icon Component
// Define an interface for the skill object
interface Skill {
  icon: string;
  name: string;
}

// Define props interface with explicit types
interface SkillIconProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

function SkillIcon({ skill, index, isVisible }: SkillIconProps) {
  // Calculate staggered animation delay based on index
  const animationDelay = `${100 + (index * 50)}ms`;
  
  return (
    <div 
      className={`
        flex flex-col items-center transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: animationDelay }}
    >
      <div className="group relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-0 rounded-full 
          bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 overflow-hidden">
          
          {/* Floating Animation - Fill the entire container */}
          <div className="animate-wiggle flex items-center justify-center w-full h-full relative">
            <Image 
              src={skill.icon} 
              alt={skill.name} 
              width={96}
              height={96}
              className="w-full h-full object-contain group-hover:animate-wiggle" 
            />
          </div>
          
          {/* Pulse Effect - slightly reduced */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/15 animate-ping-slow opacity-0 group-hover:opacity-100"></div>
        </div>
        
        {/* Name with slide-up effect - smaller font */}
        <div className="mt-2 transition-all duration-300 text-center transform group-hover:translate-y-1">
          <p className="font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-200">{skill.name}</p>
        </div>
      </div>
    </div>
  );
}