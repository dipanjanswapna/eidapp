'use client';
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { IftarSpot, FoodType, foodTypes } from '@/lib/types';
import { getIftarSpotsAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, BadgeCheck } from 'lucide-react';
import AddIftarSpotDialog from './add-iftar-spot-dialog';
import dynamic from 'next/dynamic';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

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
  const [allSpots, setAllSpots] = useState<IftarSpot[]>([]);
  const [displayedSpots, setDisplayedSpots] = useState<IftarSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<FoodType | 'all' | 'verified'>('all');
  const [error, setError] = useState<string | null>(null);

  const fetchSpots = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedSpots = await getIftarSpotsAction();
      setAllSpots(fetchedSpots);
    } catch (err) {
      console.error(err);
      setError('Failed to load spots. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpots();
  }, [fetchSpots]);

  useEffect(() => {
    let spotsToDisplay = [...allSpots];
    const isVerified = (spot: IftarSpot) => spot.likes > spot.dislikes;

    if (selectedFilter === 'verified') {
      spotsToDisplay = spotsToDisplay.filter(isVerified);
    } else if (selectedFilter !== 'all') {
      spotsToDisplay = spotsToDisplay.filter((spot) => spot.foodType === selectedFilter);
    }

    const sortedSpots = spotsToDisplay.sort((a, b) => {
      const aIsVerified = isVerified(a);
      const bIsVerified = isVerified(b);

      if (aIsVerified && !bIsVerified) return -1;
      if (!aIsVerified && bIsVerified) return 1;

      if (a.likes !== b.likes) {
        return b.likes - a.likes;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setDisplayedSpots(sortedSpots);
  }, [allSpots, selectedFilter]);

  const handleSpotAdded = () => {
    fetchSpots();
  };

  const handleVote = () => {
    fetchSpots();
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 left-1/2 z-[1000] w-[90vw] max-w-4xl -translate-x-1/2 transform space-y-4">
        <div className="flex justify-center">
          <AddIftarSpotDialog onSpotAdded={handleSpotAdded} />
        </div>

        <Card className="rounded-full shadow-lg">
          <CardContent className="p-1">
            <ScrollArea className="w-full whitespace-nowrap rounded-full">
              <div className="flex items-center space-x-1 p-1">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  className="shrink-0 rounded-full"
                  onClick={() => setSelectedFilter('all')}
                >
                  {translations.iftar.filter.all}
                </Button>
                <Button
                  variant={selectedFilter === 'verified' ? 'default' : 'ghost'}
                  size="sm"
                  className="shrink-0 rounded-full"
                  onClick={() => setSelectedFilter('verified')}
                >
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  {translations.iftar.filter.verified}
                </Button>
                {foodTypes.map((food) => (
                  <Button
                    key={food}
                    variant={selectedFilter === food ? 'default' : 'ghost'}
                    size="sm"
                    className="shrink-0 rounded-full"
                    onClick={() => setSelectedFilter(food)}
                  >
                    {translations.iftar.foodTypes[food]}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="h-2" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="h-full w-full">
        {isLoading && <MapLoadingSkeleton />}
        {error && !isLoading && (
          <div className="flex h-full w-full flex-col items-center justify-center bg-destructive/10 text-destructive">
            <AlertCircle className="h-12 w-12" />
            <p className="mt-4 text-lg font-semibold">{error}</p>
          </div>
        )}
        {!isLoading && !error && <IftarMap spots={displayedSpots} onVote={handleVote} />}
      </div>
    </div>
  );
}
