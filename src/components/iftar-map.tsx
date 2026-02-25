'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IftarSpot, FoodType } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import { Button } from './ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { voteOnIftarSpotAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

type IftarMapProps = {
  spots: IftarSpot[];
  center: [number, number];
  zoom: number;
  userLocation: [number, number] | null;
};

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
      map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Haversine distance function
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

// Custom Icons
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userLocationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


export default function IftarMap({ spots, center, zoom, userLocation }: IftarMapProps) {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [votedSpots, setVotedSpots] = useState<Record<string, 'like' | 'dislike'>>({});
  
  const defaultIcon = useMemo(() => new L.Icon({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default.src,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default.src,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }), []);


  useEffect(() => {
    const saved = localStorage.getItem('votedSpots');
    if (saved) {
      setVotedSpots(JSON.parse(saved));
    }
  }, []);

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
      toast({ title: 'Vote Counted', description: 'Thank you for your feedback!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to record vote.' });
    }
  };

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full z-0">
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => {
        let distance: number | null = null;
        if (userLocation) {
            distance = getDistanceFromLatLonInKm(
                userLocation[0],
                userLocation[1],
                spot.latitude,
                spot.longitude
            );
        }
        const isNearby = distance !== null && distance <= 15;

        return (
            <Marker key={spot.id} position={[spot.latitude, spot.longitude]} icon={isNearby ? redIcon : defaultIcon}>
                <Popup>
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">{spot.masjidName}</h3>
                        <p>{spot.area}</p>
                        <p>
                            <span className="font-semibold">{translations.iftar.addSpotDialog.foodType.label}: </span>
                            {spot.foodType === 'others' ? spot.otherFoodTypeName : translations.iftar.foodTypes[spot.foodType as FoodType]}
                        </p>
                         {distance !== null && (
                            <p className="font-semibold border-t mt-2 pt-2">{translations.iftar.map.popup.distance} {distance.toFixed(1)} {translations.iftar.map.popup.kmAway}</p>
                        )}
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
        );
      })}
      {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
              <Popup>{translations.iftar.map.popup.yourLocation}</Popup>
          </Marker>
      )}
    </MapContainer>
  );
}
