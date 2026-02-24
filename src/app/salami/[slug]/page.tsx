import { notFound } from 'next/navigation';
import { SalamiCard } from '@/components/salami-card';
import { getProfileBySlug, getWishesBySlug } from '@/lib/db';
import ConfettiBackground from '@/components/confetti-background';
import SalamiPageClient from '@/components/salami-page-client';
import type { Metadata } from 'next';
import placeholderData from '@/lib/placeholder-images.json';

type SalamiPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: SalamiPageProps): Promise<Metadata> {
  const profile = await getProfileBySlug(params.slug);

  if (!profile) {
    return {
      title: 'Salami Page Not Found',
    };
  }

  const title = `Send Salami to ${profile.userName}!`;
  const description = `This Eid, send your salami to ${profile.userName}. "${profile.salamiMessage}"`;
  const ogImage = placeholderData.placeholderImages.find(p => p.id === 'funny-card-bg')?.imageUrl || '';

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      url: `/salami/${profile.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
    },
  };
}


export default async function SalamiPage({ params }: SalamiPageProps) {
  const profile = await getProfileBySlug(params.slug);
  if (!profile) {
    notFound();
  }
  const initialWishes = await getWishesBySlug(params.slug);

  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <div id="salami-card-container" className="mb-8">
            <SalamiCard profile={profile} />
        </div>
        <SalamiPageClient profile={profile} initialWishes={initialWishes} />
      </div>
    </div>
  );
}
