'use client';

import Link from 'next/link';
import { LanguageToggle } from './language-toggle';
import { Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function Navbar() {
    const { translations } = useLanguage();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Gift className="h-6 w-6" />
                    <span className="hidden font-bold sm:inline-block">Eid-E-Salami</span>
                </Link>
                <nav className="flex flex-1 items-center gap-4 text-sm lg:gap-6">
                    <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">{translations.nav.home}</Link>
                    <Link href="/create" className="transition-colors hover:text-foreground/80 text-foreground/60">{translations.nav.create}</Link>
                    <Link href="/calculator" className="font-semibold text-foreground transition-colors hover:text-foreground/80">{translations.nav.calculator}</Link>
                </nav>
                <div className="flex items-center justify-end space-x-2">
                    <LanguageToggle />
                </div>
            </div>
        </header>
    );
}
