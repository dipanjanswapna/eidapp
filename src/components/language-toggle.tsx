'use client';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
      {language === 'en' ? 'বাংলা' : 'English'}
    </Button>
  );
}
