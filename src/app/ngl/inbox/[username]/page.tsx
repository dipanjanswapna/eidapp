'use client';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NGLInboxClient } from '@/components/ngl-inbox-client';
import { NGLUser } from '@/lib/types';
import { verifyPinAndGetUserAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import ConfettiBackground from '@/components/confetti-background';

export default function NGLInboxPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<NGLUser | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedPin = sessionStorage.getItem(`ngl_pin_${username}`);
    if (!storedPin) {
      toast({ variant: 'destructive', title: 'Authentication failed', description: 'Please login first.' });
      router.push('/ngl/inbox');
      return;
    }
    setPin(storedPin);

    const verify = async () => {
      try {
        const userData = await verifyPinAndGetUserAction(username, storedPin);
        if (userData) {
          setUser(userData);
        } else {
          sessionStorage.removeItem(`ngl_pin_${username}`);
          toast({ variant: 'destructive', title: 'Authentication failed', description: 'Invalid PIN. Please login again.' });
          router.push('/ngl/inbox');
        }
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
        router.push('/ngl/inbox');
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [username, router, toast]);

  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  if (!user || !pin) {
    return notFound();
  }

  return (
    <>
        <ConfettiBackground />
        <NGLInboxClient user={user} pin={pin} />
    </>
  );
}
