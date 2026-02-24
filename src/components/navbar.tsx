'use client';

import Link from 'next/link';
import { LanguageToggle } from './language-toggle';
import { Gift } from 'lucide-react';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Gift className="h-6 w-6" />
                    <span className="font-bold">Eid-E-Salami</span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <LanguageToggle />
                </div>
            </div>
        </header>
    );
}
