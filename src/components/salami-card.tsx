import type { SalamiProfile } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import placeholderData from '@/lib/placeholder-images.json';
import { Gift, Moon, Sparkles } from 'lucide-react';

type SalamiCardProps = {
  profile: SalamiProfile;
};

const themeClasses = {
  Funny: 'bg-yellow-100 border-yellow-300 text-yellow-900',
  Cute: 'bg-pink-100 border-pink-300 text-pink-900',
  Traditional: 'bg-green-100 border-green-300 text-green-900',
};

const themeBgImages: Record<string, any> = {
    Funny: placeholderData.placeholderImages.find(p => p.id === 'funny-card-bg'),
    Cute: placeholderData.placeholderImages.find(p => p.id === 'cute-card-bg'),
    Traditional: placeholderData.placeholderImages.find(p => p.id === 'traditional-card-bg'),
}

const avatarPlaceholder = placeholderData.placeholderImages.find(p => p.id === 'user-avatar-placeholder');


export function SalamiCard({ profile }: SalamiCardProps) {
    const cardBg = themeBgImages[profile.cardTheme];

  return (
    <Card className="overflow-hidden shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="relative aspect-[3/2] w-full">
        {cardBg && <Image 
            src={cardBg.imageUrl} 
            alt={cardBg.description}
            data-ai-hint={cardBg.imageHint}
            fill 
            className="object-cover"
        />}
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute top-4 right-4 text-white/80">
            {profile.cardTheme === 'Funny' && <Sparkles className="h-6 w-6" />}
            {profile.cardTheme === 'Cute' && <Gift className="h-6 w-6" />}
            {profile.cardTheme === 'Traditional' && <Moon className="h-6 w-6" />}
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
          <Avatar className="h-20 w-20 border-4 border-white/80 shadow-lg">
            <AvatarImage src={avatarPlaceholder?.imageUrl} data-ai-hint={avatarPlaceholder?.imageHint} alt={profile.userName} />
            <AvatarFallback>{profile.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-3xl font-bold font-headline">{profile.userName}</h2>
          <p className="mt-2 max-w-sm text-lg italic">&ldquo;{profile.salamiMessage}&rdquo;</p>
        </div>
      </div>
       <div className={cn("p-4 text-center text-sm font-semibold", themeClasses[profile.cardTheme])}>
        <p>Eid Mubarak! Send your Salami and make my Eid special!</p>
      </div>
    </Card>
  );
}
