'use client';

import type { EidCard } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Link as LinkIcon, Loader2, Send, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useState } from 'react';

type EidCardClientControlsProps = {
  card: EidCard;
};

export function EidCardClientControls({ card }: EidCardClientControlsProps) {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${type} ${translations.eidCard.display.copied}` });
  };

  const handleDownload = () => {
    setIsDownloading(true);
    const cardElement = document.getElementById('eid-card-container');
    if (cardElement) {
        html2canvas(cardElement, { allowTaint: true, useCORS: true, scale: 2, backgroundColor: null }).then(canvas => {
            const link = document.createElement('a');
            link.download = `eid-card-for-${card.recipientName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            setIsDownloading(false);
        }).catch(err => {
            console.error('Oops, something went wrong!', err);
            setIsDownloading(false);
        });
    }
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: translations.eidCard.display.share.linkCopied });
  };
  
  const handleDirectShare = async () => {
    setIsSharing(true);
    const cardElement = document.getElementById('eid-card-container');
    if (cardElement && navigator.share) {
      try {
        const canvas = await html2canvas(cardElement, { scale: 2, useCORS: true, backgroundColor: null });
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        
        if (blob) {
            const filesArray = [
                new File([blob], `eid-card-for-${card.recipientName}.png`, {
                type: 'image/png',
                lastModified: new Date().getTime(),
                }),
            ];
            await navigator.share({
                title: `A special Eid card for ${card.recipientName}!`,
                text: `I made you a personalized Eid card on Mon Torongo. Check it out!`,
                files: filesArray,
            });
        } else {
            throw new Error("Canvas to Blob conversion failed");
        }
      } catch (error) {
        console.error('Sharing failed:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: translations.eidCard.display.share.shareError,
        });
      } finally {
        setIsSharing(false);
      }
    } else {
        toast({ title: "Direct sharing is not supported on this browser. Try copying the link." });
        setIsSharing(false);
    }
  };

  const hasPaymentInfo = card.bkashNumber || card.nagadNumber || card.rocketNumber;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
            <CardTitle>{translations.eidCard.display.share.title}</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
             <Button onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />}
                {translations.eidCard.display.share.downloadButton}
             </Button>
             <Button onClick={handleShareLink} variant="secondary">
                <LinkIcon className="mr-2 h-4 w-4" />
                {translations.eidCard.display.share.shareButton}
            </Button>
             <Button onClick={handleDirectShare} variant="outline" disabled={isSharing}>
                 {isSharing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Share2 className="mr-2 h-4 w-4" />}
                {translations.eidCard.display.share.directShareButton}
             </Button>
        </CardContent>
      </Card>

      {hasPaymentInfo && (
        <Card>
          <CardHeader>
            <CardTitle>{translations.eidCard.display.paymentTitle}</CardTitle>
            <CardDescription>{translations.eidCard.display.paymentDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {card.bkashNumber && (
              <div>
                <h3 className="mb-2 font-semibold">bKash</h3>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <a href={`intent://#Intent;scheme=bkash;package=com.bKash.customerapp;S.number=${card.bkashNumber};end`} className="flex-1">
                      <Button className="w-full" variant="outline"><Send className="mr-2 h-4 w-4" />{translations.eidCard.display.sendVia} bKash</Button>
                  </a>
                  <Button onClick={() => copyToClipboard(card.bkashNumber!, 'bKash Number')} variant="secondary" className="sm:w-auto"><Copy className="mr-2 h-4 w-4" />{card.bkashNumber}</Button>
                </div>
              </div>
            )}
            {card.nagadNumber && (
              <div>
                <h3 className="mb-2 font-semibold">Nagad</h3>
                 <div className="flex flex-col gap-2 sm:flex-row">
                  <a href={`intent://sendmoney?number=${card.nagadNumber}#Intent;scheme=nagad;package=com.nagad.mobileapp;end`} className="flex-1">
                      <Button className="w-full" variant="outline"><Send className="mr-2 h-4 w-4" />{translations.eidCard.display.sendVia} Nagad</Button>
                  </a>
                  <Button onClick={() => copyToClipboard(card.nagadNumber!, 'Nagad Number')} variant="secondary" className="sm:w-auto"><Copy className="mr-2 h-4 w-4" />{card.nagadNumber}</Button>
                </div>
              </div>
            )}
            {card.rocketNumber && (
              <div>
                <h3 className="mb-2 font-semibold">Rocket</h3>
                 <div className="flex flex-col gap-2 sm:flex-row">
                  <Button onClick={() => copyToClipboard(card.rocketNumber!, 'Rocket Number')} variant="secondary" className="sm:w-auto"><Copy className="mr-2 h-4 w-4" />{card.rocketNumber}</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
