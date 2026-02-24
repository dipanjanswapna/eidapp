'use client';

import type { EidCard } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import { Stamp, Copy, Send, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { confirmEidCardPaymentAction } from '@/lib/actions';
import { useState } from 'react';
import Confetti from 'react-confetti';

export function EidCardDisplay({ card: initialCard }: { card: EidCard }) {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [card, setCard] = useState(initialCard);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${type} ${translations.salamiPage.payment.copied}` });
  };

  const handleConfirmPayment = async () => {
    if (card.isPaid) return;
    setIsConfirming(true);
    const result = await confirmEidCardPaymentAction(card.id);
    if (result.success) {
      setCard(prev => ({ ...prev, isPaid: true }));
      setShowConfetti(true);
      toast({ title: translations.eidCard.display.paymentConfirmed });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error || translations.eidCard.display.paymentError });
    }
    setIsConfirming(false);
  };

  const hasPaymentInfo = card.bkashNumber || card.nagadNumber || card.rocketNumber;

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}
      <div id="eid-card-container" className="bg-white p-2 sm:p-4 rounded-lg">
        <div className="relative border-2 border-dashed border-gray-400 bg-gray-50 p-4 sm:p-6 shadow-lg rounded-lg">
          <div className="absolute inset-0 bg-[url('/receipt-bg.svg')] bg-center opacity-5"></div>
          
          <div className="relative text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{translations.eidCard.display.invoiceTitle}</h1>
          </div>
          
          <div className="relative my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-600">{translations.eidCard.create.recipient.label}</p>
              <p className="text-gray-800 text-lg font-bold">{card.recipientName}</p>
            </div>
            {card.targetAmount && card.targetAmount > 0 && (
              <div className='sm:text-right'>
                <p className="font-semibold text-gray-600">{translations.eidCard.display.targetAmount}</p>
                <p className="font-bold text-primary text-lg">{card.targetAmount.toLocaleString()} BDT</p>
              </div>
            )}
          </div>

          <div className="relative text-center bg-gray-100/50 p-4 rounded-md border">
            <p className="mt-1 text-base sm:text-lg italic text-gray-800">&ldquo;{card.message}&rdquo;</p>
          </div>

          {hasPaymentInfo && (
            <div className="relative mt-6 border-t border-dashed border-gray-400 pt-4">
              <h2 className="text-center text-lg font-bold text-gray-700 mb-4">{translations.salamiPage.payment.title}</h2>
              <div className="space-y-3">
                {card.bkashNumber && (
                  <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
                    <span className="font-semibold">bKash:</span>
                    <div className="flex items-center gap-2">
                        <a href={`intent://#Intent;scheme=bkash;package=com.bKash.customerapp;S.number=${card.bkashNumber};end`}>
                            <Button size="sm" variant="ghost"><Send className="mr-2 h-4 w-4" />{translations.eidCard.display.sendVia} bKash</Button>
                        </a>
                        <span className="font-mono text-gray-800">{card.bkashNumber}</span>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(card.bkashNumber!, 'bKash Number')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                )}
                {card.nagadNumber && (
                   <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
                    <span className="font-semibold">Nagad:</span>
                    <div className="flex items-center gap-2">
                        <a href={`intent://sendmoney?number=${card.nagadNumber}#Intent;scheme=nagad;package=com.nagad.mobileapp;end`}>
                            <Button size="sm" variant="ghost"><Send className="mr-2 h-4 w-4" />{translations.eidCard.display.sendVia} Nagad</Button>
                        </a>
                        <span className="font-mono text-gray-800">{card.nagadNumber}</span>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(card.nagadNumber!, 'Nagad Number')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                )}
                {card.rocketNumber && (
                  <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
                    <span className="font-semibold">Rocket:</span>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-800">{card.rocketNumber}</span>
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(card.rocketNumber!, 'Rocket Number')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="relative mt-6 flex flex-col items-center justify-center gap-6">
            {card.isPaid ? (
              <div className="relative">
                <Stamp className="h-28 w-28 text-green-600" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 text-3xl font-bold text-white">
                  {translations.eidCard.display.paid}
                </span>
              </div>
            ) : (
              <div className="text-center space-y-2">
                 <p className="font-semibold text-gray-600">{translations.eidCard.display.status}: <span className="font-bold text-destructive">{translations.eidCard.display.unpaid}</span></p>
                 <Button onClick={handleConfirmPayment} disabled={isConfirming} size="lg">
                    {isConfirming ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {translations.eidCard.display.confirmPayment}
                 </Button>
              </div>
            )}
          </div>
          
          <div className="relative mt-8 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Generated on: {new Date(card.createdAt).toLocaleDateString()}
            </div>
            <p className="text-sm font-bold text-gray-700">monotorongo.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
