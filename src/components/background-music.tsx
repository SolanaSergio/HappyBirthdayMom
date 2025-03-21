"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // URL to the Las Mañanitas song
  const songUrl = "https://ia802505.us.archive.org/17/items/78_las-mananitas_pedro-infante-mariachi-los-mamertos_gbia0154742a/Las%20Ma%c3%b1anitas%20-%20Pedro%20Infante.mp3";

  // First, just check if we're in the browser
  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create audio element only on client
  useEffect(() => {
    if (!isClient) return;

    try {
      // Create audio element
      audioRef.current = new Audio(songUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
      audioRef.current.preload = "auto";

      // Mobile browsers often block auto-playing, so we won't try to autoplay
      if (!isMobile) {
        // Set audio ready flag when loaded
        audioRef.current.addEventListener('canplaythrough', () => {
          setAudioReady(true);
        });
      } else {
        // On mobile, just set it as ready for user interaction
        setAudioReady(true);
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          if (!isMobile) {
            audioRef.current.removeEventListener('canplaythrough', () => {
              setAudioReady(true);
            });
          }
          audioRef.current = null;
        }
      };
    } catch (error) {
      console.error("Error setting up audio:", error);
    }
  }, [isClient, songUrl, isMobile]);

  // Handle play/pause separately
  useEffect(() => {
    if (!audioRef.current || !isClient || !audioReady) return;

    if (audioEnabled) {
      // For mobile, try to play on user interaction
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error("Error playing audio:", err);
          setAudioEnabled(false);
        }).then(() => {
          setIsPlaying(true);
        });
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [audioEnabled, isClient, audioReady]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  // Don't render anything on the server
  if (!isClient) {
    return null;
  }

  return (
    <div className={`fixed z-50 ${isMobile ? 'bottom-20 right-4' : 'bottom-4 left-4'}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleAudio}
        className="bg-white/80 backdrop-blur-sm border-pink-200 hover:bg-pink-50 flex items-center gap-2 shadow-md"
        aria-label={audioEnabled ? "Pausar música" : "Reproducir música"}
      >
        {audioEnabled ? (
          <>
            <Volume2 className="h-4 w-4 text-pink-500" />
            {!isMobile && <span className="text-pink-800">Las Mañanitas</span>}
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4 text-pink-500" />
            {!isMobile && <span className="text-pink-800">Iniciar Música</span>}
          </>
        )}
      </Button>
    </div>
  );
}
