'use client';

import Link from 'next/link';
import { LanguageToggle } from './language-toggle';
import { Gift, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from './ui/button';

export function Navbar() {
    const { translations } = useLanguage();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Gift className="h-6 w-6" />
                    <span className="hidden font-bold sm:inline-block">Eid-E-Salami</span>
                </Link>
                <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
                     <Button variant="ghost" asChild>
                        <Link href="/">{translations.nav.home}</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/create">{translations.nav.create}</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/calculator" className="flex items-center gap-1">
                           <Calculator className="h-4 w-4" /> {translations.nav.calculator}
                        </Link>
                    </Button>
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <LanguageToggle />
                </div>
            </div>
        </header>
    );
}
