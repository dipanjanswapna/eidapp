'use client';

import { NGLMessage, NGLUser } from "@/lib/types";
import { useLanguage } from "@/contexts/language-context";
import { MessageSquare, CornerDownRight, Waves } from "lucide-react";

type CardProps = {
    user: NGLUser;
    message: NGLMessage;
}

export default function NGLReplyAndShareCard({ user, message }: CardProps) {
    const { language, translations: t } = useLanguage();
    
    const senderTag = t.ngl.send.senderTag.options[message.senderTag as keyof typeof t.en.ngl.send.senderTag.options];
    
    const footerText = language === 'bn' 
        ? "আপনিও এমন গোপন চিঠি পেতে চান? ভিজিট করুন monotorongo.com"
        : "Want to get secret letters like this? Visit monotorongo.com";

    return (
        <div className="bg-white p-2 sm:p-4 rounded-lg">
            <div className="relative border-2 border-dashed border-gray-400 bg-gray-50 p-4 sm:p-6 shadow-lg rounded-lg">
                <div className="absolute inset-0 bg-[url('/receipt-bg.svg')] bg-center opacity-5"></div>
                
                <div className="relative text-center mb-6">
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-800">{language === 'bn' ? 'ঈদের চিঠি' : 'Secret Eid Message'}</h1>
                    <p className="text-xs sm:text-sm text-gray-500">@{user.username}</p>
                </div>

                <div className="relative space-y-4">
                    <div className="flex gap-3">
                        <MessageSquare className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                             <p className="italic text-gray-700">"{message.message}"</p>
                             <p className="text-right text-sm font-semibold text-gray-500 mt-1">- {senderTag}</p>
                        </div>
                    </div>

                     <div className="flex gap-3">
                        <CornerDownRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                             <p className="italic text-primary font-medium">"{message.reply}"</p>
                             <p className="text-right text-sm font-bold text-primary mt-1">- {user.name}</p>
                        </div>
                    </div>
                </div>

                <div className="relative mt-8 flex items-center justify-end">
                     <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Waves className="h-4 w-4" />
                        <span>monotorongo.com</span>
                    </div>
                </div>

                 <div className="relative mt-4 border-t border-dashed border-gray-400 pt-3 text-center text-xs text-gray-600">
                    <p className='font-semibold'>{footerText}</p>
                </div>
            </div>
        </div>
    );
}
