"use client"; // Perlu ditambahkan karena komponen ini menggunakan hooks

import React, { useState, useEffect, useRef } from 'react';

interface Trail {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

const CursorTrailEffect: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const requestRef = useRef<number | undefined>(undefined);
  const mousePosition = useRef({ x: 0, y: 0 });
  const trailsRef = useRef<Trail[]>([]);
  const maxTrails = 15; // Jumlah jejak maksimum
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    const createTrail = () => {
      // Buat array untuk menyimpan jejak baru
      const newTrails = [...trailsRef.current];
      
      // Tambahkan posisi mouse saat ini sebagai jejak baru
      newTrails.push({
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        opacity: 1,
        size: 6, // Ukuran tetap
      });
      
      // Batasi jumlah jejak
      if (newTrails.length > maxTrails) {
        newTrails.shift(); // Hapus jejak paling lama
      }
      
      // Update opacity pada semua jejak
      const updatedTrails = newTrails.map((trail, index) => {
        const opacity = 1 - (index / newTrails.length) * 0.9;
        return { ...trail, opacity };
      });
      
      // Update state trails
      trailsRef.current = updatedTrails;
      setTrails(updatedTrails);
      
      // Request animation frame untuk efek yang smooth
      requestRef.current = requestAnimationFrame(createTrail);
    };
    
    // Mulai animasi
    requestRef.current = requestAnimationFrame(createTrail);
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trails.map((trail, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: trail.opacity,
            width: `${trail.size}px`,
            height: `${trail.size}px`,
            transform: `translate(-50%, -50%) scale(${1 - (index / trails.length) * 0.7})`,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
            transition: 'transform 0.1s linear'
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrailEffect;