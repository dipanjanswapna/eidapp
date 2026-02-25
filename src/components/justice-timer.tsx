'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';

const JusticeTimer = () => {
  const { language } = useLanguage();
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This component should only render on the client side to avoid hydration mismatches
    // with the server, as it relies on the current time.
    setIsClient(true);
    
    // Based on public information, Osman Hadi passed away on July 19, 2024.
    // Using this date to accurately calculate the time of injustice.
    // The user provided time is 2:30 PM.
    const incidentDate = new Date('2024-07-19T14:30:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - incidentDate;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setElapsed({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timerText = {
    en: {
        title: "In memory of Bangladesh's July revolutionary Osman Hadi",
        subtitle: "Justice has not yet been served for his murder.",
        timerLabel: "Time of injustice:"
    },
    bn: {
        title: "বাংলাদেশের জুলাই বিপ্লবী ওসমান হাদির স্মরণে",
        subtitle: "হত্যার বিচার আজও হয়নি।",
        timerLabel: "বিচারহীনতার সময়কাল:"
    }
  }

  const selectedText = timerText[language];
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full bg-black text-white py-4">
      <div className="container mx-auto flex items-center justify-center gap-4 md:gap-8 px-4">
        <div className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0">
          <Image
            src="https://i.postimg.cc/8cQdrDXV/image.png"
            alt="Osman Hadi"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        </div>
        <div className="text-left">
          <h3 className="font-bold text-sm md:text-lg">{selectedText.title}</h3>
          <p className="text-xs md:text-sm text-gray-400">{selectedText.subtitle}</p>
          <div className="mt-2">
            <p className="text-xs text-amber-400">{selectedText.timerLabel}</p>
            <div className="flex items-center gap-2 md:gap-4 font-mono text-base md:text-xl font-bold">
              <div>{String(elapsed.days).padStart(3, '0')} <span className="text-xs font-normal">d</span></div>
              <div>{String(elapsed.hours).padStart(2, '0')} <span className="text-xs font-normal">h</span></div>
              <div>{String(elapsed.minutes).padStart(2, '0')} <span className="text-xs font-normal">m</span></div>
              <div>{String(elapsed.seconds).padStart(2, '0')} <span className="text-xs font-normal">s</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JusticeTimer;
