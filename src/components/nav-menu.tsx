"use client";

import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function NavMenu() {
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";

  return (
    <>
      {/* Mobile menu with sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white/90 rounded-full shadow-md"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5 text-pink-600" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] bg-white/95 backdrop-blur-sm">
          <SheetHeader>
            <SheetTitle className="text-pink-600">Menú</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 mt-6">
            {isAdminPage ? (
              <Link href="/">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full justify-start text-pink-800 hover:text-pink-900 hover:bg-pink-50"
                >
                  Volver a Inicio
                </Button>
              </Link>
            ) : (
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full justify-start text-pink-800 hover:text-pink-900 hover:bg-pink-50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Administrar Contenido
                </Button>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop menu */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        {isAdminPage ? (
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm border-pink-200 hover:bg-pink-50"
            >
              Volver a Inicio
            </Button>
          </Link>
        ) : (
          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm border-pink-200 hover:bg-pink-50"
            >
              <Settings className="h-4 w-4 mr-2" />
              Administrar
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}
