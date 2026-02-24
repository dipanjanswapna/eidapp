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
            doctor: 'Doctor',
            engineer: 'Engineer',
            teacher: 'Teacher',
            govt_job: 'Government Job Holder',
            freelancer: 'Freelancer',
            rickshaw_puller: 'Rickshaw Puller',
            day_laborer: 'Day Laborer',
            expatriate: 'Expatriate Worker',
            gen_z: 'Gen-Z (Special Branch)',
            retired_politician: 'Retired Politician',
            others: 'Others',
        },
      },
      monthlyIncome: {
          label: 'Monthly Income (For Job Holders)',
          placeholder: 'e.g., 25000',
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
            },
            doctor: { prob: "-500%", message: "No time to see patients, where is the time to give Salami? Write 'blessings' in the prescription for the youngers.", title: "Digital Prescription Giver" },
            engineer: { prob: "-300%", message: "The day ends calculating rods and cement on site. The salami budget has been cast on the roof of the house!", title: "Big Brother of the Site" },
            teacher: { prob: "-100%", message: "Pocket is empty from hearing students say 'Sir, give salami'. Now it's time to take salami!", title: "Salami Receiving Teacher" },
            govt_job: { prob: "-400%", message: "Eid is over while looking at files. The salami will be given with next month's salary.", title: "Government Salami Officer" },
            freelancer: { prob: "Client's payment pending", message: "If the client pays, there will be salami, otherwise a 'will give later' message will be forwarded.", title: "Brother waiting for Upwork" },
            rickshaw_puller: { prob: "150%", message: "I want more salami than what I earn from paddling all day! I need rest on Eid day.", title: "Eid's Special Passenger" },
            day_laborer: { prob: "200%", message: "Who will give salami if I work on Eid day too? Today is a holiday! Salami must be collected.", title: "Day Laborer on Holiday" },
            expatriate: { prob: "Depends on Remittance", message: "Convert dollars to taka and send salami, otherwise you will be called a 'stingy expatriate'!", title: "Remittance Warrior" },
            gen_z: { prob: "Depends on Followers", message: "If you go viral, salami will come, otherwise only 'seen' will increase.", title: "TikTok Star" },
            retired_politician: { prob: "Depends on Pension", message: "Retired from politics, but not from salami! Joy Bangla, where is the salami?", title: "Retired Leader" },
            others: { prob: "50/50", message: "Your status is unknown, so the possibility of salami is also cloudy.", title: "Mystery Person" }
        },
        income_results: {
            range_0_1000: { prob: "-10%", message: "Does this salary run a household? Think about yourself before giving salami!", title: "Limited Income Job Holder" },
            range_1001_5000: { prob: "-20%", message: "How will the month go if you give salami with tea and cigarette money?", title: "Struggling Household" },
            range_5001_10000: { prob: "-50%", message: "The youngers will be happy if you give them 500 taka.", title: "Middle Class Big Brother" },
            range_10001_20000: { prob: "-100%", message: "It's your age to give salami now. Take money out of your pocket.", title: "Official Salami Giver" },
            range_20001_50000: { prob: "-200%", message: "Your juniors are looking at you. Don't disappoint them!", title: "Big Brother of the Area" },
            range_50001_100000: { prob: "-500%", message: "The 'stingy' title is waiting for you if you don't give salami.", title: "Rich Job Holder" },
            range_100001_plus: { prob: "-1000%", message: "What's the use of keeping your money in the bank? Distribute it among the youngers!", title: "Banker of the Area" }
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
            doctor: 'ডাক্তার',
            engineer: 'ইঞ্জিনিয়ার',
            teacher: 'শিক্ষক',
            govt_job: 'সরকারী চাকুরীজীবী',
            freelancer: 'ফ্রিল্যান্সার',
            rickshaw_puller: 'রিকশাওয়ালা',
            day_laborer: 'দিনমজুর',
            expatriate: 'প্রবাসী শ্রমিক',
            gen_z: 'Gen-Z (বিশেষ শাখা)',
            retired_politician: 'অবসরপ্রাপ্ত আওয়ামী লীগার',
            others: 'অন্যান্য',
        },
      },
      monthlyIncome: {
          label: 'মাসিক আয় (চাকরিজীবীদের জন্য)',
          placeholder: 'যেমন, ২৫০০০',
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
            condition: "শর্ত: সালামি প্রদান না করিলে ঈদের দাওয়াত বাতিল বলিয়া গণ্য হইবে।",
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
            title: "সালামি দেওয়ার ট্রেইনিং শুরু করুন, আপনি এখন বড় হয়ে গেছেন!",
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
            },
            doctor: { prob: "-৫০০%", message: "রোগী দেখার সময় নেই, সালামি দেওয়ার সময় কই? ছোটদেরকে প্রেসক্রিপশনে 'দোয়া' লিখে দিন।", title: "ডিজিটাল প্রেসক্রিপশন দাতা" },
            engineer: { prob: "-৩০০%", message: "সাইটে রড-সিমেন্টের হিসাব করতে করতেই দিন শেষ। সালামির বাজেট তো বাড়ির ছাদে ঢালাই হয়ে গেছে!", title: "সাইটের বড় ভাই" },
            teacher: { prob: "-১০০%", message: "ছাত্র-ছাত্রীদের 'স্যার, সালামি দেন' শুনতে শুনতে পকেট খালি। এবার সালামি নেওয়ার পালা!", title: "সালামি গ্রহীতা শিক্ষক" },
            govt_job: { prob: "-৪০০%", message: "ফাইল দেখতে দেখতে ঈদ শেষ। সালামিটা अगले महीने की Salary के साथ दे दिया जाएगा।", title: "সরকারী সালামি অফিসার" },
            freelancer: { prob: "ক্লায়েন্ট পেমেন্ট পেন্ডিং", message: "ক্লায়েন্ট পেমেন্ট দিলে সালামি হবে, নয়তো 'পরে দেবো' মেসেজ ফরোয়ার্ড হবে।", title: "Upwork-এর আশায় থাকা ভাই" },
            rickshaw_puller: { prob: "১৫০%", message: "সারাদিন প্যাডেল মেরে যা পাই, তার চেয়ে বেশি সালামি চাই! ঈদের দিনে তো রেস্ট দরকার।", title: "ঈদের স্পেশাল যাত্রী" },
            day_laborer: { prob: "২০০%", message: "ঈদের দিনেও কাজ করলে সালামি কে দেবে? আজ ছুটি! সালামি আদায় হবেই।", title: "ছুটিতে থাকা দিনমজুর" },
            expatriate: { prob: "রেমিট্যান্সের উপর নির্ভরশীল", message: "ডলারকে টাকায় কনভার্ট করে সালামি পাঠান, নয়তো 'কিপটা প্রবাসী' বলে ডাকা হবে!", title: "রেমিট্যান্স যোদ্ধা" },
            gen_z: { prob: "ফলোয়ারের উপর নির্ভরশীল", message: "ভাইরাল হতে পারলে সালামি আসবে, নয়তো শুধু 'সিন' বাড়বে।", title: "টিকটক স্টার" },
            retired_politician: { prob: "পেনশনের উপর নির্ভরশীল", message: "রাজনীতি থেকে অবসর নিলেও সালামি থেকে অবসর নেই! জয় বাংলা, সালামি কই?", title: "অবসরপ্রাপ্ত নেতা" },
            others: { prob: "৫০/৫০", message: "আপনার স্ট্যাটাস अज्ञात, তাই সালামির সম্ভাবনাও মেঘে ঢাকা।", title: "রহস্য মানব" }
        },
        income_results: {
            range_0_1000: { prob: "-১০%", message: "এই বেতনে সংসার চলে? সালামি দেওয়ার আগে নিজের কথা ভাবুন!", title: "সীমিত আয়ের চাকরিজীবী" },
            range_1001_5000: { prob: "-২০%", message: "চা-সিগারেটের খরচ দিয়ে সালামি দিলে মাস চলবে কীভাবে?", title: "টানাটানির সংসার" },
            range_5001_10000: { prob: "-৫০%", message: "ছোটদেরকে ৫০০ টাকা ধরিয়ে দিলেই খুশি থাকবে।", title: "মিডল ক্লাস বড় ভাই" },
            range_10001_20000: { prob: "-১০০%", message: "আপনার এখন সালামি দেওয়ার বয়স। পকেট থেকে টাকা বের করুন।", title: "অফিসিয়াল সালামি দাতা" },
            range_20001_50000: { prob: "-২০০%", message: "আপনার জুনিয়ররা আপনার দিকেই তাকিয়ে আছে। হতাশ করবেন না!", title: "এলাকার বড় ভাই" },
            range_50001_100000: { prob: "-৫০০%", message: "আপনার জন্য 'কিপটা' উপাধি অপেক্ষা করছে যদি সালামি না দেন।", title: "বড়লোক চাকরিজীবী" },
            range_100001_plus: { prob: "-১০০০০%", message: "আপনার টাকা ব্যাংকে রেখে কী লাভ? ছোটদের মাঝে বিলিয়ে দিন!", title: "এলাকার 'ব্যাংকার'" }
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
