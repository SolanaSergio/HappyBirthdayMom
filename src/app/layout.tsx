import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { FileProvider } from "@/context/file-context";
import { Toaster } from "sonner";

// Use only one font to reduce complexity
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Feliz Cumpleaños Mamá",
  description: "Una celebración especial para mi mamá",
};

// Enhanced viewport configuration for better mobile compatibility
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={geistSans.variable}>
      <ClientBody>
        <FileProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </FileProvider>
      </ClientBody>
    </html>
  );
}
