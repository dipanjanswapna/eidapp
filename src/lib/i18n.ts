export const translations = {
  en: {
    nav: {
      home: 'Home',
      create: 'Create Card',
      calculator: 'Salami Calculator',
    },
    home: {
      title: 'Digital Salami, Festive Fun!',
      subtitle:
        'This Eid, collect your Salami in style. Create a personalized Salami card and share with friends and family to make this Eid unforgettable.',
      ctaButton: 'Create Your Salami Card',
      calculatorCtaButton: 'Salami Calculator',
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
      title: 'Eid Salami Calculator',
      description:
        'Find out your salami potential based on your relationship status, profession & income!',
      form: {
        name: {
          label: 'Your Name',
          placeholder: 'e.g., Anik Ahmed',
        },
        gender: {
          label: 'Gender',
          male: 'Male',
          female: 'Female',
        },
        relationship: {
          label: 'Relationship Status',
          placeholder: 'Select your status',
          options: {
            single: 'Single',
            in_a_relationship: 'In a relationship',
            engaged: 'Engaged',
            married: 'Married',
            has_crush: 'Have a crush',
            divorced: 'Divorced',
            secret_relation: 'Secret Relation',
          },
        },
        profession: {
          label: 'Profession',
          placeholder: 'Select your profession',
          options: {
            student: 'Student',
            unemployed: 'Unemployed',
            job_holder: 'Job Holder',
            govt_job_holder: 'Govt. Job Holder',
            doctor: 'Doctor',
            engineer: 'Engineer',
            teacher: 'Teacher',
            freelancer: 'Freelancer',
            businessman: 'Businessman',
            expat_worker: 'Expatriate Worker',
            gen_z: 'Gen-Z (Special Branch)',
            retired_awami_leaguer: 'Retired Awami Leaguer',
          },
        },
        income: {
          label: 'Monthly Income (BDT)',
          placeholder: 'e.g., 25000',
        },
        submitButton: 'Calculate My Salami',
      },
      results: {
        title: 'Official Salami Receipt',
        serial: 'Serial No',
        name: 'Name',
        status: 'Status',
        profession: 'Profession',
        salamiPotential: 'Salami Potential',
        verdict: 'Verdict',
        specialTitle: 'Special Title',
        approved: 'APPROVED',
        downloadButton: 'Download Receipt',
        shareButton: 'Share',
        sharing: 'Sharing...',
        shareError: 'Could not share image, link copied to clipboard.',
        footerDisclaimer:
          'Disclaimer: This calculation is for fun and not to be taken seriously.',
        conditions: {
          low_income:
            'Condition: If this receipt is shown to an elder brother or brother-in-law, they are obligated to pay, otherwise the Eid invitation will be cancelled after 15 years!',
          high_income:
            'Condition: This receipt will be considered an "official order" to collect a 50% discounted levy from the pockets of elder brothers or brothers-in-law.',
        },
        incomeMessages: {
          '0-1000':
            "Seeing your situation, even the mosque's charity box would cry! Grab your elder brother, Eid won't happen without salami.",
          '1001-5000':
            'Your expenses are higher than your income! If this receipt is shown, your brother-in-law will be obliged to give "sympathy salami".',
          '5001-10000':
            "Your pocket is almost empty! Go to your elders and demand a 'pocket money booster'.",
          '10001-15000':
            "You're on the borderline! Taking salami might make you look 'cheap', giving it will empty your pocket. Give salami in 15-year installments!",
          '15001-20000':
            'Good income! Time to act like a "big brother". If you don\'t give salami, the young ones will make you viral with a "stingy" badge.',
          '20001-30000':
            'Dreaming of receiving salami as an employee is like looking for mangoes on a jackfruit tree! Give salami.',
          '30001-50000':
            "You are now the 'target' of the neighborhood kids! If you don't give salami, your Eid invitation will be suspended for 15 years.",
          '50001-100000':
            "Your pocket is a money mine! If you don't give salami, your entire wallet will be confiscated as 'income tax'.",
          '100001+':
            "You are the 'Eid Moon'! Not salami, you are obliged to be the 'salami sponsor' for the whole area.",
        },
        professionMessages: {
          doctor:
            'Great income, now write the salami prescription and open the dispensary (your pocket) quickly!',
          engineer:
            "Your income structure looks solid enough to handle the salami load. Start paying salami in 15-year installments!",
          freelancer:
            "The dollar rate is high! Now, make the young ones happy with local currency, or your ID will be reported!",
          gen_z:
            "Forget income, if the vibe is right, the salami must be 'aesthetic'! Send money by scanning the QR code.",
          teacher:
            'Your salami calculation is quite tough. Allocate salami for students now at a 50% discount.',
        },
        relationshipFooter: {
          single_male:
            'If this receipt is shown to an elder brother or brother-in-law, they are obliged to pay. Remember, an unmarried man with an empty pocket is a sign of youth degradation!',
          single_female:
            'Elder brothers or brothers-in-law, beware! If you don\'t give salami upon seeing this receipt, only cardamom will be allocated for you in the Eid biryani pot!',
          in_a_relationship_male:
            'It is mandatory to buy a gift for your girlfriend. So, elder brothers, please assist in this romantic mission by providing the amount mentioned in this receipt.',
          in_a_relationship_female:
            "Your boyfriend might be stingy, but an elder brother or brother-in-law being stingy is a grave crime. Get the blessings of your cute sister by giving salami quickly.",
          engaged_male:
            'Send this receipt to your future brother-in-law. If he doesn\'t pay the salami, the "gate holding" fee on the wedding day will be doubled!',
          engaged_female:
            'Send this receipt to your future brother-in-law. If he doesn\'t pay the salami, the "gate holding" fee on the wedding day will be doubled!',
          married_male:
            "Your own pocket is occupied by in-laws and wife! Show this receipt to your elders-in-law and collect from the emergency fund.",
          married_female:
            'The husband gives money all year, but salami from elder brothers and brothers-in-law has a special prestige. Quickly take cash out of your pocket.',
          has_crush_male:
            'You need salami to groom yourself before showing your crush your new dress. Elder brothers, please don\'t embarrass me in front of my crush!',
          has_crush_female:
            'You need salami to groom yourself before showing your crush your new dress. Elder brothers, please don\'t embarrass me in front of my crush!',
          divorced_male:
            'Walking alone is tough, but a full pocket makes the path colorful. Elder brothers, please provide a start-up salami for a new life!',
          divorced_female:
            'To get back on your feet, salami is essential. As soon as this receipt is shown, elder brothers are obliged to provide party money!',
          secret_relation_male:
            'Funds are needed for a secret mission. Elder brothers are obliged to pay upon seeing this receipt without any questions!',
          secret_relation_female:
            'Funds are needed to make the secret mission successful. Elder brothers are obliged to pay upon seeing this receipt without any questions!',
        },
      },
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      create: 'কার্ড তৈরি করুন',
      calculator: 'সালামি ক্যালকুলেটর',
    },
    home: {
      title: 'ডিজিটাল সালামি, উৎসবের আমেজ!',
      subtitle:
        'এই ঈদে, স্টাইলের সাথে আপনার সালামি সংগ্রহ করুন। আপনার ব্যক্তিগত সালামি কার্ড তৈরি করুন এবং বন্ধু এবং পরিবারের সাথে শেয়ার করুন এবং এই ঈদকে অবিস্মরণীয় করে তুলুন।',
      ctaButton: 'আপনার সালামি কার্ড তৈরি করুন',
      calculatorCtaButton: 'সালামি ক্যালকুলেটর',
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
      title: 'ঈদ সালামি ক্যালকুলেটর',
      description:
        'আপনার সম্পর্ক, পেশা এবং আয়ের উপর ভিত্তি করে আপনার সালামি সম্ভাবনা জানুন!',
      form: {
        name: {
          label: 'আপনার নাম',
          placeholder: 'যেমন, অনিক আহমেদ',
        },
        gender: {
          label: 'লিঙ্গ',
          male: 'ছেলে',
          female: 'মেয়ে',
        },
        relationship: {
          label: 'রিলেশনশিপ স্ট্যাটাস',
          placeholder: 'আপনার স্ট্যাটাস নির্বাচন করুন',
          options: {
            single: 'সিঙ্গেল',
            in_a_relationship: 'প্রেম করছেন',
            engaged: 'এনগেজড',
            married: 'বিবাহিত',
            has_crush: 'ক্রাশ আছে',
            divorced: 'ডিভোর্সড',
            secret_relation: 'গোপন সম্পর্ক',
          },
        },
        profession: {
          label: 'পেশা',
          placeholder: 'আপনার পেশা নির্বাচন করুন',
          options: {
            student: 'ছাত্র',
            unemployed: 'বেকার',
            job_holder: 'চাকরিজীবী',
            govt_job_holder: 'সরকারি চাকরিজীবী',
            doctor: 'ডাক্তার',
            engineer: 'ইঞ্জিনিয়ার',
            teacher: 'শিক্ষক',
            freelancer: 'ফ্রিল্যান্সার',
            businessman: 'ব্যবসায়ী',
            expat_worker: 'প্রবাসী শ্রমিক',
            gen_z: 'Gen-Z (বিশেষ শাখা)',
            retired_awami_leaguer: 'অবসরপ্রাপ্ত আওয়ামী লীগার',
          },
        },
        income: {
          label: 'মাসিক আয় (টাকা)',
          placeholder: 'যেমন, ২৫০০০',
        },
        submitButton: 'আমার সালামি ক্যালকুলেট করুন',
      },
      results: {
        title: 'অফিসিয়াল সালামি রশিদ',
        serial: 'সিরিয়াল নং',
        name: 'নাম',
        status: 'স্ট্যাটাস',
        profession: 'পেশা',
        salamiPotential: 'সালামি সম্ভাবনা',
        verdict: 'রায়',
        specialTitle: 'বিশেষ উপাধি',
        approved: 'অনুমোদিত',
        downloadButton: 'রশিদ ডাউনলোড করুন',
        shareButton: 'শেয়ার করুন',
        sharing: 'শেয়ার করা হচ্ছে...',
        shareError: 'ছবি শেয়ার করা যায়নি, লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে।',
        footerDisclaimer:
          'বিশেষ দ্রষ্টব্য: এই গণনাটি শুধুমাত্র মজার জন্য এবং এটিকে গুরুত্ব সহকারে নেওয়ার কিছু নেই।',
        conditions: {
          low_income:
            'শর্ত: এই রশিদ বড় ভাই বা দুলাভাইকে দেখালে টাকা দিতে বাধ্য থাকিবেন, অন্যথায় ১৫ বছরের জন্য ঈদের দাওয়াত বাতিল!',
          high_income:
            'শর্ত: এই রশিদ দুলাভাই বা বড় ভাইদের পকেট থেকে ৫০% ছাড়ে চাঁদা আদায়ের \'অফিসিয়াল অর্ডার\' হিসেবে গণ্য হইবে।',
        },
        incomeMessages: {
          '0-1000':
            'আপনার অবস্থা দেখে তো মসজিদের লিল্লা বোর্ডিংও কাঁদে! বড় ভাইকে ধরুন, সালামি ছাড়া ঈদ হবে না।',
          '1001-5000':
            'আয়ের চেয়ে ব্যয় বেশি! এই রশিদ দেখালে দুলাভাই অবশ্যই \'সহানুভূতি সালামি\' দিতে বাধ্য থাকিবেন।',
          '5001-10000':
            'অবস্থা মোটামুটি, তবে সালামি ছাড়া মাস চলবে না। বড়দের কাছ থেকে \'পকেট মানি বুস্টার\' দাবি করুন।',
          '10001-15000':
            'আপনি এখন বর্ডারলাইনে! সালামি নিতে গেলে \'কিপটা\' বলবে, আর দিতে গেলে পকেট ফাঁকা হবে। ১৫ বছরের কিস্তিতে সালামি দিন!',
          '15001-20000':
            'আয় তো ভালোই! এখন \'বড় ভাই\' সাজবার সময়। সালামি না দিলে কিন্তু ছোটরা \'কিপটা\' ব্যাজ দিয়ে ভাইরাল করে দেবে।',
          '20001-30000':
            'চাকরিজীবী হয়ে সালামি পাওয়ার স্বপ্ন দেখা আর আম গাছে জাম খোঁজা একই কথা! সালামি দিন।',
          '30001-50000':
            'আপনি এখন এলাকার ছোটদের \'টার্গেট\'! সালামি না দিলে ঈদের দাওয়াত ১৫ বছরের জন্য স্থগিত করা হবে।',
          '50001-100000':
            'আপনার পকেট তো টাকার খনি! সালামি না দিলে \'ইনকাম ট্যাক্স\' হিসেবে পুরো মানিব্যাগ বাজেয়াপ্ত হবে।',
          '100001+':
            'আপনি তো \'ঈদের চাঁদ\'! সালামি না, আপনি পুরো এলাকার \'সালামি স্পন্সর\' হতে বাধ্য থাকিবেন।',
        },
        professionMessages: {
          doctor:
            'আয় তো ভালোই, এবার সালামির প্রেসক্রিপশনটা লিখে ফেলুন এবং দ্রুত ডিসপেন্সারি (পকেট) খুলুন!',
          engineer:
            'আয়ের স্ট্রাকচার দেখে মনে হচ্ছে সালামির লোড নিতে পারবেন। ১৫ বছরের কিস্তিতে সালামি দেওয়া শুরু করুন!',
          freelancer:
            'ডলারের রেট তো চড়া! এবার দেশি টাকাতে ছোটদের খুশি করুন, নইলে আইডি রিপোর্ট করা হবে!',
          gen_z:
            'ইনকামের কথা বাদ দিন, ভাইব ঠিক থাকলে সালামিও \'অ্যাস্থেটিক\' হতে হবে! কিউআর কোড স্ক্যান করে টাকা দিন।',
          teacher:
            'আপনার সালামির হিসাবটা বেশ কঠিন। ছাত্রছাত্রীদের জন্য এখনই ৫০% ডিসকাউন্টে সালামি বরাদ্দ করুন।',
        },
        relationshipFooter: {
          single_male:
            'এই রশিদ বড় ভাই বা দুলাভাইকে দেখালে টাকা দিতে বাধ্য থাকিবেন। মনে রাখবেন, অবিবাহিত ছেলেদের পকেট খালি থাকা মানেই দেশের যুবসমাজের অবক্ষয়!',
          single_female:
            'বড় ভাই বা দুলাভাইরা সাবধান! এই রশিদ দেখা মাত্রই সালামি না দিলে ঈদের বিরিয়ানির হাড়িতে আপনার জন্য শুধু এলাচ বরাদ্দ থাকবে!',
          in_a_relationship_male:
            'আপনার গার্লফ্রেন্ডের জন্য গিফট কেনা ফরজ। তাই বড় ভাইরা দয়া করে এই রশিদে উল্লিখিত টাকা প্রদান করে রোমান্টিক মিশনে সহায়তা করুন।',
          in_a_relationship_female:
            'বয়ফ্রেন্ড কিপটা হতে পারে, কিন্তু বড় ভাই বা দুলাভাই কিপটা হওয়া মানেই ঘোর অপরাধ। অতি দ্রুত সালামি দিয়ে কিউট বোনের দোয়া নিন।',
          engaged_male:
            'হবু দুলাভাইকে এই রশিদটি পাঠান। সালামি না দিলে বিয়ের দিন দরজায় দাঁড়ানোর \'গেট ধরা\' ফি দ্বিগুণ করা হইবে!',
          engaged_female:
            'হবু দুলাভাইকে এই রশিদটি পাঠান। সালামি না দিলে বিয়ের দিন দরজায় দাঁড়ানোর \'গেট ধরা\' ফি দ্বিগুণ করা হইবে!',
          married_male:
            'নিজের পকেট তো শ্যালক-শ্যালিকা আর বউয়ের দখলে! এই রশিদ দেখিয়ে শ্বশুরবাড়ির মুরুব্বিদের থেকে ইমার্জেন্সি ফান্ড আদায় করুন।',
          married_female:
            'স্বামী তো সারা বছর টাকা দেয়ই, কিন্তু বড় ভাই ও দুলাভাইদের সালামির আলাদা আভিজাত্য আছে। দ্রুত পকেট থেকে নগদ অর্থ বের করুন।',
          has_crush_male:
            'ক্রাশকে ড্রেস দেখানোর আগে নিজেকে পরিপাটি করতে সালামি প্রয়োজন। বড় ভাইরা দয়া করে ক্রাশের সামনে ছোট করবেন না!',
          has_crush_female:
            'ক্রাশকে ড্রেস দেখানোর আগে নিজেকে পরিপাটি করতে সালামি প্রয়োজন। বড় ভাইরা দয়া করে ক্রাশের সামনে ছোট করবেন না!',
          divorced_male:
            'একলা পথে চলা কঠিন, পকেট গরম থাকলে পথ হবে রঙিন। বড় ভাইরা দয়া করে নতুন জীবনের জন্য স্টার্ট-আপ সালামি দিন!',
          divorced_female:
            'নতুন করে ঘুরে দাঁড়াতে সালামি অতি জরুরি; এই রশিদ দেখা মাত্রই বড় ভাইরা ফুর্তি করার টাকা দিতে বাধ্য থাকিবেন!',
          secret_relation_male:
            'গোপন মিশনের গোপন খরচ মেটাতে সালামি প্রয়োজন। বড় ভাইরা দয়া করে প্রশ্ন না করে এই রশিদ অনুযায়ী পেমেন্ট করুন!',
          secret_relation_female:
            'গোপন মিশন সফল করতে ফান্ড প্রয়োজন; এই রশিদ দেখালে বড় ভাইরা প্রশ্ন ছাড়াই সালামি দিতে বাধ্য থাকিবেন!',
        },
      },
    },
  },
};

export type Translation = typeof translations;
