'use client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import type { CalculatorResultData } from "./salami-calculator";
import Link from "next/link";
import { ArrowLeft, Gift, Download, Share2, Award, Loader2 } from "lucide-react";
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
    const [isSharing, setIsSharing] = useState(false);
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

    const { name, relationshipStatus, gender, profession } = result;
    
    let resultData;
    let statusText;

    if (profession && profession !== 'none') {
        const professionKey = profession as keyof typeof translations.calculator.result.profession_results;
        resultData = translations.calculator.result.profession_results[professionKey];
        statusText = translations.calculator.profession.options[professionKey];
    } else {
        const statusKey = relationshipStatus as keyof typeof translations.calculator.result.relationship_results;
        resultData = translations.calculator.result.relationship_results[statusKey];
        statusText = translations.calculator.result.statuses[statusKey];
    }
    
    let specialTitle = null;
    if(gender === 'female' && (relationshipStatus === 'single' || relationshipStatus === 'in_relationship')){
        specialTitle = translations.calculator.result.special_titles.girl_special.title;
    }
    if(gender === 'male' && relationshipStatus === 'married'){
        specialTitle = translations.calculator.result.special_titles.boy_special.title;
    }

    const handleDownload = () => {
        setIsDownloading(true);
        const rashidElement = document.getElementById('salami-rashid');
        if (rashidElement) {
            html2canvas(rashidElement, { allowTaint: true, useCORS: true, scale: 2 }).then(canvas => {
                const link = document.createElement('a');
                link.download = `salami-receipt-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
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

    const handleShare = async () => {
        setIsSharing(true);
        try {
            const rashidElement = document.getElementById('salami-rashid');
            if (!rashidElement) {
                setIsSharing(false);
                return;
            }

            const canvas = await html2canvas(rashidElement, { allowTaint: true, useCORS: true, scale: 2 });
            const shareText = translations.calculator.result.rashid.shareText.replace('{name}', name).replace('{prob}', resultData.prob);
            const shareTitle = translations.calculator.result.rashid.shareTitle.replace('{name}', name);
            const fileName = `salami-receipt-${name.toLowerCase().replace(/\s+/g, '-')}.png`;

            // Try to share as a file first
            if (navigator.share && canvas.toBlob) {
                 const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
                 if(blob) {
                    const file = new File([blob], fileName, { type: 'image/png' });
                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        await navigator.share({
                            files: [file],
                            title: shareTitle,
                            text: shareText,
                        });
                        toast({
                            title: translations.calculator.result.rashid.shareSuccess,
                        });
                        return;
                    }
                 }
            }
            
            // Fallback: Share link if file sharing is not supported or fails
            if (navigator.share) {
                 await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: window.location.href,
                });
            } else {
                // Fallback: Copy link if navigator.share is not supported at all
                navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
                toast({ title: translations.calculator.result.rashid.copySuccess });
            }
        } catch (error) {
            console.error("Sharing failed:", error);
            // Don't show toast on user cancel
            if ((error as Error).name !== 'AbortError') {
                toast({
                    variant: "destructive",
                    title: "Sharing Failed",
                    description: "Could not share the receipt. Please try downloading it.",
                });
            }
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <>
            {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={400} />}
            <div className="w-full space-y-4">
                <div id="salami-rashid" className="bg-[#f7f3e9] border-2 border-dashed border-amber-800/30 p-6 rounded-lg relative overflow-hidden font-mono shadow-lg">
                    <Gift className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 text-amber-500/10" />
                    <div className="relative z-10">
                        <div className="text-center mb-4 border-b-2 border-dashed border-amber-800/30 pb-4">
                            <h2 className="text-3xl font-bold text-amber-900 tracking-wider">{translations.calculator.result.rashid.title}</h2>
                            <p className="text-sm text-amber-800/70">
                                {translations.calculator.result.rashid.serial.replace('{serial}', serialNumber)}
                            </p>
                        </div>
                        <div className="space-y-3 text-base text-amber-900">
                            <div className="flex justify-between"><span className="font-semibold">{translations.form.name.label}:</span><span>{name}</span></div>
                            <div className="flex justify-between"><span className="font-semibold">{statusText}:</span><span>{profession && profession !== 'none' ? translations.calculator.profession.options[profession as keyof typeof translations.calculator.profession.options] : translations.calculator.relationship.options[relationshipStatus as keyof typeof translations.calculator.relationship.options]}</span></div>
                            <div className="flex justify-between items-center"><span className="font-semibold">{translations.calculator.result.probabilityLabel}:</span><span className="text-2xl font-bold text-primary bg-primary/10 px-3 py-1 rounded">{resultData.prob}</span></div>
                            <div className="p-3 bg-amber-500/10 rounded-md text-center">
                                <p className="font-semibold text-amber-900">{translations.calculator.result.message.replace('{message}', resultData.title)}</p>
                            </div>
                            {specialTitle && (
                                <div className="p-3 bg-accent/20 rounded-md text-center flex items-center justify-center gap-2">
                                     <Award className="h-5 w-5 text-accent-foreground" />
                                    <p className="font-semibold text-accent-foreground">{translations.calculator.result.specialTitle.replace('{title}', specialTitle)}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            <div className="border-8 border-green-600 text-green-600 rounded-full w-48 h-48 flex items-center justify-center -rotate-[15deg] opacity-20 font-black">
                                <span className="text-5xl tracking-widest leading-none">{translations.calculator.result.rashid.approved}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t-2 border-dashed border-amber-800/30 text-center text-xs text-amber-800/80 italic">
                             <p>{translations.calculator.result.rashid.disclaimer}</p>
                             <p className="font-bold mt-2">{translations.calculator.result.rashid.condition}</p>
                        </div>
                    </div>
                </div>

                 <CardFooter className="flex-col sm:flex-row gap-2 pt-6 p-0">
                    <Button onClick={handleDownload} disabled={isDownloading} className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        {translations.calculator.result.rashid.downloadButton}
                    </Button>
                     <Button onClick={handleShare} variant="secondary" className="w-full" disabled={isSharing}>
                        {isSharing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Share2 className="mr-2 h-4 w-4" />}
                        {translations.calculator.result.rashid.shareButton}
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
