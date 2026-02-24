'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IftarSpot, FoodType } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import { Button } from './ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import { voteOnIftarSpotAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

// Fix for default icon not showing in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default.src,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default.src,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default.src,
});

type IftarMapProps = {
  spots: IftarSpot[];
  onVote: () => void;
};

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function IftarMap({ spots, onVote }: IftarMapProps) {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [votedSpots, setVotedSpots] = useState<Record<string, 'like' | 'dislike'>>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem('votedSpots');
    return saved ? JSON.parse(saved) : {};
  });

  const handleVote = async (spotId: string, voteType: 'like' | 'dislike') => {
    if (votedSpots[spotId]) {
      toast({ variant: 'destructive', title: 'Already Voted', description: "You've already voted for this spot." });
      return;
    }

    try {
      await voteOnIftarSpotAction(spotId, voteType);
      const newVotedSpots = { ...votedSpots, [spotId]: voteType };
      setVotedSpots(newVotedSpots);
      localStorage.setItem('votedSpots', JSON.stringify(newVotedSpots));
      onVote();
      toast({ title: 'Vote Counted', description: 'Thank you for your feedback!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to record vote.' });
    }
  };
  
  const dhakaPosition: [number, number] = [23.8103, 90.4125];

  return (
    <MapContainer center={dhakaPosition} zoom={12} scrollWheelZoom={true} className="h-full w-full z-0">
      <ChangeView center={dhakaPosition} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => (
        <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
          <Popup>
            <div className="space-y-2">
              <h3 className="font-bold text-lg">{spot.masjidName}</h3>
              <p>{spot.area}</p>
              <p>
                <span className="font-semibold">{translations.iftar.addSpotDialog.foodType.label}: </span>
                {spot.foodType === 'others' ? spot.otherFoodTypeName : translations.iftar.foodTypes[spot.foodType as FoodType]}
              </p>
              <div className="flex items-center justify-between gap-4 border-t pt-2">
                <div className='flex items-center gap-2'>
                  <Button
                    size="sm"
                    variant={votedSpots[spot.id] === 'like' ? 'default' : 'outline'}
                    onClick={() => handleVote(spot.id, 'like')}
                    disabled={!!votedSpots[spot.id]}
                    className="flex items-center gap-1 px-2 h-8"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{spot.likes}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={votedSpots[spot.id] === 'dislike' ? 'destructive' : 'outline'}
                    onClick={() => handleVote(spot.id, 'dislike')}
                    disabled={!!votedSpots[spot.id]}
                    className="flex items-center gap-1 px-2 h-8"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{spot.dislikes}</span>
                  </Button>
                </div>
                <p className='text-xs text-muted-foreground'>
                    {spot.likes + spot.dislikes > 0 ? `${translations.iftar.map.popup.verifiedBy} ${spot.likes + spot.dislikes} ${translations.iftar.map.popup.people}` : ''}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
