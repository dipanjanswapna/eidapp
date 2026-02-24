'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import ConfettiBackground from '@/components/confetti-background';

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
        <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl">
          {translations.home.subtitle}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/create">{translations.home.ctaButton}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/calculator">{translations.home.calculatorCtaButton}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
