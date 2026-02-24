'use client';
import ConfettiBackground from '@/components/confetti-background';
import SalamiCalculator from '@/components/salami-calculator';
import { useLanguage } from '@/contexts/language-context';

export default function CalculatorPage() {
    const { translations } = useLanguage();
  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                {translations.calculator.title}
            </h1>
            <p className="mt-4 text-lg text-foreground/80">
                {translations.calculator.description}
            </p>
        </div>
        <SalamiCalculator />
      </div>
    </div>
  );
}
