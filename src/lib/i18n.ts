export const translations = {
  en: {
    nav: {
      home: 'Home',
      create: 'Create Card',
      calculator: 'Calculator',
    },
    home: {
      title: 'Digital Salami, Festive Fun!',
      subtitle:
        'This Eid, collect your Salami in style. Create a personalized Salami card or use our fun calculator to see your Salami probability. Share with friends and family, and make this Eid unforgettable.',
      ctaButton: 'Create Your Salami Card',
    },
    form: {
      title: 'Create Your Salami Card',
      description: 'Fill in your details to generate your unique Salami link.',
      name: {
        label: 'Your Name',
        placeholder: 'e.g., Anik Ahmed',
      },
      message: {
        label: 'Funny Salami Message',
        placeholder: 'e.g., "Grown up doesn\'t mean I don\'t deserve Salami!"',
      },
      ai: {
        buttonText: 'Generate with AI',
        errorTitle: 'AI Generation Failed',
        nameRequired: 'Please enter your name first to generate a message.',
      },
      theme: {
        label: 'Card Theme',
        placeholder: 'Select a theme',
        options: {
          funny: 'Funny',
          cute: 'Cute',
          traditional: 'Traditional',
        },
      },
      bkash: {
        label: 'bKash Number (Optional)',
        placeholder: 'e.g., 01700000000',
      },
      nagad: {
        label: 'Nagad Number (Optional)',
        placeholder: 'e.g., 01800000000',
      },
      submitButton: 'Generate My Link',
      errors: {
        name: {
          min: 'Name must be at least 2 characters.',
        },
        message: {
          min: 'Message must be at least 5 characters.',
        },
        payment: {
          required:
            'At least one payment number (bKash or Nagad) is required.',
        },
      },
    },
    salamiPage: {
      share: {
        title: 'Share Your Card',
        downloadButton: 'Download Card',
        shareButton: 'Share Link',
      },
      payment: {
        title: 'Send Salami',
        description: 'Choose your preferred method to send Salami.',
        sendVia: 'Send via',
        copied: 'Number Copied!',
      },
      wishForm: {
        title: 'Send a Salami Wish',
        description: 'Leave a sweet message with your Salami!',
        namePlaceholder: 'Your Name',
        messagePlaceholder: 'Your wish...',
        submitButton: 'Send Wish',
        successTitle: 'Wish Sent!',
        successDescription: 'Thank you for making their Eid special.',
        errorTitle: 'Oops!',
        errorDescription: 'Please fill out both name and message.',
      },
      wishes: {
        title: 'Salami Wishes',
        noWishes: 'No wishes yet. Be the first one!',
      },
    },
    calculator: {
      title: 'Salami Calculator: Advanced Edition',
      description:
        'Find out your Salami probability this Eid based on your relationship status, profession and more!',
      name: {
        label: 'Your Name',
        placeholder: 'e.g., Anik Ahmed',
      },
      relationship: {
        label: 'Relationship Status',
        placeholder: 'Select your status',
        options: {
          single: 'Single',
          in_relationship: 'In a Relationship',
          engaged: 'Engaged',
          married: 'Married',
          crush: 'Have a Crush',
        },
      },
      gender: {
        label: 'Gender',
        options: {
          male: 'Boy',
          female: 'Girl',
        },
      },
      profession: {
        label: 'Profession',
        placeholder: 'Select your profession',
        options: {
            student: 'Student',
            unemployed: 'Unemployed',
            job_holder: 'Job Holder',
            businessman: 'Businessman',
        },
      },
      monthlyIncome: {
          label: 'Monthly Income (For Job Holders)',
          placeholder: 'Select your income range',
          options: {
              low: 'Tk 20,000 - 50,000',
              medium: 'Tk 50,001 - 1,00,000',
              high: 'Tk 1,00,000+',
          },
      },
      calculateButton: 'Calculate Salami Probability',
      calculating: 'Calculating...',
      result: {
        title: 'Congratulations, {name}!',
        subtitle:
          "Based on your profile, here is your Salami forecast:",
        probabilityLabel: 'Salami Probability',
        message: 'Viral Message: "{message}"',
        specialTitle: 'Special Title: {title}',
        createButton: 'Create Your Salami Demand Link',
        goBackButton: 'Go Back & Calculate Again',
        rashid: {
            title: 'Official Salami Receipt',
            serial: 'Serial No: {serial}',
            approved: 'APPROVED',
            disclaimer: 'This receipt must be shown to elders or brothers-in-law to claim your Salami.',
            condition: "Condition: Failure to provide Salami will result in the cancellation of the Eid feast invitation.",
            downloadButton: 'Download Receipt',
            downloadSuccessTitle: 'Receipt Downloaded!',
            downloadSuccessDescription: 'Show this to your elders to claim your Salami!',
            shareTitle: 'My Eid Salami Forecast!',
            shareText: 'Hey! I just calculated my Salami probability. My chance is {prob}! Calculate yours too!',
            shareButton: 'Share Receipt',
            shareSuccess: 'Shared successfully!',
            copySuccess: 'Link copied to clipboard!',
        },
        statuses: {
          single: 'Single',
          in_relationship: 'In a Relationship',
          engaged: 'Engaged',
          married: 'Married',
          crush: 'Have a Crush',
        },
        relationship_results: {
          single: {
            prob: '99%',
            message: "Elders still see you as a 'kid'.",
            title: 'Single is King! Pocket full, tension nil.',
          },
          in_relationship: {
            prob: '50/50',
            message: "It'll come in one pocket and go out the other as a gift.",
            title: 'Salami comes via bKash, leaves as a gift!',
          },
          engaged: {
            prob: '0%',
            message:
              'You have a 100% chance of going bankrupt giving Salami to your in-laws.',
            title: "Start training to give Salami, you're a grown-up now!",
          },
          married: {
            prob: '-100%',
            message: "Your Salami is now your spouse/child's property.",
            title: 'The days of getting Salami are over, prepare to give.',
          },
          crush: {
            prob: 'Like a lottery',
            message: "Getting a 'Hi' is a Salami in itself.",
            title: "Don't want Salami, just want a reply in the inbox!",
          },
        },
        profession_results: {
            student: {
                prob: '99%',
                message: "Income is nil, so salami is your last hope! Show respect to elders to get salami.",
                title: "Salami is my birthright!"
            },
            unemployed: {
                prob: '100%',
                message: "Seeing your situation, you deserve double salami with firni! Share the link with crying emojis.",
                title: "Sympathy Salami Candidate"
            },
            job_holder: {
                prob: '-200%',
                message: "You are a 'Boro Bhai' now. Forget about getting salami, remember your bKash PIN and empty your pocket for the youngers!",
                title: "Official Salami Provider"
            },
            businessman: {
                prob: 'Depends on Profit',
                message: "Where is the Eid profit? If you don't give salami, the 'Miser Businessman' badge will be hung on your profile!",
                title: "Salami depends on business"
            }
        },
        special_titles: {
          girl_special: {
            title: 'Salami Queen',
          },
          boy_special: {
            title: 'Salami-less Handsome',
          },
        },
      },
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      create: 'কার্ড তৈরি করুন',
      calculator: 'ক্যালকুলেটর',
    },
    home: {
      title: 'ডিজিটাল সালামি, উৎসবের আমেজ!',
      subtitle:
        'এই ঈদে, স্টাইলের সাথে আপনার সালামি সংগ্রহ করুন। আপনার ব্যক্তিগত সালামি কার্ড তৈরি করুন অথবা আমাদের মজার ক্যালকুলেটর ব্যবহার করে আপনার সালামি পাওয়ার সম্ভাবনা দেখুন। বন্ধু এবং পরিবারের সাথে শেয়ার করুন এবং এই ঈদকে अविস্মরণীয় করে তুলুন।',
      ctaButton: 'আপনার সালামি কার্ড তৈরি করুন',
    },
    form: {
      title: 'আপনার সালামি কার্ড তৈরি করুন',
      description: 'আপনার অনন্য সালামি লিঙ্ক তৈরি করতে আপনার বিবরণ পূরণ করুন।',
      name: {
        label: 'আপনার নাম',
        placeholder: 'যেমন, অনিক আহমেদ',
      },
      message: {
        label: 'মজার সালামি বার্তা',
        placeholder: 'যেমন, "বড় হয়েছি মানে এই নয় যে সালামি পাবো না!"',
      },
      ai: {
        buttonText: 'AI দিয়ে তৈরি করুন',
        errorTitle: 'AI জেনারেশন ব্যর্থ হয়েছে',
        nameRequired: 'বার্তা তৈরি করতে প্রথমে আপনার নাম লিখুন।',
      },
      theme: {
        label: 'কার্ড থিম',
        placeholder: 'একটি থিম নির্বাচন করুন',
        options: {
          funny: 'মজার',
          cute: 'মিষ্টি',
          traditional: 'ঐতিহ্যবাহী',
        },
      },
      bkash: {
        label: 'বিকাশ নম্বর (ঐচ্ছিক)',
        placeholder: 'যেমন, ০১৭০০০০০০০০',
      },
      nagad: {
        label: 'নগদ নম্বর (ঐচ্ছিক)',
        placeholder: 'যেমন, ০১৮০০০০০০০০',
      },
      submitButton: 'আমার লিঙ্ক তৈরি করুন',
      errors: {
        name: {
          min: 'নাম কমপক্ষে ২ অক্ষরের হতে হবে।',
        },
        message: {
          min: 'বার্তা কমপক্ষে ৫ অক্ষরের হতে হবে।',
        },
        payment: {
          required: 'কমপক্ষে একটি পেমেন্ট নম্বর (বিকাশ বা নগদ) প্রয়োজন।',
        },
      },
    },
    salamiPage: {
      share: {
        title: 'আপনার কার্ড শেয়ার করুন',
        downloadButton: 'কার্ড ডাউনলোড করুন',
        shareButton: 'লিঙ্ক শেয়ার করুন',
      },
      payment: {
        title: 'সালামি পাঠান',
        description: 'সালামি পাঠাতে আপনার পছন্দের পদ্ধতি বেছে নিন।',
        sendVia: 'এর মাধ্যমে পাঠান',
        copied: 'নম্বর কপি করা হয়েছে!',
      },
      wishForm: {
        title: 'সালামি শুভেচ্ছা পাঠান',
        description: 'আপনার সালামির সাথে একটি মিষ্টি বার্তা দিন!',
        namePlaceholder: 'আপনার নাম',
        messagePlaceholder: 'আপনার শুভেচ্ছা...',
        submitButton: 'শুভেচ্ছা পাঠান',
        successTitle: 'শুভেচ্ছা পাঠানো হয়েছে!',
        successDescription: 'তার ঈদকে বিশেষ করার জন্য ধন্যবাদ।',
        errorTitle: 'দুঃখিত!',
        errorDescription: 'অনুগ্রহ করে নাম এবং বার্তা উভয়ই পূরণ করুন।',
      },
      wishes: {
        title: 'সালামি শুভেচ্ছাসমূহ',
        noWishes: 'এখনও কোনো শুভেচ্ছা নেই। প্রথম জন হন!',
      },
    },
    calculator: {
      title: 'ঈদ সালামি ক্যালকুলেটর: অ্যাডভান্সড সংস্করণ',
      description:
        'আপনার রিলেশনশিপ স্ট্যাটাস, পেশা এবং আরও অনেক কিছুর উপর ভিত্তি করে এই ঈদে আপনার সালামি পাওয়ার সম্ভাবনা জানুন!',
      name: {
        label: 'আপনার নাম',
        placeholder: 'যেমন, অনিক আহমেদ',
      },
      relationship: {
        label: 'রিলেশনশিপ স্ট্যাটাস',
        placeholder: 'আপনার স্ট্যাটাস নির্বাচন করুন',
        options: {
          single: 'সিঙ্গেল',
          in_relationship: 'প্রেম করছেন',
          engaged: 'এনগেজড',
          married: 'বিবাহিত',
          crush: 'ক্রাশ আছে',
        },
      },
      gender: {
        label: 'লিঙ্গ',
        options: {
          male: 'ছেলে',
          female: 'মেয়ে',
        },
      },
      profession: {
        label: 'পেশা',
        placeholder: 'আপনার পেশা নির্বাচন করুন',
        options: {
            student: 'ছাত্র',
            unemployed: 'বেকার',
            job_holder: 'চাকরিজীবী',
            businessman: 'ব্যবসায়ী',
        },
      },
      monthlyIncome: {
          label: 'মাসিক আয় (চাকরিজীবীদের জন্য)',
          placeholder: 'আপনার আয়ের পরিসর নির্বাচন করুন',
          options: {
              low: '২০,০০০ - ৫০,০০০ টাকা',
              medium: '৫০,০০১ - ১,০০,০০০ টাকা',
              high: '১,০০,০০০+ টাকা',
          },
      },
      calculateButton: 'সালামি সম্ভাবনা গণনা করুন',
      calculating: 'গণনা করা হচ্ছে...',
      result: {
        title: 'অভিনন্দন, {name}!',
        subtitle:
          "আপনার প্রোফাইল অনুযায়ী, আপনার সালামি পূর্বাভাস:",
        probabilityLabel: 'সালামি পাওয়ার সম্ভাবনা',
        message: 'ভাইরাল মেসেজ: "{message}"',
        specialTitle: 'বিশেষ টাইটেল: {title}',
        createButton: 'আপনার সালামি ডিমান্ড লিঙ্ক তৈরি করুন',
        goBackButton: 'ফিরে যান ও আবার গণনা করুন',
        rashid: {
            title: 'অফিসিয়াল সালামি রশিদ',
            serial: 'ক্রমিক নং: {serial}',
            approved: 'অনুমোদিত',
            disclaimer: 'এই রশিদ বড় ভাই বা দুলাভাইকে দেখালে টাকা দিতে বাধ্য থাকিবেন।',
            condition: 'শর্ত: সালামি প্রদান না করিলে ঈদের দাওয়াত বাতিল বলিয়া গণ্য হইবে।',
            downloadButton: 'রশিদ ডাউনলোড করুন',
            downloadSuccessTitle: 'রশিদ ডাউনলোড হয়েছে!',
            downloadSuccessDescription: 'সালামি আদায় করতে আপনার গুরুজনদের দেখান!',
            shareTitle: 'আমার ঈদের সালামি পূর্বাভাস!',
            shareText: 'এই যে! আমি আমার সালামি পাওয়ার সম্ভাবনা বের করেছি। আমার সম্ভাবনা হলো {prob}! তুমিও তোমারটা বের করো!',
            shareButton: 'রশিদ শেয়ার করুন',
            shareSuccess: 'সফলভাবে শেয়ার করা হয়েছে!',
            copySuccess: 'লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে!',
        },
        statuses: {
          single: 'সিঙ্গেল',
          in_relationship: 'প্রেম করছেন',
          engaged: 'এনগেজড',
          married: 'বিবাহিত',
          crush: 'ক্রাশ আছে',
        },
        relationship_results: {
          single: {
            prob: '৯৯%',
            message: "কারণ বড়রা এখনো আপনাকে 'বাচ্চা' মনে করে।",
            title: 'সিঙ্গেল ইজ কিং! পকেট ফুল, টেনশন নীল।',
          },
          in_relationship: {
            prob: '৫০/৫০',
            message: 'এক পকেট দিয়ে ঢুকবে, অন্য পকেট দিয়ে গিফট হিসেবে বের হবে।',
            title: 'সালামি আসবে বিকাশ হয়ে, চলে যাবে গিফট হয়ে!',
          },
          engaged: {
            prob: '০%',
            message:
              'উল্টো শ্বশুরবাড়িতে সালামি দিতে দিতে দেউলিয়া হওয়ার চান্স ১০০%।',
            title: 'সালামি দেওয়ার ট্রেইনিং শুরু করুন, আপনি এখন বড় হয়ে গেছেন!',
          },
          married: {
            prob: '-১০০%',
            message: 'আপনার সালামি এখন আপনার বউ/বাচ্চার সম্পদ।',
            title: 'সালামি পাওয়ার দিন শেষ, দেওয়ার জন্য মানসিকভাবে প্রস্তুত হোন।',
          },
          crush: {
            prob: 'লটারির মতো',
            message: "একটি 'হাই' পেলেই সালামি সার্থক।",
            title: "সালামি চাই না, শুধু ইনবক্সে একটা রিপ্লাই চাই!",
          },
        },
        profession_results: {
            student: {
                prob: '৯৯%',
                message: "আয় নাই, তাই সালামিই আপনার শেষ ভরসা! মুরুব্বিদের সাদা চুল দেখে মায়া জাগিয়ে সালাম দিন।",
                title: "সালামি আমার অধিকার!"
            },
            unemployed: {
                prob: '১০০%',
                message: "আপনার অবস্থা দেখে ফিরনির সাথে সালামিও ডাবল হওয়ার কথা! কান্নাকাটির ইমোজি দিয়ে লিঙ্ক শেয়ার করুন।",
                title: "সহানুভূতি সালামি প্রার্থী"
            },
            job_holder: {
                prob: '-২০০%',
                message: "আপনি এখন 'বড় ভাই'। সালামি পাওয়ার স্বপ্ন বাদ দিয়ে বিকাশের পিন মনে করুন এবং ছোটদের জন্য পকেট খালি করুন!",
                title: "অফিসিয়াল সালামি দাতা"
            },
            businessman: {
                prob: 'লাভের উপর নির্ভরশীল',
                message: "ঈদের প্রফিট কোথায়? সালামি না দিলে কিন্তু 'কিপটা ব্যবসায়ী' ব্যাজ আপনার প্রোফাইলে ঝুলিয়ে দেওয়া হবে!",
                title: "ব্যবসার উপর সালামি"
            }
        },
        special_titles: {
          girl_special: {
            title: 'সালামি কুইন',
          },
          boy_special: {
            title: 'সালামিহীন হ্যান্ডসাম',
          },
        },
      },
    },
  },
};

export type Translation = typeof translations;
