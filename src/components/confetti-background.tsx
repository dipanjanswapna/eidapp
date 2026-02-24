'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const ConfettiBackground = () => {
  const [pieces, setPieces] = useState<
    {
      id: number;
      style: React.CSSProperties;
      shape: 'rect' | 'circle';
    }[]
  >([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 50 }).map((_, i) => {
      const isCircle = Math.random() > 0.5;
      return {
        id: i,
        shape: isCircle ? 'circle' : 'rect',
        style: {
          left: `${Math.random() * 100}%`,
          top: `${-20 - Math.random() * 100}%`,
          animationDuration: `${5 + Math.random() * 5}s`,
          animationDelay: `${Math.random() * 5}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
          backgroundColor:
            Math.random() > 0.5 ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
        },
      };
    });
    setPieces(newPieces);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(720deg);
          }
        }
        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 16px;
          opacity: 0.7;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .circle {
            border-radius: 50%;
            width: 10px;
            height: 10px;
        }
      `}</style>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={cn('confetti-piece', piece.shape === 'circle' && 'circle')}
          style={piece.style}
        />
      ))}
    </div>
  );
};

export default ConfettiBackground;
