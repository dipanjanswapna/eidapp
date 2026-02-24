import { notFound } from 'next/navigation';
import { getEidCardById } from '@/lib/db';
import ConfettiBackground from '@/components/confetti-background';
import { EidCardDisplay } from '@/components/eid-card-display';
import { EidCardClientControls } from '@/components/eid-card-client-controls';
import type { Metadata } from 'next';

type EidCardPageProps = {
  params: {
    cardId: string;
  };
};

export async function generateMetadata({ params }: EidCardPageProps): Promise<Metadata> {
  const card = await getEidCardById(params.cardId);

  if (!card) {
    return {
      title: 'Eid Card Not Found',
    };
  }

  const title = `A special Eid card for ${card.recipientName}!`;
  const description = `You received a personalized Eid card on Mon Torongo.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/eid-card/${card.id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function EidCardPage({ params }: EidCardPageProps) {
  const card = await getEidCardById(params.cardId);
  if (!card) {
    notFound();
  }

  return (
    <div className="relative min-h-screen w-full">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <div id="eid-card-container" className="mb-8">
            <EidCardDisplay card={card} />
        </div>
        <EidCardClientControls card={card} />
      </div>
    </div>
  );
}
