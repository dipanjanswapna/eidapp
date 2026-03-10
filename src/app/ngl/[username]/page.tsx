import { notFound } from 'next/navigation';
import { findNGLUserByUsername } from '@/lib/db';
import ConfettiBackground from '@/components/confetti-background';
import type { Metadata } from 'next';
import { NGLUser } from '@/lib/types';
import NGLProfilePageClient from '@/components/ngl-profile-page-client';

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
  const description = `Send secret anonymous messages to ${user.name} (@${user.username}) on EidVibe.`;

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

  const { pin, ...userWithoutPin } = user;

  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <NGLProfilePageClient user={userWithoutPin as NGLUser} />
      </div>
    </div>
  );
}
