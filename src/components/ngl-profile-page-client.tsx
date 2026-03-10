'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NGLSendMessageForm } from '@/components/ngl-send-message-form';
import { NGLUser } from '@/lib/types';
import { Inbox } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

type NGLProfilePageClientProps = {
  user: NGLUser;
};

export default function NGLProfilePageClient({ user }: NGLProfilePageClientProps) {
  const { translations } = useLanguage();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const storedPin = localStorage.getItem(`ngl_pin_${user.username}`);
    if (storedPin) {
      // For simplicity, we assume if the pin is stored, they are the owner.
      setIsOwner(true);
    }
  }, [user.username]);

  return (
    <Card>
      <div className="flex flex-col items-center p-6 text-center">
        <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg">
          <AvatarFallback className="bg-primary/10 text-4xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="mt-4 text-lg font-semibold text-muted-foreground">@{user.username}</p>
        <h1 className="mt-2 text-3xl font-bold">Send me anonymous messages!</h1>
        {isOwner && (
          <Button asChild className="mt-4">
            <Link href={`/ngl/inbox/${user.username}`}>
              <Inbox className="mr-2 h-4 w-4" />
              {translations.ngl.profile.inboxButton}
            </Link>
          </Button>
        )}
      </div>
      <NGLSendMessageForm username={user.username} />
    </Card>
  );
}
