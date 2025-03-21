"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cake, Gift, CalendarDays } from "lucide-react";
import confetti from "canvas-confetti";

// Function to get time remaining
const getTimeRemaining = (birthdayMonth: number, birthdayDay: number) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // JavaScript months are 0-based
  const currentDay = now.getDate();

  // Check if today is the birthday
  if (currentMonth === birthdayMonth && currentDay === birthdayDay) {
    return { isBirthday: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Calculate next birthday year
  let nextBirthdayYear = currentYear;
  
  // If we've already passed this year's birthday, use next year
  if (
    currentMonth > birthdayMonth || 
    (currentMonth === birthdayMonth && currentDay > birthdayDay)
  ) {
    nextBirthdayYear = currentYear + 1;
  }

  // Set next birthday date at midnight
  const nextBirthday = new Date(nextBirthdayYear, birthdayMonth - 1, birthdayDay, 0, 0, 0, 0);
  const nowTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), 0);
  
  // Calculate time remaining
  const totalSeconds = Math.floor((nextBirthday.getTime() - nowTime.getTime()) / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    isBirthday: false,
    days,
    hours,
    minutes,
    seconds
  };
};

export default function BirthdayCountdown() {
  // Customize with your mom's birthday (month, day)
  const birthdayMonth = 3; // March
  const birthdayDay = 21;

  // Initialize with dummy values to prevent hydration errors
  const [timeRemaining, setTimeRemaining] = useState({
    isBirthday: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Mark as client-side rendered first
  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only run timer on client-side to prevent hydration mismatches
  useEffect(() => {
    if (!isClient) return;

    setTimeRemaining(getTimeRemaining(birthdayMonth, birthdayDay));

    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(birthdayMonth, birthdayDay));
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdayMonth, birthdayDay, isClient]);

  useEffect(() => {
    if (!isClient || !timeRemaining.isBirthday || showAnimation) return;
    if (isMobile) {
      // For mobile, just set the flag but don't run confetti animation
      setShowAnimation(true);
      return;
    }

    setShowAnimation(true);

    // Wrap in setTimeout to ensure DOM is fully loaded
    setTimeout(() => {
      try {
        // Celebration animation
        const runConfetti = () => {
          const duration = 3 * 1000;
          const end = Date.now() + duration;

          const colors = ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB'];

          (function frame() {
            confetti({
              particleCount: 3,
              angle: 60,
              spread: 75,
              origin: { x: 0, y: 0.6 },
              colors,
            });

            confetti({
              particleCount: 3,
              angle: 120,
              spread: 75,
              origin: { x: 1, y: 0.6 },
              colors,
            });

            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          }());
        };

        runConfetti();
      } catch (error) {
        console.error('Confetti error:', error);
      }
    }, 500);
  }, [timeRemaining.isBirthday, showAnimation, isClient, isMobile]);

  if (!isClient) {
    return (
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <Card className="border-pink-100 shadow-sm overflow-hidden bg-white">
            <CardContent className="p-4 md:p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <CalendarDays className="h-6 w-6 md:h-8 md:w-8 text-pink-500 mr-2 md:mr-4" />
                <div>
                  <h3 className="text-lg md:text-2xl font-medium text-pink-600">
                    Cuenta Regresiva
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    Cargando...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <Card className={`border-pink-100 shadow-sm overflow-hidden ${timeRemaining.isBirthday ? "bg-gradient-to-r from-pink-100 to-pink-50" : "bg-white"}`}>
          <CardContent className={`p-4 md:p-8 flex flex-col ${isMobile ? "gap-4" : "md:flex-row"} items-center justify-between`}>
            <div className="flex items-center mb-2 md:mb-0">
              {timeRemaining.isBirthday ? (
                <Cake className="h-6 w-6 md:h-8 md:w-8 text-pink-500 mr-2 md:mr-4" />
              ) : (
                <CalendarDays className="h-6 w-6 md:h-8 md:w-8 text-pink-500 mr-2 md:mr-4" />
              )}

              <div>
                {timeRemaining.isBirthday ? (
                  <h3 className="text-lg md:text-2xl font-medium text-pink-600">
                    ¡Hoy es tu Cumpleaños!
                  </h3>
                ) : (
                  <h3 className="text-lg md:text-2xl font-medium text-pink-600">
                    Cuenta Regresiva
                  </h3>
                )}
                <p className="text-sm md:text-base text-gray-600">
                  {timeRemaining.isBirthday
                    ? "Que este día esté lleno de amor y alegría"
                    : `Próximo cumpleaños: ${birthdayDay}/${birthdayMonth}`
                  }
                </p>
              </div>
            </div>

            {!timeRemaining.isBirthday && (
              <div className="flex gap-3 md:gap-4">
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-pink-600">{timeRemaining.days.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-gray-500">Días</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-pink-600">{timeRemaining.hours.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-gray-500">Horas</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-pink-600">{timeRemaining.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-gray-500">Min.</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-3xl font-bold text-pink-600">{timeRemaining.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-gray-500">Seg.</div>
                </div>
              </div>
            )}

            {timeRemaining.isBirthday && (
              <div className="flex items-center">
                <Gift className="h-5 w-5 md:h-6 md:w-6 text-pink-500 mr-2 animate-bounce" />
                <span className="text-sm md:text-base text-pink-600 font-medium">¡Celebremos!</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
