'use client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import type { CalculatorResultData } from "./salami-calculator";
import Link from "next/link";
import { ArrowLeft, Gift, Download, Share2 } from "lucide-react";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

type SalamiCalculatorResultProps = {
    result: CalculatorResultData;
    onReset: () => void;
}

export default function SalamiCalculatorResult({ result, onReset }: SalamiCalculatorResultProps) {
    const { translations } = useLanguage();
    const { toast } = useToast();
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({width: 0, height: 0});
    const [isDownloading, setIsDownloading] = useState(false);
    const [serialNumber, setSerialNumber] = useState('');

    useEffect(() => {
        // This effect runs only on the client
        setShowConfetti(true);
        setWindowSize({width: window.innerWidth, height: window.innerHeight});
        setSerialNumber(`EID-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);

        const handleResize = () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight});
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const { name, relationshipStatus, gender } = result;
    const statusKey = relationshipStatus as keyof typeof translations.calculator.result.results;
    
    const resultData = translations.calculator.result.results[statusKey];
    const statusText = translations.calculator.result.statuses[statusKey];

    let specialTitle = null;
    if(gender === 'female' && (statusKey === 'single' || statusKey === 'in_relationship')){
        specialTitle = translations.calculator.result.results.girl_special.title;
    }
    if(gender === 'male' && statusKey === 'married'){
        specialTitle = translations.calculator.result.results.boy_special.title;
    }

    const handleDownload = () => {
        setIsDownloading(true);
        const rashidElement = document.getElementById('salami-rashid');
        if (rashidElement) {
            html2canvas(rashidElement, { allowTaint: true, useCORS: true, scale: 2 }).then(canvas => {
                const link = document.createElement('a');
                link.download = `salami-rashid-${name.toLowerCase().replace(' ', '-')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                setIsDownloading(false);
                toast({
                    title: translations.calculator.result.rashid.downloadSuccessTitle,
                    description: translations.calculator.result.rashid.downloadSuccessDescription,
                });
            }).catch(err => {
                console.error('oops, something went wrong!', err);
                setIsDownloading(false);
                toast({
                    variant: 'destructive',
                    title: 'Download Failed',
                    description: 'Could not download the receipt.',
                });
            });
        }
    };

    const handleShare = () => {
        const shareText = `${translations.calculator.result.rashid.shareText.replace('{name}', name).replace('{prob}', resultData.prob)}`;
        if(navigator.share) {
            navigator.share({
                title: translations.calculator.result.rashid.shareTitle.replace('{name}', name),
                text: shareText,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
            toast({ title: "Link Copied!", description: "Share it with your friends and family." });
        }
    }

    return (
        <>
            {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={400} />}
            <div className="w-full space-y-4">
                <div id="salami-rashid" className="bg-slate-50 border-2 border-dashed border-slate-300 p-6 rounded-lg relative overflow-hidden">
                    <div className="text-center mb-4 border-b-2 border-dashed pb-4">
                        <h2 className="text-2xl font-bold text-primary">{translations.calculator.result.rashid.title}</h2>
                        <p className="text-sm text-muted-foreground">
                            {translations.calculator.result.rashid.serial.replace('{serial}', serialNumber)}
                        </p>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="font-semibold">{translations.form.name.label}:</span><span>{name}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">{translations.calculator.relationship.label}:</span><span>{statusText}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">{translations.calculator.result.probabilityLabel}:</span><span className="font-bold text-primary">{resultData.prob}</span></div>
                         <div className="p-3 bg-primary/10 rounded-md text-center">
                            <p className="font-semibold text-primary">{translations.calculator.result.message.replace('{message}', resultData.title)}</p>
                        </div>
                        {specialTitle && (
                            <div className="p-3 bg-accent/20 rounded-md text-center">
                                <p className="font-semibold text-accent-foreground">{translations.calculator.result.specialTitle.replace('{title}', specialTitle)}</p>
                            </div>
                        )}
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        <div className="border-4 border-green-500 text-green-500 rounded-full w-40 h-40 flex items-center justify-center -rotate-12 opacity-20">
                            <span className="text-3xl font-black tracking-widest">{translations.calculator.result.rashid.approved}</span>
                        </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-6 italic">{translations.calculator.result.rashid.disclaimer}</p>
                </div>
                 <CardFooter className="flex-col sm:flex-row gap-2 pt-6 p-0">
                    <Button onClick={handleDownload} disabled={isDownloading} className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        {translations.calculator.result.rashid.downloadButton}
                    </Button>
                     <Button onClick={handleShare} variant="secondary" className="w-full">
                        <Share2 className="mr-2 h-4 w-4" />
                        {translations.salamiPage.share.shareButton}
                    </Button>
                </CardFooter>
                 <CardFooter className="flex-col gap-4 pt-2 p-0">
                    <Button asChild size="lg" className="w-full">
                        <Link href="/create">{translations.calculator.result.createButton}</Link>
                    </Button>
                    <Button variant="ghost" onClick={onReset} className="w-full">
                       <ArrowLeft className="mr-2 h-4 w-4" /> {translations.calculator.result.goBackButton}
                    </Button>
                </CardFooter>
            </div>
        </>
    );
}
