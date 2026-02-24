import { notFound } from 'next/navigation';
import { findNGLUserByUsername } from '@/lib/db';
import ConfettiBackground from '@/components/confetti-background';
import { NGLSendMessageForm } from '@/components/ngl-send-message-form';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import type { Metadata } from 'next';

type NGLProfilePageProps = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: NGLProfilePageProps): Promise<Metadata> {
  const user = await findNGLUserByUsername(params.username);

  if (!user) {
    return {
      title: 'User Not Found',
    };
  }

  const title = `Send anonymous messages to ${user.name}!`;
  const description = `Send secret anonymous messages to ${user.name} (@${user.username}) on Mon Torongo.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/ngl/${user.username}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}


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
                <p className="mt-4 text-lg font-semibold text-muted-foreground">@{user.username}</p>
                <h1 className="mt-2 text-3xl font-bold">Send me anonymous messages!</h1>
            </div>
            <NGLSendMessageForm username={user.username} />
        </Card>
      </div>
    </div>
  );
}
