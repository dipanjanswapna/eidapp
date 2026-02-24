import { notFound } from 'next/navigation';
import { SalamiCard } from '@/components/salami-card';
import { getProfileBySlug, getWishesBySlug } from '@/lib/db';
import ConfettiBackground from '@/components/confetti-background';
import SalamiPageClient from '@/components/salami-page-client';

type SalamiPageProps = {
  params: {
    slug: string;
  };
};

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
