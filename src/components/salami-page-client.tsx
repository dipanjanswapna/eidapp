'use client';

import { useState } from 'react';
import type { SalamiProfile, Wish } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { addWishAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Loader2, Send, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import html2canvas from 'html2canvas';

type SalamiPageClientProps = {
  profile: SalamiProfile;
  initialWishes: Wish[];
};

export default function SalamiPageClient({ profile, initialWishes }: SalamiPageClientProps) {
  const { translations } = useLanguage();
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleWishSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingWish(true);
    const formData = new FormData(event.currentTarget);
    const wishData = {
      author: formData.get('author') as string,
      message: formData.get('message') as string,
    };
    
    if(!wishData.author || !wishData.message) {
      toast({
        variant: 'destructive',
        title: translations.salamiPage.wishForm.errorTitle,
        description: translations.salamiPage.wishForm.errorDescription,
      });
      setIsSubmittingWish(false);
      return;
    }

    try {
      const newWish = await addWishAction(profile.slug, wishData);
      setWishes((prev) => [newWish, ...prev]);
      (event.target as HTMLFormElement).reset();
      toast({
        title: translations.salamiPage.wishForm.successTitle,
        description: translations.salamiPage.wishForm.successDescription,
      });
    } catch (error) {
       toast({
        variant: 'destructive',
        title: translations.salamiPage.wishForm.errorTitle,
        description: (error as Error).message,
      });
    } finally {
        setIsSubmittingWish(false);
    }
  };
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${type} ${translations.salamiPage.payment.copied}` });
  };
  
  const handleDownload = () => {
    setIsDownloading(true);
    const cardElement = document.getElementById('salami-card-container');
    if (cardElement) {
        html2canvas(cardElement, { allowTaint: true, useCORS: true, scale: 2 }).then(canvas => {
            const link = document.createElement('a');
            link.download = `salami-card-${profile.slug}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            setIsDownloading(false);
        }).catch(err => {
            console.error('oops, something went wrong!', err);
            setIsDownloading(false);
        });
    }
  };

  const handleShare = () => {
    if(navigator.share) {
        navigator.share({
            title: `Send Salami to ${profile.userName}`,
            text: `Help me celebrate Eid! Send your Salami to ${profile.userName}.`,
            url: window.location.href,
        })
    } else {
        navigator.clipboard.writeText(window.location.href);
        toast({ title: "Link Copied!", description: "Share it with your friends and family." });
    }
  }


  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>{translations.salamiPage.share.title}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col sm:flex-row gap-4'>
                 <Button onClick={handleDownload} disabled={isDownloading} className='w-full'>
                    {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />}
                    {translations.salamiPage.share.downloadButton}
                 </Button>
                 <Button onClick={handleShare} variant="secondary" className='w-full'>
                    <Share2 className="mr-2 h-4 w-4" />
                    {translations.salamiPage.share.shareButton}
                </Button>
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>{translations.salamiPage.payment.title}</CardTitle>
          <CardDescription>{translations.salamiPage.payment.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.bkashNumber && (
            <div>
              <h3 className="mb-2 font-semibold">bKash</h3>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a href={`intent://#Intent;scheme=bkash;package=com.bKash.customerapp;S.number=${profile.bkashNumber};end`} className="flex-1">
                    <Button className="w-full" variant="outline"><Send className="mr-2 h-4 w-4" />{translations.salamiPage.payment.sendVia} bKash</Button>
                </a>
                <Button onClick={() => copyToClipboard(profile.bkashNumber!, 'bKash Number')} variant="secondary" className="sm:w-auto"><Copy className="mr-2 h-4 w-4" />{profile.bkashNumber}</Button>
              </div>
            </div>
          )}
          {profile.nagadNumber && (
            <div>
              <h3 className="mb-2 font-semibold">Nagad</h3>
               <div className="flex flex-col gap-2 sm:flex-row">
                <a href={`intent://sendmoney?number=${profile.nagadNumber}#Intent;scheme=nagad;package=com.nagad.mobileapp;end`} className="flex-1">
                    <Button className="w-full" variant="outline"><Send className="mr-2 h-4 w-4" />{translations.salamiPage.payment.sendVia} Nagad</Button>
                </a>
                <Button onClick={() => copyToClipboard(profile.nagadNumber!, 'Nagad Number')} variant="secondary" className="sm:w-auto"><Copy className="mr-2 h-4 w-4" />{profile.nagadNumber}</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{translations.salamiPage.wishForm.title}</CardTitle>
            <CardDescription>{translations.salamiPage.wishForm.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWishSubmit} className="space-y-4">
              <Input name="author" placeholder={translations.salamiPage.wishForm.namePlaceholder} required />
              <Textarea name="message" placeholder={translations.salamiPage.wishForm.messagePlaceholder} required />
              <Button type="submit" disabled={isSubmittingWish} className="w-full">
                {isSubmittingWish && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {translations.salamiPage.wishForm.submitButton}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{translations.salamiPage.wishes.title}</CardTitle>
            </CardHeader>
            <CardContent>
                {wishes.length > 0 ? (
                    <ul className="space-y-4 pr-2">
                        {wishes.map(wish => (
                            <li key={wish.id} className="rounded-lg border bg-secondary/50 p-4">
                                <p className='text-foreground'>" {wish.message} "</p>
                                <div className='mt-2 flex justify-between items-center text-sm text-muted-foreground'>
                                    <span className='font-semibold'>- {wish.author}</span>
                                    <span>{formatDistanceToNow(new Date(wish.createdAt), { addSuffix: true })}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground">{translations.salamiPage.wishes.noWishes}</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
