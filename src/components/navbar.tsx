'use client';

import Link from 'next/link';
import { LanguageToggle } from './language-toggle';
import { Gift, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function Navbar() {
    const { translations } = useLanguage();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                {/* Left side: Brand */}
                <Link href="/" className="flex items-center space-x-2">
                    <Gift className="h-6 w-6" />
                    <span className="font-bold sm:inline-block">Eid-E-Salami</span>
                </Link>

                {/* Center: Desktop Nav */}
                <nav className="hidden items-center gap-6 text-sm md:flex">
                    <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">{translations.nav.home}</Link>
                    <Link href="/create" className="transition-colors hover:text-foreground/80 text-foreground/60">{translations.nav.create}</Link>
                    <Link href="/calculator" className="font-semibold text-foreground transition-colors hover:text-foreground/80">{translations.nav.calculator}</Link>
                </nav>

                {/* Right side: Actions + Mobile Menu */}
                <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <div className="md:hidden">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <nav className="grid gap-6 text-lg font-medium mt-8">
                                    <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
                                        <Gift className="h-6 w-6" />
                                        <span>Eid-E-Salami</span>
                                    </Link>
                                    <Link href="/" onClick={() => setOpen(false)} className="hover:text-foreground/80">{translations.nav.home}</Link>
                                    <Link href="/create" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground/80">{translations.nav.create}</Link>
                                    <Link href="/calculator" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground/80">{translations.nav.calculator}</Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
