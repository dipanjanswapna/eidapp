import NGLInboxLogin from '@/components/ngl-inbox-login';
import ConfettiBackground from '@/components/confetti-background';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function NGLInboxLoginPage() {
  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto flex min-h-[80vh] max-w-md items-center justify-center px-4 py-12">
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <NGLInboxLogin />
        </Suspense>
      </div>
    </div>
  );
}
