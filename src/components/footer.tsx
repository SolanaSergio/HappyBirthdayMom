import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 bg-pink-50 text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-3">
            <span className="text-lg font-medium text-gray-700">Hecho con</span>
            <Heart className="h-5 w-5 text-pink-500 fill-pink-500 animate-pulse" />
            <span className="text-lg font-medium text-gray-700">para mi mamá</span>
          </div>

          <p className="text-sm text-gray-500 mb-5">
            © {new Date().getFullYear()} - Con todo mi cariño en tu cumpleaños
          </p>

          <div className="w-24 h-1 bg-pink-200 rounded mb-5"></div>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
              Amor
            </span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
              Gratitud
            </span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
              Celebración
            </span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
              Familia
            </span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
              Recuerdos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
