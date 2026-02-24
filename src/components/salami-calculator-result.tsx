'use client';

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Download, Loader2, Share2, Stamp } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Confetti from 'react-confetti';
import { cn } from '@/lib/utils';

type SalamiCalculatorResultProps = {
  name: string;
  gender: string;
  relationshipStatus: string;
  profession: string;
  monthlyIncome: string;
};

type RelationshipStatusKey = keyof (typeof translations.en.calculator.form.relationship.options);
type ProfessionKey = keyof (typeof translations.en.calculator.form.profession.options);
type IncomeMessagesKey = keyof (typeof translations.en.calculator.results.incomeMessages);
type RelationshipFooterKey = keyof (typeof translations.en.calculator.results.relationshipFooter);
type ProfessionMessagesKey = keyof (typeof translations.en.calculator.results.professionMessages);

export default function SalamiCalculatorResult({
  name,
  gender,
  relationshipStatus,
  profession,
  monthlyIncome,
}: SalamiCalculatorResultProps) {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const income = parseInt(monthlyIncome, 10) || 0;

  const { salamiLogic, verdict, specialTitle, footerMessage, conditions } = useMemo(() => {
    let salamiLogic = '...';
    let verdict = '...';
    let specialTitle: string | null = null;
    let footerMessage = '';
    let conditions = '';

    const isJobHolder = profession === 'job_holder' || profession === 'govt_job_holder';

    // Income-based logic
    if (isJobHolder) {
        let incomeKey: IncomeMessagesKey = '0-1000';
        if (income <= 1000) incomeKey = '0-1000';
        else if (income <= 5000) incomeKey = '1001-5000';
        else if (income <= 10000) incomeKey = '5001-10000';
        else if (income <= 15000) incomeKey = '10001-15000';
        else if (income <= 20000) incomeKey = '15001-20000';
        else if (income <= 30000) incomeKey = '20001-30000';
        else if (income <= 50000) incomeKey = '30001-50000';
        else if (income <= 100000) incomeKey = '50001-100000';
        else incomeKey = '100001+';

        verdict = translations.calculator.results.incomeMessages[incomeKey];

         const professionMessages = translations.calculator.results.professionMessages;
        if (profession in professionMessages) {
             verdict = professionMessages[profession as ProfessionMessagesKey]
        }

        if(income <= 15000) salamiLogic = '50/50 Chance'
        else salamiLogic = 'You Should Give Salami!';
        
    } else {
        // Relationship-based logic for non-jobholders
        switch (relationshipStatus) {
            case 'single':
                salamiLogic = '99% Chance to get';
                verdict = 'Single is king! Pocket full, tension nil.';
                break;
            case 'in_a_relationship':
                salamiLogic = '50/50 Chance';
                verdict = 'Salami will come via bKash, and go out as a gift!';
                break;
            case 'engaged':
                salamiLogic = '0% Chance to get';
                verdict = 'You have a 100% chance of going bankrupt giving salami to your in-laws.';
                break;
            case 'married':
                salamiLogic = '-100% (Give Salami)';
                verdict = 'Your salami is now your spouse/child\'s property.';
                break;
            case 'has_crush':
                salamiLogic = 'Like a lottery';
                verdict = 'A simple "Hi" is your salami.';
                break;
            case 'divorced':
                salamiLogic = '150% Chance to get';
                 verdict = 'You need to rebuild your life and pocket—so demand double salami!';
                break;
             case 'secret_relation':
                salamiLogic = 'Funds needed!';
                verdict = 'Secret relationships are expensive! Get backup salami from elder brothers before you get caught.';
                break;
        }
    }
    
    // Gender-based special titles
    if (gender === 'female' && (relationshipStatus === 'in_a_relationship' || relationshipStatus === 'engaged' || relationshipStatus === 'married')) {
        specialTitle = 'Salami Queen';
    }
     if (gender === 'male' && income > 20000) {
        specialTitle = 'Official Big Brother';
    }


    // Footer message logic
    const relationshipFooterKey = `${relationshipStatus}_${gender}` as RelationshipFooterKey;
    if (relationshipFooterKey in translations.calculator.results.relationshipFooter) {
      footerMessage = translations.calculator.results.relationshipFooter[relationshipFooterKey];
    }

    if (isJobHolder) {
        conditions = income > 30000 ? translations.calculator.results.conditions.high_income : translations.calculator.results.conditions.low_income;
    } else {
        conditions = translations.calculator.results.conditions.low_income;
    }


    return { salamiLogic, verdict, specialTitle, footerMessage, conditions };
  }, [translations, relationshipStatus, profession, income, gender]);

  const handleShare = async () => {
    setIsSharing(true);
    const receiptElement = document.getElementById('salami-receipt');
    if (receiptElement && navigator.share) {
      try {
        const canvas = await html2canvas(receiptElement, { scale: 2 });
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        
        if (blob) {
            const filesArray = [
                new File([blob], `${name}-salami-receipt.png`, {
                type: 'image/png',
                lastModified: new Date().getTime(),
                }),
            ];
            await navigator.share({
                title: translations.calculator.results.title,
                text: `Check out my Eid Salami potential!`,
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
          description: translations.calculator.results.shareError,
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
        const receiptElement = document.getElementById('salami-receipt');
        if (receiptElement) {
        html2canvas(receiptElement, { scale: 3 }).then((canvas) => {
            const link = document.createElement('a');
            link.download = `salami-receipt-${name}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
        }
    };


  return (
    <>
    {isClient && <Confetti recycle={false} numberOfPieces={400} />}
    <div className="container relative z-10 mx-auto max-w-2xl px-4 py-12">
        <div id="salami-receipt" className="bg-white p-2">
            <div className="relative border-2 border-dashed border-gray-400 bg-gray-50 p-6 shadow-lg">
                <div className="absolute inset-0 bg-[url('/receipt-bg.svg')] bg-center opacity-5"></div>
                <div className="relative text-center">
                <h1 className="text-2xl font-bold text-gray-800">{translations.calculator.results.title}</h1>
                <p className="text-sm text-gray-500">{translations.calculator.results.serial}: {Date.now()}</p>
                </div>
                
                <div className="relative my-6 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="font-semibold text-gray-600">{translations.calculator.results.name}</p>
                        <p className="text-gray-800">{name}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-600">{translations.calculator.results.status}</p>
                        <p className="text-gray-800">{translations.calculator.form.relationship.options[relationshipStatus as RelationshipStatusKey]}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-600">{translations.calculator.results.profession}</p>
                        <p className="text-gray-800">{translations.calculator.form.profession.options[profession as ProfessionKey]}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-600">{translations.calculator.results.salamiPotential}</p>
                        <p className="font-bold text-primary">{salamiLogic}</p>
                    </div>
                </div>

                <div className="relative text-center">
                    <p className="font-semibold text-gray-600">{translations.calculator.results.verdict}</p>
                    <p className="mt-1 text-lg italic text-gray-800">&ldquo;{verdict}&rdquo;</p>
                </div>

                <div className="relative mt-6 flex flex-col items-center justify-center gap-6">
                    {specialTitle && (
                        <div className="flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1 text-accent-foreground">
                            <Award className="h-5 w-5" />
                            <p className="font-semibold">{specialTitle}</p>
                        </div>
                    )}
                    
                    <div className="relative">
                        <Stamp className="h-28 w-28 text-red-500/80" />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 text-2xl font-bold text-white">
                            {translations.calculator.results.approved}
                        </span>
                    </div>
                </div>

                 <div className="relative mt-6 border-t border-dashed border-gray-400 pt-4 text-center text-xs text-gray-600">
                    <p className='font-bold'>{footerMessage}</p>
                    <p className="mt-2 text-gray-500">{conditions}</p>
                </div>
            </div>
        </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button onClick={handleDownload} className="w-full" size="lg">
          <Download className="mr-2 h-5 w-5" />
          {translations.calculator.results.downloadButton}
        </Button>
        <Button onClick={handleShare} disabled={isSharing} className="w-full" size="lg" variant="outline">
          {isSharing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Share2 className="mr-2 h-5 w-5" />}
          {isSharing ? translations.calculator.results.sharing : translations.calculator.results.shareButton}
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-gray-500">
        {translations.calculator.results.footerDisclaimer}
      </p>
    </div>
    </>
  );
}
