'use client';

import Link from 'next/link';
import { LanguageToggle } from './language-toggle';
import { Menu, Waves, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { translations } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: translations.nav.home },
    { href: '/create', label: translations.nav.create },
    { href: '/calculator', label: translations.nav.calculator },
    { href: '/ngl/inbox', label: translations.nav.ngl },
  ];

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden bg-primary">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Left side: Brand */}
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center space-x-2 text-primary-foreground">
            <Waves className="h-7 w-7" />
            <span className="text-xl font-bold">{translations.nav.brand}</span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden items-center gap-1 rounded-full bg-white/10 p-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/20',
                pathname.startsWith(link.href) && link.href !== '/' || pathname === link.href ? 'bg-background text-primary hover:bg-background/90' : ''
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Actions + Mobile Menu */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <Button asChild className="rounded-full bg-background font-semibold text-primary shadow-sm hover:bg-background/90">
              <Link href="/ngl/create">
                {translations.nav.register}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
                  <Menu />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary text-primary-foreground">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
                    <Waves className="h-6 w-6" />
                    <span>{translations.nav.brand}</span>
                  </Link>
                  {navLinks.map((link) => (
                     <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="hover:text-background/80">{link.label}</Link>
                  ))}
                   <div className="mt-4 flex flex-col gap-4">
                     <LanguageToggle />
                      <Button asChild className="w-full rounded-full bg-background font-semibold text-primary shadow-sm hover:bg-background/90">
                        <Link href="/ngl/create">
                          {translations.nav.register}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
