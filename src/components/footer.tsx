'use client';

import Link from 'next/link';
import { Facebook, Linkedin } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  if (pathname === '/iftar') {
    return null;
  }

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <p className="text-center text-sm sm:text-left">
          &copy; {new Date().getFullYear()} EidVibe. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://www.facebook.com/dipanjanswapna/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-5 w-5 transition-colors hover:text-primary" />
          </Link>
          <Link href="https://www.linkedin.com/in/dipanjanswapna/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
