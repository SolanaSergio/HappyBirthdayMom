"use client";

import { Button } from "@/components/ui/button";
import { Upload, Home, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavMenu() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white/90 rounded-full shadow-md"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5 text-pink-600" />
      </button>

      {/* Nav menu - responsive */}
      <nav className={`fixed ${showMenu ? 'top-0 right-0 h-auto py-16 px-6 bg-white/95 shadow-lg rounded-bl-xl' : 'top-4 right-4'} z-40 flex flex-col md:flex-row gap-2 transition-all duration-300 md:bg-transparent md:shadow-none md:p-0`}>
        {pathname !== "/" && (
          <Link href="/" onClick={() => setShowMenu(false)}>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm border-pink-200 hover:bg-pink-50 w-full md:w-auto"
            >
              <Home className="h-4 w-4 mr-2 text-pink-500" />
              <span className="text-pink-800">Inicio</span>
            </Button>
          </Link>
        )}

        {pathname !== "/uploads" && (
          <Link href="/uploads" onClick={() => setShowMenu(false)}>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm border-pink-200 hover:bg-pink-50 w-full md:w-auto"
            >
              <Upload className="h-4 w-4 mr-2 text-pink-500" />
              <span className="text-pink-800">Subir Recuerdos</span>
            </Button>
          </Link>
        )}
      </nav>

      {/* Backdrop for mobile */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
