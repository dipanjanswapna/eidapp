'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

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
  
  const segmentColors = [
    '#fde047', '#facc15', '#fbbf24', '#fb923c', '#f97316', '#ef4444', '#fde047', '#facc15', '#fbbf24', '#fb923c', '#f97316', '#ef4444', '#fde047', '#facc15', '#fbbf24'
  ].slice(0, numOptions);


  const handleSpin = () => {
    if (!name) {
      setNameError('Please enter your name.');
      return;
    }
    setNameError('');
    setIsSpinning(true);

    const randomSpins = Math.floor(Math.random() * 5) + 5;
    const randomIndex = Math.floor(Math.random() * numOptions);
    const newRotation = rotation + (randomSpins * 360) - (randomIndex * anglePerOption) - (anglePerOption / 2);
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const result = wheelOptions[randomIndex];
      router.push(`/eid-wheel/result?name=${encodeURIComponent(name)}&result=${encodeURIComponent(result)}&index=${randomIndex}`);
    }, 5000);
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
        `}</style>
        
        <div 
          className="absolute right-[-10px] top-1/2 z-10 h-10 w-5 -translate-y-1/2"
          style={{
            clipPath: 'polygon(100% 50%, 0 0, 0 100%)',
            background: 'white',
            filter: 'drop-shadow(-2px 2px 2px rgba(0,0,0,0.3))'
          }}
        />

        <div 
          className="wheel relative h-full w-full rounded-full"
          style={{ 
            transform: `rotate(${rotation}deg)`,
          }}
        >
           <div 
              className="absolute h-full w-full rounded-full border border-black/20"
              style={{
                background: `conic-gradient(
                  from -${anglePerOption / 2}deg,
                  ${segmentColors.map((color, index) => {
                    const start = index * anglePerOption;
                    const end = start + anglePerOption;
                    return `${color} ${start}deg ${end}deg`;
                  }).join(', ')}
                )`
              }}
            />

            {wheelOptions.map((option, index) => {
                const angle = index * anglePerOption + (anglePerOption / 2);
                return (
                    <div
                        key={index}
                        className="pointer-events-none absolute left-0 top-0 flex h-full w-full justify-center"
                        style={{ transform: `rotate(${angle}deg)` }}
                    >
                        <div
                            style={{
                                transform: `translateY(25%) rotate(-90deg)`,
                            }}
                            className="origin-center text-center text-[10px] font-bold text-black sm:text-xs"
                        >
                           {option.split(':')[0]}
                        </div>
                    </div>
                );
            })}
             <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg sm:h-24 sm:w-24">
            </div>
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
