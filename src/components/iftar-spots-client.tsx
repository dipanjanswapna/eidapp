'use client';
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { IftarSpot, FoodType, foodTypes } from '@/lib/types';
import { getIftarSpotsAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import AddIftarSpotDialog from './add-iftar-spot-dialog';
import dynamic from 'next/dynamic';

const IftarMap = dynamic(() => import('@/components/iftar-map'), {
  ssr: false,
  loading: () => <MapLoadingSkeleton />,
});

const MapLoadingSkeleton = () => (
  <div className="flex h-full w-full items-center justify-center bg-muted">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export default function IftarSpotsClient() {
  const { translations } = useLanguage();
  const [spots, setSpots] = useState<IftarSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState<FoodType | 'all'>('all');
  const [error, setError] = useState<string | null>(null);

  const fetchSpots = useCallback(async (foodType: FoodType | 'all') => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedSpots = await getIftarSpotsAction(foodType);
      setSpots(fetchedSpots);
    } catch (err) {
      console.error(err);
      setError('Failed to load spots. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpots(selectedFood);
  }, [selectedFood, fetchSpots]);

  const handleSpotAdded = () => {
    fetchSpots(selectedFood);
  };
  
  const handleVote = () => {
    fetchSpots(selectedFood);
  }

  return (
    <div className="relative h-full w-full">
      <Card className="absolute top-4 left-1/2 z-[1000] -translate-x-1/2 transform rounded-full shadow-lg">
        <CardContent className="p-1">
          <div className="flex items-center space-x-1">
            <Button
              variant={selectedFood === 'all' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedFood('all')}
            >
              {translations.iftar.filter.all}
            </Button>
            {foodTypes.map((food) => (
              <Button
                key={food}
                variant={selectedFood === food ? 'default' : 'ghost'}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedFood(food)}
              >
                {translations.iftar.foodTypes[food]}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="h-full w-full">
        {error && (
          <div className="flex h-full w-full flex-col items-center justify-center bg-destructive/10 text-destructive">
            <AlertCircle className="h-12 w-12" />
            <p className="mt-4 text-lg font-semibold">{error}</p>
          </div>
        )}
        {!error && <IftarMap spots={spots} onVote={handleVote} />}
      </div>

      <AddIftarSpotDialog onSpotAdded={handleSpotAdded} />
    </div>
  );
}
