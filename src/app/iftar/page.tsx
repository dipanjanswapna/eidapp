import IftarSpotsClient from '@/components/iftar-spots-client';
import ConfettiBackground from '@/components/confetti-background';

export default function IftarSpotsPage() {
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      <IftarSpotsClient />
    </div>
  );
}
