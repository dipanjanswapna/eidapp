'use client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import type { CalculatorResultData } from "./salami-calculator";
import Link from "next/link";
import { ArrowLeft, Gift } from "lucide-react";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";


type SalamiCalculatorResultProps = {
    result: CalculatorResultData;
    onReset: () => void;
}

export default function SalamiCalculatorResult({ result, onReset }: SalamiCalculatorResultProps) {
    const { translations } = useLanguage();
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({width: 0, height: 0});

    useEffect(() => {
        // This effect runs only on the client
        setShowConfetti(true);
        setWindowSize({width: window.innerWidth, height: window.innerHeight});

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


    return (
        <>
            {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={400} />}
            <Card className="w-full text-center animate-in fade-in-50 zoom-in-95">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Gift className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl">
                        {translations.calculator.result.title.replace('{name}', name)}
                    </CardTitle>
                    <CardDescription>
                        {translations.calculator.result.subtitle.replace('{status}', statusText)}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                    <div className="rounded-lg border bg-secondary/50 p-4">
                        <p className="text-lg font-bold">{translations.calculator.result.probability.replace('{prob}', resultData.prob)}</p>
                        <p className="text-sm text-muted-foreground">{resultData.message}</p>
                    </div>
                    <div className="rounded-lg border bg-secondary/50 p-4">
                        <p className="text-lg font-bold">{translations.calculator.result.message.replace('{message}', resultData.title)}</p>
                    </div>
                    {specialTitle && (
                         <div className="rounded-lg border bg-accent/20 p-4">
                            <p className="text-lg font-bold text-accent-foreground">{translations.calculator.result.specialTitle.replace('{title}', specialTitle)}</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex-col gap-4 pt-6">
                    <Button asChild size="lg" className="w-full">
                        <Link href="/create">{translations.calculator.result.createButton}</Link>
                    </Button>
                    <Button variant="ghost" onClick={onReset} className="w-full">
                       <ArrowLeft className="mr-2 h-4 w-4" /> Go Back & Calculate Again
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
