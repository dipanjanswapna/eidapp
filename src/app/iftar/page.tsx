import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const IftarSpotsClient = dynamic(() => import('@/components/iftar-spots-client'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});

export default function IftarSpotsPage() {
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      <IftarSpotsClient />
    </div>
  );
}
