"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const [showMobileTooltip, setShowMobileTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAttemptCount = useRef(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // Create audio element with properties for autoplay
    const audio = new Audio("/audio/las-mananitas.mp3");
    audio.loop = true;
    audio.autoplay = true;
    audio.muted = false;
    audioRef.current = audio;

    // Set up event listeners for the audio element
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
      // Attempt to play unmuted
      attemptAutoplay();
    });

    // Function to attempt autoplay multiple times
    const attemptAutoplay = () => {
      if (!audioRef.current || playAttemptCount.current > 3) return;
      
      playAttemptCount.current++;
      audioRef.current.muted = false;
      
      audioRef.current.play().then(() => {
        setIsMuted(false);
        console.log("Autoplay successful!");
      }).catch(error => {
        console.log(`Autoplay attempt ${playAttemptCount.current} failed:`, error.message);
        
        // If we've tried a few times, show a toast
        if (playAttemptCount.current === 3) {
          toast.info("Haz clic en cualquier parte para escuchar la música", {
            duration: 5000,
            position: "bottom-center",
          });
          setAudioError("El navegador ha bloqueado la reproducción automática. Haz clic para escuchar.");
        }
        
        // Try again after a short delay
        setTimeout(() => {
          if (playAttemptCount.current < 3) {
            attemptAutoplay();
          }
        }, 1000);
      });
    };

    // Detect any user interaction with the page
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().then(() => {
          setIsMuted(false);
          setAudioError(null);
        }).catch(error => {
          console.log("Play on interaction failed:", error.message);
          setAudioError("Haz clic en el botón para escuchar la música");
        });
      }
    };

    // Listen for user interactions
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle mute/unmute
  const toggleMute = async () => {
    if (!audioRef.current) return;

    try {
      if (isMuted) {
        // Unmuting - ensure it's playing and then unmute
        if (audioRef.current.paused) {
          await audioRef.current.play();
        }
        audioRef.current.muted = false;
        setIsMuted(false);
        setAudioError(null);
        toast.success("¡Reproduciendo Las Mañanitas!", {
          position: "bottom-center",
        });
      } else {
        // Muting - but keep playing
        audioRef.current.muted = true;
        setIsMuted(true);
        setAudioError(null);
      }
    } catch (error) {
      console.error('Audio toggle error:', error);
      toast.error("Por favor, haz clic para reproducir la música", {
        position: "bottom-center",
      });
    }
  };

  // Mobile tooltip
  const handleMobileTooltip = () => {
    if (!isMobile) return;
    setShowMobileTooltip(true);
    setTimeout(() => setShowMobileTooltip(false), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <Button
          variant="outline"
          size={isMobile ? "icon" : "default"}
          onClick={toggleMute}
          onMouseEnter={handleMobileTooltip}
          onTouchStart={handleMobileTooltip}
          className={cn(
            "bg-white/95 backdrop-blur-sm border-pink-200 hover:bg-pink-50",
            "transition-all duration-300 ease-in-out",
            "flex items-center gap-2 shadow-lg",
            isMobile ? "rounded-full p-3" : "rounded-full px-4 py-2",
            isMuted ? "animate-pulse" : "border-pink-400"
          )}
          aria-label={isMuted ? "Reproducir música" : "Silenciar música"}
        >
          {!isMuted ? (
            <>
              <Volume2 className={cn(
                "text-pink-500",
                isMobile ? "h-5 w-5" : "h-4 w-4"
              )} />
              {!isMobile && <span className="text-pink-800">♪ Las Mañanitas ♪</span>}
            </>
          ) : (
            <>
              <VolumeX className={cn(
                "text-pink-500",
                isMobile ? "h-5 w-5" : "h-4 w-4"
              )} />
              {!isMobile && <span className="text-pink-800">Activar Las Mañanitas</span>}
            </>
          )}
        </Button>

        {/* Mobile tooltip */}
        {isMobile && showMobileTooltip && (
          <div className="absolute bottom-full right-0 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-pink-200">
              <span className="text-sm text-pink-800 whitespace-nowrap">
                {!isMuted ? "♪ Las Mañanitas ♪" : "Activar Las Mañanitas"}
              </span>
            </div>
          </div>
        )}

        {audioError && (
          <div className={cn(
            "mt-2 text-xs bg-white/95 backdrop-blur-sm p-2 rounded-lg border border-pink-200 shadow-sm",
            "animate-in fade-in slide-in-from-bottom-2 duration-300",
            isMobile ? "text-right" : "text-left"
          )}>
            <span className="text-pink-500">{audioError}</span>
          </div>
        )}
      </div>
    </div>
  );
}