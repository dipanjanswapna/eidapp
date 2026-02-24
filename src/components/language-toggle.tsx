'use client';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-white/20"
    >
      <Globe className="mr-2 h-5 w-5" />
      {language === 'en' ? 'EN' : 'BN'}
    </Button>
  );
}
