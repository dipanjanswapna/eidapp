import { notFound } from 'next/navigation';
import { findNGLUserByUsername } from '@/lib/db';
import ConfettiBackground from '@/components/confetti-background';
import { NGLSendMessageForm } from '@/components/ngl-send-message-form';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

type NGLProfilePageProps = {
  params: {
    username: string;
  };
};

export default async function NGLProfilePage({ params }: NGLProfilePageProps) {
  const user = await findNGLUserByUsername(params.username);
  if (!user) {
    notFound();
  }

  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <Card>
            <div className="flex flex-col items-center p-6 text-center">
                <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg">
                    <AvatarFallback className="bg-primary/10 text-4xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="mt-4 text-3xl font-bold">Send a secret message to {user.name}</h1>
                <p className="text-muted-foreground">Your identity will be kept secret.</p>
            </div>
            <NGLSendMessageForm username={user.username} />
        </Card>
      </div>
    </div>
  );
}
