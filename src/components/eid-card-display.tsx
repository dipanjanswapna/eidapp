import type { EidCard } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Moon, Star } from 'lucide-react';

type EidCardDisplayProps = {
  card: EidCard;
};

const themeClasses = {
  'royal-blue': {
    bg: 'bg-gradient-to-br from-blue-800 to-indigo-900',
    text: 'text-white',
    accent: 'text-yellow-300',
    border: 'border-blue-500',
  },
  'bright-red': {
    bg: 'bg-gradient-to-br from-red-700 to-rose-800',
    text: 'text-white',
    accent: 'text-yellow-200',
    border: 'border-red-400',
  },
  'golden-yellow': {
    bg: 'bg-gradient-to-br from-yellow-500 to-amber-600',
    text: 'text-gray-900',
    accent: 'text-white',
    border: 'border-yellow-300',
  }
};

export function EidCardDisplay({ card }: EidCardDisplayProps) {
  const theme = themeClasses[card.theme];

  return (
    <div className={cn("w-full aspect-[4/5] max-w-md mx-auto rounded-xl shadow-2xl p-4 flex flex-col relative overflow-hidden", theme.bg, theme.text, theme.border)}>
        {/* Decorative stars */}
        <Star className="absolute top-8 left-10 h-8 w-8 opacity-20 transform -rotate-12" fill="currentColor" />
        <Star className="absolute top-20 right-8 h-5 w-5 opacity-30 transform rotate-12" fill="currentColor" />
        <Moon className="absolute bottom-16 left-12 h-12 w-12 opacity-10 transform rotate-45" fill="currentColor" />
        <Star className="absolute bottom-8 right-16 h-6 w-6 opacity-25 transform" fill="currentColor" />


        <header className="text-center border-b-2 border-dashed border-white/30 pb-4 z-10">
            <h2 className="text-2xl font-bold">A Special Eid Card For</h2>
            <h1 className={cn("text-5xl font-extrabold mt-2 tracking-tight", theme.accent)}>{card.recipientName}</h1>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center p-4 z-10">
            <p className={cn("text-6xl font-bold font-headline animate-pulse", theme.accent)}>Eid</p>
            <p className={cn("text-6xl font-bold font-headline", theme.accent)}>Mubarak</p>
            <p className="mt-6 text-lg italic leading-relaxed">
                &ldquo;{card.message}&rdquo;
            </p>
        </main>

        <footer className="text-center pt-4 border-t-2 border-dashed border-white/30 z-10">
            <p className="text-sm opacity-80">From your well-wisher on</p>
            <p className="font-bold text-lg">monotorongo.com</p>
        </footer>
    </div>
  );
}
