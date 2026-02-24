'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ArrowRight, Ticket, Triangle } from 'lucide-react';

export default function EidWheel() {
  const { translations } = useLanguage();
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const wheelOptions = translations.eidWheel.options;
  const numOptions = wheelOptions.length;
  const anglePerOption = 360 / numOptions;

  const handleSpin = () => {
    if (!name) {
      setNameError('Please enter your name.');
      return;
    }
    setNameError('');
    setIsSpinning(true);

    const randomSpins = Math.floor(Math.random() * 5) + 5; // 5 to 10 full spins
    const randomIndex = Math.floor(Math.random() * numOptions);
    const newRotation = rotation + (randomSpins * 360) - (randomIndex * anglePerOption) - (anglePerOption / 2);
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const result = wheelOptions[randomIndex];
      router.push(`/eid-wheel/result?name=${encodeURIComponent(name)}&result=${encodeURIComponent(result)}&index=${randomIndex}`);
    }, 5000); // Corresponds to the animation duration
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">{translations.eidWheel.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{translations.eidWheel.description}</p>
      </div>

      <div className="relative flex h-[350px] w-[350px] items-center justify-center sm:h-[450px] sm:w-[450px]">
        <style jsx>{`
          .wheel {
            transition: transform 5s cubic-bezier(0.25, 0.1, 0.25, 1);
          }
          .wheel-segment {
            clip-path: polygon(50% 50%, 100% 0, 100% 100%);
          }
        `}</style>
        
        <Triangle 
          className="absolute top-[-15px] z-10 h-8 w-8 text-accent fill-accent drop-shadow-lg" 
          style={{ transform: 'rotate(180deg)' }}
        />

        <div 
          className="wheel absolute h-full w-full rounded-full border-4 border-accent overflow-hidden"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {wheelOptions.map((option, index) => (
            <div
              key={index}
              className="absolute h-1/2 w-1/2 origin-bottom-left"
              style={{
                transform: `rotate(${index * anglePerOption}deg)`,
              }}
            >
              <div
                className={cn(
                  "wheel-segment flex h-full w-full items-center justify-center text-center",
                  index % 2 === 0 ? 'bg-primary/10' : 'bg-background'
                )}
              >
                <span 
                  className="transform text-sm font-semibold"
                  style={{ 
                    transform: `rotate(${anglePerOption / 2 - 90}deg) translate(30%, -50%)`,
                    width: '80%', 
                    display: 'block'
                  }}
                >
                  {option.split(':')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Ticket className="h-10 w-10" />
        </div>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{translations.eidWheel.name.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input 
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (nameError) setNameError('');
              }}
              placeholder={translations.eidWheel.name.placeholder}
              disabled={isSpinning}
            />
            {nameError && <p className="text-sm text-destructive">{nameError}</p>}
            <Button onClick={handleSpin} disabled={isSpinning || !name} size="lg" className="w-full">
              {isSpinning ? 'Spinning...' : translations.eidWheel.spinButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
