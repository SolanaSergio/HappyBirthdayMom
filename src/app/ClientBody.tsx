"use client";

import { useEffect, useState } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Enhanced client-side setup for better mobile compatibility
  useEffect(() => {
    setMounted(true);
    document.body.classList.add('antialiased');

    // Improved viewport height fix for mobile
    const setVH = () => {
      // Wait a short time to ensure the browser has finished any UI operations
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }, 100);
    };

    // Initial call
    setVH();

    // Add event listeners with passive option for better performance
    window.addEventListener('resize', setVH, { passive: true });
    window.addEventListener('orientationchange', () => {
      // Wait longer after orientation changes
      setTimeout(setVH, 200);
    }, { passive: true });

    // Touch events to handle iOS Safari address bar
    window.addEventListener('touchmove', setVH, { passive: true });
    window.addEventListener('touchend', setVH, { passive: true });

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      window.removeEventListener('touchmove', setVH);
      window.removeEventListener('touchend', setVH);
    };
  }, []);

  return (
    <body className="antialiased bg-background" suppressHydrationWarning>
      {mounted ? children : (
        <div className="min-h-screen flex items-center justify-center" style={{ height: '100vh' }}>
          <div className="text-pink-500 text-center p-4">
            <div className="animate-pulse">Cargando...</div>
          </div>
        </div>
      )}
    </body>
  );
}
