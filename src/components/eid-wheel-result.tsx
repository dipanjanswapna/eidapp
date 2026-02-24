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

type EidWheelResultProps = {
  name: string;
  result: string;
  index: number;
};

export default function EidWheelResult({ name, result }: EidWheelResultProps) {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShare = async () => {
    setIsSharing(true);
    const receiptElement = document.getElementById('eid-plan-receipt');
    if (receiptElement && navigator.share) {
      try {
        const canvas = await html2canvas(receiptElement, { scale: 2, useCORS: true, backgroundColor: '#FEFDF8' });
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        
        if (blob) {
            const filesArray = [
                new File([blob], `${name}-eid-plan.png`, {
                type: 'image/png',
                lastModified: new Date().getTime(),
                }),
            ];
            await navigator.share({
                title: translations.eidWheel.results.title,
                text: `Check out my Eid plan!`,
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
          description: translations.eidWheel.results.shareError,
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
        const receiptElement = document.getElementById('eid-plan-receipt');
        if (receiptElement) {
        html2canvas(receiptElement, { scale: 3, useCORS: true, backgroundColor: '#FEFDF8' }).then((canvas) => {
            const link = document.createElement('a');
            link.download = `eid-plan-${name}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
        }
    };

  return (
    <>
    {isClient && <Confetti recycle={false} numberOfPieces={400} />}
    <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <div id="eid-plan-receipt" className="bg-[#FEFDF8] p-2 sm:p-4 rounded-lg">
            <div className="relative overflow-hidden border-4 border-dashed border-yellow-300 bg-yellow-50 p-4 sm:p-6 shadow-lg rounded-lg">
                <Image src="https://i.postimg.cc/bJWtCFrB/aesthetic-eid-al-fitr-background-free-vector.jpg" alt="Receipt background" fill className="object-cover opacity-20" />
                
                <div className="relative text-center mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{translations.eidWheel.results.title}</h1>
                    <p className="text-xs sm:text-sm text-gray-500">{translations.eidWheel.results.resultFor} {name}</p>
                </div>

                <div className="relative my-8 text-center bg-primary/10 p-6 rounded-lg border border-primary/20">
                    <p className="font-semibold text-gray-600">{translations.eidWheel.results.plan}</p>
                    <p className="mt-2 text-2xl sm:text-3xl italic font-bold text-primary">&ldquo;{result}&rdquo;</p>
                </div>

                <div className="relative mt-8 flex items-center justify-between">
                     <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Waves className="h-4 w-4" />
                        <span>monotorongo.com</span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-700">Eid Mubarak!</p>
                    </div>
                </div>

                 <div className="relative mt-4 border-t border-dashed border-gray-400 pt-3 text-center text-xs text-gray-600">
                    <p>{translations.eidWheel.results.footerDisclaimer}</p>
                </div>
            </div>
        </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Button onClick={handleDownload} className="w-full lg:col-span-1" size="lg">
          <Download className="mr-2 h-5 w-5" />
          {translations.eidWheel.results.downloadButton}
        </Button>
        <Button onClick={handleShare} disabled={isSharing} className="w-full lg:col-span-1" size="lg" variant="outline">
          {isSharing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Share2 className="mr-2 h-5 w-5" />}
          {isSharing ? translations.eidWheel.results.sharing : translations.eidWheel.results.shareButton}
        </Button>
        <Button asChild className="w-full lg:col-span-1" size="lg" variant="secondary">
          <Link href="/eid-wheel">
            <RotateCcw className="mr-2 h-5 w-5" />
            {translations.eidWheel.results.backButton}
          </Link>
        </Button>
      </div>
    </div>
    </>
  );
}
