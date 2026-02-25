'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import ConfettiBackground from '@/components/confetti-background';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight, Calculator, Mail, Star, CreditCard, MapPin } from 'lucide-react';
import JusticeTimer from '@/components/justice-timer';

export default function Home() {
  const { translations, language } = useLanguage();
  
  const homeFeatures = {
    en: [
        {
          title: "Iftar Spots",
          description: "Find free Iftar and Sehri spots near you, shared by the community.",
          link: "/iftar",
          icon: <MapPin className="mb-4 h-10 w-10 text-primary" />,
          cta: "Find Spots",
        },
        {
          title: "Salami Calculator",
          description: "A fun tool to calculate your potential Salami earnings based on your profile. Just for laughs!",
          link: "/calculator",
          icon: <Calculator className="mb-4 h-10 w-10 text-primary" />,
          cta: "Calculate Now",
        },
        {
          title: "Eid Lucky Wheel",
          description: "Spin the wheel to find out your unique Eid plan! A fun activity to share with friends.",
          link: "/eid-wheel",
          icon: <Star className="mb-4 h-10 w-10 text-primary" />,
          cta: "Spin the Wheel",
        },
        {
          title: "Eid Card",
          description: "Design and send beautiful, personalized digital Eid cards to your friends and family.",
          link: "/eid-card/create",
          icon: <CreditCard className="mb-4 h-10 w-10 text-primary" />,
          cta: "Create Card",
        },
        {
          title: "Eid Letter",
          description: "Receive secret anonymous messages from your friends and share your replies with a cool card.",
          link: "/ngl/create",
          icon: <Mail className="mb-4 h-10 w-10 text-primary" />,
          cta: "Create Inbox",
        },
    ],
    bn: [
        {
          title: "ইফতার স্পট",
          description: "আপনার কাছাকাছি বিনামূল্যে ইফতার এবং সেহরির স্পট খুঁজুন, যা কমিউনিটি দ্বারা শেয়ার করা হয়েছে।",
          link: "/iftar",
          icon: <MapPin className="mb-4 h-10 w-10 text-primary" />,
          cta: "স্পট খুঁজুন",
        },
        {
          title: "সালামি ক্যালকুলেটর",
          description: "আপনার প্রোফাইলের উপর ভিত্তি করে আপনার সম্ভাব্য সালামি আয়ের পরিমাণ গণনা করার একটি মজার টুল। শুধু হাসির জন্য!",
          link: "/calculator",
          icon: <Calculator className="mb-4 h-10 w-10 text-primary" />,
          cta: "হিসাব করুন",
        },
        {
          title: "লাকি হুইল",
          description: "চাকা ঘুরিয়ে আপনার ঈদের প্ল্যান জানুন! বন্ধুদের সাথে আপনার ফলাফল শেয়ার করুন।",
          link: "/eid-wheel",
          icon: <Star className="mb-4 h-10 w-10 text-primary" />,
          cta: "চাকা ঘোরান",
        },
        {
          title: "ঈদ কার্ড",
          description: "আপনার বন্ধু এবং পরিবারের জন্য সুন্দর, ব্যক্তিগত ডিজিটাল ঈদ কার্ড ডিজাইন এবং পাঠান।",
          link: "/eid-card/create",
          icon: <CreditCard className="mb-4 h-10 w-10 text-primary" />,
          cta: "কার্ড তৈরি করুন",
        },
        {
          title: "ঈদের চিঠি",
          description: "আপনার বন্ধুদের কাছ থেকে বেনামে গোপন বার্তা গ্রহণ করুন এবং একটি আকর্ষণীয় কার্ডের মাধ্যমে উত্তর শেয়ার করুন।",
          link: "/ngl/create",
          icon: <Mail className="mb-4 h-10 w-10 text-primary" />,
          cta: "ইনবক্স তৈরি করুন",
        },
    ]
  };

  const featureCards = homeFeatures[language];


  return (
    <div className="relative overflow-hidden">
      <ConfettiBackground />
      <div className="container relative z-10 mx-auto px-4 py-16 text-center md:py-24">
        <h1
          className={`font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl ${
            language === 'bn' ? 'font-headline' : 'font-headline'
          }`}
        >
          {translations.home.title}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl">
          {translations.home.subtitle}
        </p>
        
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <Card key={index} className="flex flex-col text-left transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={feature.link}>
                            {feature.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>

      </div>
      <JusticeTimer />
    </div>
  );
}
