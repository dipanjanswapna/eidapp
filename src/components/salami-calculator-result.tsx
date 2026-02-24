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
type SalamiLogicKey = keyof (typeof translations.en.calculator.results.salamiLogic);
type RelationshipFooterKey = keyof (typeof translations.en.calculator.results.relationshipFooter);
type ProfessionFooterKey = keyof (typeof translations.en.calculator.results.professionFooter);


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

    const isJobHolder = profession !== 'student' && profession !== 'unemployed';

    // Income-based logic for job holders
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
        salamiLogic = translations.calculator.results.salamiLogic[incomeKey as SalamiLogicKey];

    } else { // Logic for students and unemployed
        switch (relationshipStatus) {
            case 'single':
                salamiLogic = '99% Chance to get';
                verdict = translations.calculator.results.relationshipVerdict.single;
                break;
            case 'in_a_relationship':
                salamiLogic = '50/50 Chance';
                verdict = translations.calculator.results.relationshipVerdict.in_a_relationship;
                break;
            case 'engaged':
                salamiLogic = '0% Chance to get';
                verdict = translations.calculator.results.relationshipVerdict.engaged;
                break;
            case 'married':
                salamiLogic = '-100% (Give Salami)';
                verdict = translations.calculator.results.relationshipVerdict.married;
                break;
            case 'has_crush':
                salamiLogic = 'Like a lottery';
                verdict = translations.calculator.results.relationshipVerdict.has_crush;
                break;
            case 'divorced':
                salamiLogic = '150% Chance to get';
                 verdict = translations.calculator.results.relationshipVerdict.divorced;
                break;
             case 'secret_relation':
                salamiLogic = 'Funds needed!';
                verdict = translations.calculator.results.relationshipVerdict.secret_relation;
                break;
        }
    }
    
    // Gender-based special titles
    if (gender === 'female' && (relationshipStatus === 'in_a_relationship' || relationshipStatus === 'engaged' || relationshipStatus === 'married')) {
        specialTitle = translations.calculator.results.specialTitles.salamiQueen;
    }
     if (gender === 'male' && income > 20000) {
        specialTitle = translations.calculator.results.specialTitles.bigBrother;
    }


    // Footer message logic (Profession > Relationship)
    const professionFooterKey = `${profession}_${gender}` as ProfessionFooterKey;
    const professionFooters = translations.calculator.results.professionFooter;
    if (professionFooterKey in professionFooters) {
      footerMessage = professionFooters[professionFooterKey];
    } else {
        const relationshipFooterKey = `${relationshipStatus}_${gender}` as RelationshipFooterKey;
        const relationshipFooters = translations.calculator.results.relationshipFooter;
        if (relationshipFooterKey in relationshipFooters) {
          footerMessage = relationshipFooters[relationshipFooterKey];
        }
    }


    // Conditions logic based on income
    if (income <= 10000) {
        conditions = translations.calculator.results.conditions.low_income;
    } else if (income <= 30000) {
        conditions = translations.calculator.results.conditions.medium_income;
    } else {
        conditions = translations.calculator.results.conditions.high_income;
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
        <div id="salami-receipt" className="bg-white p-2 sm:p-4">
            <div className="relative border-2 border-dashed border-gray-400 bg-gray-50 p-4 sm:p-6 shadow-lg">
                <div className="absolute inset-0 bg-[url('/receipt-bg.svg')] bg-center opacity-5"></div>
                <div className="relative text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{translations.calculator.results.title}</h1>
                <p className="text-xs sm:text-sm text-gray-500">{translations.calculator.results.serial}: {Date.now()}</p>
                </div>
                
                <div className="relative my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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
                    <p className="mt-1 text-base sm:text-lg italic text-gray-800">&ldquo;{verdict}&rdquo;</p>
                </div>

                <div className="relative mt-6 flex flex-col items-center justify-center gap-6">
                    {specialTitle && (
                        <div className="flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs sm:px-4 sm:text-sm text-accent-foreground">
                            <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                            <p className="font-semibold">{specialTitle}</p>
                        </div>
                    )}
                    
                    <div className="relative">
                        <Stamp className="h-24 w-24 sm:h-28 sm:w-28 text-destructive" />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 text-xl sm:text-2xl font-bold text-destructive">
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
