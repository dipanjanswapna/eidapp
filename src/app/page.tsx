'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import ConfettiBackground from '@/components/confetti-background';
import { SalamiCard } from '@/components/salami-card';
import type { SalamiProfile } from '@/lib/types';

const dummyProfile: SalamiProfile = {
  id: '1',
  slug: 'dummy',
  userName: 'Anik',
  salamiMessage: 'টাকা দিয়ে ভালোবাসা হয় না, কিন্তু সালামি দিয়ে হয়!',
  cardTheme: 'Funny',
  bkashNumber: '',
  nagadNumber: '',
  createdAt: new Date(),
};

export default function Home() {
  const { translations, language } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto px-4 py-16 text-center md:py-24">
        <h1
          className={`font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl ${
            language === 'bn' ? 'font-headline' : 'font-headline'
          }`}
        >
          {translations.home.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
          {translations.home.subtitle}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/create">{translations.home.ctaButton}</Link>
          </Button>
        </div>
        <div className="mt-16 flex justify-center">
            <div className="w-full max-w-md scale-90 transform-gpu transition-transform duration-500 hover:scale-95">
                <SalamiCard profile={dummyProfile} />
            </div>
        </div>
      </div>
    </div>
  );
}
