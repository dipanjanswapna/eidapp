'use client';

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Share2, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Confetti from 'react-confetti';
import { Waves } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SalamiQuiz } from '@/lib/types';
import { getSalamiQuizById } from '@/lib/db';
import { Skeleton } from './ui/skeleton';

type EidWheelResultProps = {
  quizId: string;
  score: number;
  totalQuestions: number;
  takerName: string;
};

export default function SalamiQuizResult({ quizId, score, totalQuestions, takerName }: EidWheelResultProps) {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [quiz, setQuiz] = useState<SalamiQuiz | null>(null);

  useEffect(() => {
    setIsClient(true);
    const fetchQuiz = async () => {
        if(quizId) {
            const quizData = await getSalamiQuizById(quizId);
            setQuiz(quizData);
        }
    }
    fetchQuiz();
  }, [quizId]);
  
  const salamiWon = quiz ? Math.round((score / totalQuestions) * quiz.maxSalami) : 0;
  const resultMessage = quiz 
    ? translations.salamiQuiz.results.result.replace('{takerName}', takerName).replace('{creatorName}', quiz.creatorName)
    : '';
  const scoreMessage = translations.salamiQuiz.results.score.replace('{score}', score.toString()).replace('{total}', totalQuestions.toString());


  const handleShare = async () => {
    setIsSharing(true);
    const receiptElement = document.getElementById('salami-quiz-receipt');
    if (receiptElement && navigator.share) {
      try {
        const canvas = await html2canvas(receiptElement, { scale: 2, useCORS: true, backgroundColor: '#FEFDF8' });
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        
        if (blob) {
            const filesArray = [
                new File([blob], `salami-quiz-${quizId}.png`, {
                type: 'image/png',
                lastModified: new Date().getTime(),
                }),
            ];
            await navigator.share({
                title: translations.salamiQuiz.results.title,
                text: `I won ${salamiWon} BDT in a Salami Quiz!`,
                files: filesArray,
            });
        } else {
            throw new Error("Canvas to Blob conversion failed");
        }
      } catch (error) {
        console.error('Sharing failed:', error);
        navigator.clipboard.writeText(window.location.href);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: translations.salamiQuiz.results.shareError,
        });
      } finally {
        setIsSharing(false);
      }
    } else {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
        });
        setIsSharing(false);
    }
  };
  
    const handleDownload = () => {
        const receiptElement = document.getElementById('salami-quiz-receipt');
        if (receiptElement) {
        html2canvas(receiptElement, { scale: 3, useCORS: true, backgroundColor: '#FEFDF8' }).then((canvas) => {
            const link = document.createElement('a');
            link.download = `salami-quiz-${quizId}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
        }
    };
    
  if(!quiz) {
    return (
        <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
            <Card className="p-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-8" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-full mt-8" />
            </Card>
        </div>
    )
  }

  return (
    <>
    {isClient && <Confetti recycle={false} numberOfPieces={salamiWon > 0 ? 400: 0} />}
    <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <div id="salami-quiz-receipt" className="bg-[#FEFDF8] p-2 sm:p-4 rounded-lg">
            <div className="relative overflow-hidden border-4 border-dashed border-primary/30 bg-primary/5 p-4 sm:p-6 shadow-lg rounded-lg">
                <Image src="https://i.postimg.cc/bJWtCFrB/aesthetic-eid-al-fitr-background-free-vector.jpg" alt="Receipt background" fill className="object-cover opacity-10" />
                
                <div className="relative text-center mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{translations.salamiQuiz.results.title}</h1>
                    <p className="text-xs sm:text-sm text-gray-500">{resultMessage}</p>
                </div>

                <div className="relative my-8 text-center bg-primary/10 p-6 rounded-lg border border-primary/20">
                    <p className="font-semibold text-gray-600">{scoreMessage}</p>
                    <p className="mt-2 text-3xl sm:text-4xl italic font-bold text-primary">
                        {salamiWon.toLocaleString()} {translations.salamiQuiz.results.currency}
                    </p>
                </div>
                
                <div className="relative text-center bg-background/50 p-4 rounded-md">
                    <p className="font-medium">{translations.salamiQuiz.results.congrats.replace('{name}', takerName)}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        {salamiWon > 0 ? translations.salamiQuiz.results.claim.replace('{name}', quiz.creatorName) : translations.salamiQuiz.results.betterLuck}
                    </p>
                </div>


                <div className="relative mt-8 flex items-center justify-between">
                     <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Waves className="h-4 w-4" />
                        <span>EidVibe</span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-700">Eid Mubarak!</p>
                    </div>
                </div>
            </div>
        </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Button onClick={handleDownload} className="w-full lg:col-span-1" size="lg">
          <Download className="mr-2 h-5 w-5" />
          {translations.salamiQuiz.results.downloadButton}
        </Button>
        <Button onClick={handleShare} disabled={isSharing} className="w-full lg:col-span-1" size="lg" variant="outline">
          {isSharing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Share2 className="mr-2 h-5 w-5" />}
          {isSharing ? translations.salamiQuiz.results.sharing : translations.salamiQuiz.results.shareButton}
        </Button>
        <Button asChild className="w-full lg:col-span-1" size="lg" variant="secondary">
          <Link href="/salami-quiz/create">
            <RotateCcw className="mr-2 h-5 w-5" />
            {translations.salamiQuiz.results.backButton}
          </Link>
        </Button>
      </div>
    </div>
    </>
  );
}
