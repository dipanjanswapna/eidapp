export const translations = {
  en: {
    nav: {
      home: 'Home',
      calculator: 'Salami Calculator',
      brand: 'EidVibe',
      register: 'Register',
      ngl: 'Eid Letter',
      eidWheel: 'Lucky Wheel',
      eidCard: 'Eid Card',
      iftar: 'Iftar Spots'
    },
    home: {
      title: 'EidVibe: Make Your Eid More Colorful!',
      subtitle:
        'This Eid, boost your joy with all features in one place. Send anonymous messages, create custom colorful Salami receipts, or find free Iftar and Sehri spots on the map—everything is now on EidVibe!',
      ctaButton: 'Create Your Salami Card',
      calculatorCtaButton: 'Salami Calculator',
    },
    form: {
      bkash: {
        label: 'bKash Number (Optional)',
        placeholder: 'e.g., 01700000000',
      },
      nagad: {
        label: 'Nagad Number (Optional)',
        placeholder: 'e.g., 01800000000',
      },
      rocket: {
        label: 'Rocket Number (Optional)',
        placeholder: 'e.g., 018000000001',
      },
    },
    salamiPage: {
        payment: {
            title: 'Send Salami',
            description: 'Make their Eid even more special!',
            sendVia: 'Send via',
            copied: 'Number Copied!',
        },
    },
    eidCard: {
      create: {
        title: 'Create an Eid Card',
        description: 'Design a beautiful, personalized Eid card for your loved ones.',
        recipient: {
          label: "Recipient's Name",
          placeholder: "e.g., Anik Ahmed",
        },
        message: {
          label: 'Personal Message',
          placeholder: 'Write your heartfelt wishes here...',
        },
        theme: {
          label: 'Choose a Theme',
          'royal-blue': 'Royal Blue',
          'bright-red': 'Bright Red',
          'golden-yellow': 'Golden Yellow',
        },
        targetAmount: {
            label: 'Target Salami Amount (Optional)',
            placeholder: 'e.g., 500',
        },
        submitButton: 'Generate Salami Invoice',
      },
      display: {
        title: 'A Special Eid Card For You',
        paymentTitle: 'Send Salami',
        paymentDescription: 'Make their Eid even more special!',
        sendVia: 'Send via',
        copied: 'Number Copied!',
        share: {
            title: "Share this Card",
            downloadButton: 'Download Card',
            shareButton: 'Share',
            linkCopied: 'Card link copied!',
            sharing: 'Sharing...',
            shareError: 'Could not share image automatically. The link has been copied to your clipboard.',
        },
        invoiceTitle: 'Official Salami Invoice',
        targetAmount: 'Target Amount',
        status: 'Status',
        unpaid: 'Unpaid',
        paid: 'PAID',
        confirmPayment: 'Confirm Payment',
        paymentConfirmed: 'Payment Confirmed!',
        paymentError: 'Could not confirm payment.',
      }
    },
    calculator: {
      title: 'Eid Salami Calculator',
      description:
        'This Ramadan, find out your salami potential based on your relationship status, profession & income!',
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
          placeholder: 'I have no money, give me money...',
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
        approved: 'APPROVED',
        downloadButton: 'Download Receipt',
        shareButton: 'Share',
        sharing: 'Sharing...',
        shareError: 'Could not share image, link copied to clipboard.',
        footerDisclaimer:
          'Disclaimer: This calculation is for fun and not to be taken seriously.',
        specialTitles: {
          salamiQueen: 'Salami Queen',
          bigBrother: 'Official Big Brother',
        },
        salamiLogic: {
          '0-1000': 'Full Salami Receivable',
          '1001-5000': 'Salami: 90% Receivable',
          '5001-10000': 'Salami: 80% Receivable',
          '10001-15000': 'Salami: 50/50',
          '15001-20000': 'Salami: 30% (To Give)',
          '20001-30000': 'Salami: -50% (Must Give)',
          '30001-50000': 'Salami: -80% (Definitely)',
          '50001-100000': 'Salami: -100% (Rich)',
          '100001+': 'Salami: -500% (Sponsor)',
        },
        conditions: {
          low_income:
            'Condition: If this receipt is disobeyed and salami is not provided, your Eid invitation will be considered cancelled.',
          medium_income:
            'Condition: Considering the financial situation, elder brothers can pay this salami in 15-year easy installments.',
          high_income:
            'Condition: Since the pockets of elder brothers are overflowing, if salami is not given, this amount will be collected as a 50% subscription fee.',
        },
        incomeMessages: {
          '0-1000':
            "Looks like you don't even have money to buy mosquito coils! No way to go without salami.",
          '1001-5000':
            'Your rickshaw fare is more than your income! This is a receipt to collect from the "emergency fund" of the elders.',
          '5001-10000':
            "Your pocket is almost an empty field! Catch your elders, so that Eid is not spent just eating puffed rice.",
          '10001-15000':
            "You're on the borderline! Taking salami might hurt your pride, giving it will empty your pocket. Give salami in installments!",
          '15001-20000':
            "Income is good enough! Time to act like a 'big brother'. If you don't give salami, the young ones will make you viral.",
          '20001-30000':
            'Dreaming of receiving salami as an employee is like looking for mangoes on a jackfruit tree! Give salami.',
          '30001-50000':
            "You are now the 'target' of the neighborhood kids! If you don't give salami, your Eid invitation will be suspended for 15 years.",
          '50001-100000':
            "Your pocket is a money mine! If you don't give salami, your entire wallet will be confiscated as 'income tax'.",
          '100001+':
            "You are the 'Eid Moon'! Not salami, you are obliged to be the 'salami sponsor' for the whole area.",
        },
        relationshipVerdict: {
          single: 'Single is king! Pocket full, tension nil. Your only job is to collect salami.',
          in_a_relationship:
            'Salami will come via bKash, and go out as a gift! Prepare your pocket.',
          engaged:
            'You have a 100% chance of going bankrupt giving salami to your in-laws. Start saving!',
          married:
            'Your salami is now your spouse/child\'s property. You are just a medium.',
          has_crush: 'A simple "Hi" is your salami. Don\'t expect more!',
          divorced:
            'You need to rebuild your life and pocket—so demand double salami from everyone!',
          secret_relation:
            'Secret relationships are expensive! Get backup salami from elder brothers before you get caught.',
        },
        professionFooter: {
          doctor_male:
            'Before wielding a scalpel in the operating theater, wield one on your elder brothers\' pockets! Upon seeing this receipt, they are obligated to give salami without any anesthesia.',
          doctor_female:
            'You\'ve written many prescriptions, now write a "salami dose" for yourself. If brothers-in-law don\'t give salami, all their Eid sweets are forbidden!',
          engineer_male:
            'Your income\'s structural design is quite robust, but the pocket seems to be asking for liquidation! Elder brothers, please provide salami according to your load-bearing capacity.',
          engineer_female:
            'A new blueprint for collecting salami has been prepared. If brothers-in-law don\'t clear the payment upon seeing this receipt, all your plans will be cancelled!',
          govt_job_holder_male:
            'According to government protocol, giving salami to juniors is now your constitutional duty. This receipt shall be considered an "official gazette"!',
          govt_job_holder_female:
            'Don\'t let the salami file get stuck in red tape! Elder brothers, quickly provide salami to your cute sister from the "development fund".',
          freelancer_male:
            'The dollar rate has soared, now "withdraw" some local currency from your elder brothers. Upon seeing this receipt, they are obligated to send salami directly to your account.',
          freelancer_female:
            'When cuteness and work are both professional, the salami should be premium too. If brothers-in-law are stingy, a report will be filed against your freelancing ID!',
          gen_z_male:
            'To keep the vibe right, you need cash in your pocket. Elder brothers, send money to this QR code without being "sus", or you\'ll be turned into a meme and made viral!',
          gen_z_female:
            'No "aesthetic" Eid picture can be taken without salami. Brothers-in-law, open your pockets quickly, otherwise you will be cropped out of all my pictures!',
          retired_awami_leaguer_male:
            'Enough with politics, now make a new deal (salami) with the young ones. If you don\'t provide salami according to this receipt, elder brothers will be "exempted" from the Eid grounds!',
          retired_awami_leaguer_female:
            'Salami is our democratic right! Elder brothers, do not abuse your power and quickly fulfill the demand of this receipt.',
          teacher_male:
            'Elder brothers, please come out of the class and give the salami. If this receipt is disobeyed, a complaint homework will be assigned in your name!',
          teacher_female:
            'Giving salami is now an obligatory subject for you. If brothers-in-law don\'t want to fail, they must provide cash immediately.',
          businessman_male:
            'Business profit or loss, giving salami is mandatory! Making the young ones happy on Eid is also a big investment.',
          businessman_female:
            'Business profit or loss, giving salami is mandatory! Making the young ones happy on Eid is also a big investment.',
          expat_worker_male:
            'You are a remittance warrior! Add a little salami with your dollars or riyals, the Eid of the young ones back home will become colorful.',
          expat_worker_female:
            'You are a remittance warrior! Add a little salami with your dollars or riyals, the Eid of the young ones back home will become colorful.',
          student_male:
            'Your only job this Eid is to collect salami. Use this receipt to show your elders that it\'s your right!',
          student_female:
            'Your only job this Eid is to collect salami. Use this receipt to show your elders that it\'s your right!',
          unemployed_male:
            'Since you have no income, this receipt is a legal document to demand sympathy salami from everyone.',
          unemployed_female:
            'Since you have no income, this receipt is a legal document to demand sympathy salami from everyone.',
        },
        relationshipFooter: {
          single_male:
            'If this receipt is shown to an elder brother or brother-in-law, they are obliged to pay. Remember, an unmarried man with an empty pocket is a sign of youth degradation!',
          single_female:
            'Elder brothers or brothers-in-law, beware! If you don\'t give salami upon seeing this receipt, only cardamom will be allocated for you in the Eid biryani pot!',
          in_a_relationship_male:
            'It is mandatory to buy a gift for your girlfriend. So, elder brothers, please assist in this romantic mission by providing the amount mentioned in this receipt.',
          in_a_relationship_female:
            'Your boyfriend might be stingy, but an elder brother or brother-in-law being stingy is a grave crime. Get the blessings of your cute sister by giving salami quickly.',
          engaged_male:
            'Send this receipt to your future brother-in-law. If he doesn\'t pay the salami, the "gate holding" fee on the wedding day will be doubled!',
          engaged_female:
            'Send this receipt to your future brother-in-law. If he doesn\'t pay the salami, the "gate holding" fee on the wedding day will be doubled!',
          married_male:
            'Your own pocket is occupied by in-laws and wife! Show this receipt to your elders-in-law and collect from the emergency fund.',
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
    ngl: {
      create: {
        title: 'Create Your Eid Letter Inbox',
        description: 'Set a username and PIN to receive anonymous messages.',
        name: {
          label: 'Your Name',
          placeholder: 'e.g., Anik Ahmed',
        },
        username: {
          label: 'Choose a Username',
          placeholder: 'e.g., anik_ahmed',
          description:
            'This will be your unique link: https://eidvibe.vercel.app/ngl/{username}',
        },
        pin: {
          label: 'Set a 4-6 digit PIN',
          placeholder: 'e.g., 1234',
          description: "You'll use this to log in. Don't forget it!",
        },
        gender: {
          label: 'Gender',
          male: 'Male',
          female: 'Female',
          other: 'Other',
        },
        profession: {
          label: 'Profession',
          placeholder: 'Select your profession',
        },
        submitButton: 'Create My Inbox',
        success: 'Inbox created successfully! You can now log in.',
      },
      login: {
        title: 'Access Your Inbox',
        description: 'Enter your username and PIN to read your messages.',
        username: {
          label: 'Username',
          placeholder: 'Your unique username',
        },
        pin: {
          label: 'PIN',
          placeholder: 'Your secret PIN',
        },
        submitButton: 'Login',
        error: 'Invalid username or PIN.',
        createLink: "Don't have an inbox? Create one now!",
      },
      send: {
        title: 'Send an Eid Letter to',
        subtitle: 'Your identity will be kept secret.',
        message: {
          placeholder: 'Send me a secret Eid message or a Salami request!',
          error: 'Message cannot be empty.',
        },
        senderTag: {
          label: 'Choose a secret identity (optional)',
          placeholder: 'Select a tag',
          options: {
            anonymous: 'Anonymous',
            boro_bhai: 'Kipta Boro Bhai',
            boro_apu: 'Affectionate Apu',
            choto_bhai: 'Naughty Choto Bhai',
            choto_bon: 'Cute Choto Bon',
            shalika: 'Bicchu Shalika',
            crush: 'Secret Crush',
            ex: 'An Ex',
            friend: 'A Friend',
            batchmate: 'Batchmate',
            senior: 'Senior',
            junior: 'Junior',
            colleague: 'Colleague',
          },
        },
        submitButton: 'Send Letter',
        getYourOwnButton: 'Get your own messages!',
        orSeparator: 'Or',
        success: {
          title: 'Message Sent!',
          description:
            'Want to create your own inbox to receive secret messages?',
          cta: 'Create Your Inbox',
        },
      },
      inbox: {
        title: 'Your Eid Letter Inbox',
        share: {
          title: 'Share Your Link',
          description:
            'Let your friends know where to send you secret Eid letters!',
          shareButton: 'Share Link',
          copyButton: 'Copy Link',
          linkCopied: 'Link Copied!',
        },
        noMessages: 'No Eid letters yet. Share your link to get some!',
        replyButton: 'Reply & Share',
        repliedStatus: 'Replied',
        replyModal: {
          title: 'Reply to this message',
          reply: {
            placeholder: 'Write your reply...',
          },
          submitButton: 'Confirm & Preview Share Card',
        },
        shareModal: {
          title: 'Share to Your Story',
          description:
            'Download this card and share it on your social media!',
          downloadButton: 'Download Card',
          shareButton: 'Share to Story',
          sharing: 'Sharing...',
          shareError: 'Could not share automatically. Please download and share manually.',
        },
        logout: 'Logout',
      },
    },
    eidWheel: {
      title: 'Eid Planning Lucky Wheel',
      description: 'Spin the wheel to find out your Eid plan! Share your result with friends.',
      spinButton: 'Spin the Wheel',
      name: {
        label: 'Your Name',
        placeholder: 'Enter your name to spin',
      },
      results: {
        title: "Official Eid Plan",
        resultFor: "Result for",
        plan: "Your Eid Plan",
        downloadButton: "Download Plan",
        shareButton: "Share Plan",
        sharing: "Sharing...",
        shareError: "Could not share image, link copied to clipboard.",
        footerDisclaimer: "Disclaimer: This wheel is for fun and not to be taken seriously.",
        backButton: "Spin Again",
      },
      options: [
        'Salami Collection: Spend the day emptying elders\' pockets.',
        'Biryani Dinner: Devour at least 3 plates of biryani.',
        'Bed Relaxation: Sleep in until noon, even on Eid day.',
        'Hangout Time: Go for a bike ride around the city with friends.',
        'Guest Management: Keep all the little guests at home busy.',
        'Salami Distribution: Today, you have to give Salami to the young ones from your pocket.',
        'Chat with Crush: The perfect opportunity to message your crush today.',
        'Kitchen Help: Help your mom make shemai or payesh.',
        'Photoshoot Session: Take 100 photos wearing your new panjabi/dress.',
        'Movie Marathon: Stay up all night watching all the new Eid dramas.',
        'Invitation Feast: Go to relatives\' houses and eat to your heart\'s content.',
        'Old Memories: Hang out with your school friends.',
        'Single Eid: Listen to music alone with headphones.',
        'Long Drive: Go out for a drive in the drizzling rain.',
        'Salami Queen/King: You are today\'s highest Salami recipient!',
      ],
    },
    iftar: {
      title: 'Iftar & Sehri Spot Finder',
      description: 'Find free Iftar and Sehri spots near you, shared by the community.',
      addSpotButton: 'Add New Spot',
      filter: {
        label: 'Filter by Food',
        all: 'All',
        verified: 'Verified Spots',
      },
      map: {
        loading: 'Loading map...',
        noSpots: 'No spots found for the selected filter. Try another one!',
        popup: {
          verifiedBy: 'Verified by',
          people: 'people',
          isFake: 'Fake spot?',
          vote: 'Vote',
          distance: "Distance:",
          kmAway: "km away",
          yourLocation: "You are here"
        },
        liveLocationButton: 'Go to my location',
        geolocationNotSupported: {
          title: 'Geolocation Not Supported',
          description: 'Your browser does not support geolocation.'
        },
        locationError: {
          title: 'Location Error',
          description: 'Could not get your location. Please enable location services and try again.'
        }
      },
      addSpotDialog: {
        title: 'Add a New Iftar/Sehri Spot',
        description: 'Help the community by sharing a spot. Your entry will be live for 24 hours.',
        masjidName: {
          label: 'Mosque/Spot Name',
          placeholder: 'e.g., Baitul Mukarram Mosque'
        },
        area: {
          label: 'Area / Neighborhood',
          placeholder: 'e.g., Paltan, Dhaka'
        },
        foodType: {
          label: 'Food Type',
          placeholder: 'Select food type'
        },
        otherFoodType: {
          label: 'Specify Other Food',
          placeholder: 'e.g., Fruits, Juice'
        },
        location: {
          label: 'Location',
          description: 'Click on the map to set location or use your current location.',
          useCurrentLocation: 'Use My Current Location',
        },
        endTime: {
            label: 'Food Available Until (Optional)',
            description: 'Time when food distribution ends (24h format).',
            placeholder: 'HH:MM e.g., 18:30',
        },
        submitButton: 'Add Spot',
        submitting: 'Adding...',
        success: 'Spot added successfully!',
        error: 'Failed to add spot. Please try again.'
      },
      foodTypes: {
        'kacchi-biryani': 'Kacchi Biryani',
        'tehari': 'Tehari',
        'khichuri': 'Khichuri (Bhuna/Patla)',
        'polao-korma': 'Polao & Korma',
        'beef-roti': 'Beef & Roti/Rice',
        'chicken-biryani': 'Chicken Biryani/Roast',
        'mutton': 'Mutton',
        'haleem-jilapi': 'Haleem & Jilapi',
        'mixed-iftar': 'Mixed Iftar (Chickpeas, etc.)',
        'sehri-thali': 'Sehri Special Thali',
        'others': 'Others'
      }
    }
  },
  bn: {
    nav: {
      home: 'হোম',
      calculator: 'সালামি ক্যালকুলেটর',
      brand: 'EidVibe',
      register: 'নিবন্ধন করুন',
      ngl: 'ঈদের চিঠি',
      eidWheel: 'লাকি হুইল',
      eidCard: 'ঈদ কার্ড',
      iftar: 'ইফতার স্পট'
    },
    home: {
      title: 'EidVibe: আপনার ঈদ হোক আরও রঙিন!',
      subtitle:
        'এবারের ঈদে আপনার আনন্দকে বাড়িয়ে দিতে আমরা নিয়ে এলাম সব ফিচার এক জায়গায়। নাম গোপন রেখে বন্ধুদের মেসেজ পাঠানো, কাস্টম কালারফুল সালামি রশিদ তৈরি করা, কিংবা ম্যাপে ফ্রিতে ইফতার ও সেহরি স্পট খুঁজে পাওয়া—সবই হবে এখন EidVibe-এ!',
      ctaButton: 'আপনার সালামি কার্ড তৈরি করুন',
      calculatorCtaButton: 'সালামি ক্যালকুলেটর',
    },
    form: {
      bkash: {
        label: 'বিকাশ নম্বর (ঐচ্ছিক)',
        placeholder: 'যেমন, ০১৭০০০০০০০০',
      },
      nagad: {
        label: 'নগদ নম্বর (ঐচ্ছিক)',
        placeholder: 'যেমন, ০১৮০০০০০০০০',
      },
      rocket: {
        label: 'রকেট নম্বর (ঐচ্ছিক)',
        placeholder: 'যেমন, ০১৮০০০০০০০০১',
      },
    },
    salamiPage: {
        payment: {
            title: 'সালামি পাঠান',
            description: 'তার ঈদকে আরও বিশেষ করে তুলুন!',
            sendVia: 'এর মাধ্যমে পাঠান',
            copied: 'নম্বর কপি করা হয়েছে!',
        },
    },
    eidCard: {
      create: {
        title: 'ঈদ কার্ড তৈরি করুন',
        description: 'আপনার প্রিয়জনের জন্য একটি সুন্দর, ব্যক্তিগত ঈদ কার্ড ডিজাইন করুন।',
        recipient: {
          label: "প্রাপকের নাম",
          placeholder: "যেমন, অনিক আহমেদ",
        },
        message: {
          label: 'ব্যক্তিগত বার্তা',
          placeholder: 'এখানে আপনার আন্তরিক শুভেচ্ছা লিখুন...',
        },
        theme: {
          label: 'একটি থিম নির্বাচন করুন',
          'royal-blue': 'রাজকীয় নীল',
          'bright-red': 'উজ্জ্বল লাল',
          'golden-yellow': 'সোনালী হলুদ',
        },
        targetAmount: {
            label: 'সালামির লক্ষ্যমাত্রা (ঐচ্ছিক)',
            placeholder: 'যেমন, ৫০০',
        },
        submitButton: 'সালামি ইনভয়েস তৈরি করুন',
      },
      display: {
        title: 'আপনার জন্য একটি বিশেষ ঈদ কার্ড',
        paymentTitle: 'সালামি পাঠান',
        paymentDescription: 'তার ঈদকে আরও বিশেষ করে তুলুন!',
        sendVia: 'এর মাধ্যমে পাঠান',
        copied: 'নম্বর কপি করা হয়েছে!',
        share: {
            title: "এই কার্ডটি শেয়ার করুন",
            downloadButton: 'কার্ড ডাউনলোড করুন',
            shareButton: 'শেয়ার করুন',
            linkCopied: 'কার্ডের লিঙ্ক কপি করা হয়েছে!',
            sharing: 'শেয়ার হচ্ছে...',
            shareError: 'ছবি স্বয়ংক্রিয়ভাবে শেয়ার করা যায়নি। লিঙ্কটি আপনার ক্লিপবোর্ডে কপি করা হয়েছে।',
        },
        invoiceTitle: 'অফিসিয়াল সালামি ইনভয়েস',
        targetAmount: 'লক্ষ্যমাত্রা',
        status: 'স্ট্যাটাস',
        unpaid: 'অপরিশোধিত',
        paid: 'পরিশোধিত',
        confirmPayment: 'পেমেন্ট নিশ্চিত করুন',
        paymentConfirmed: 'পেমেন্ট নিশ্চিত হয়েছে!',
        paymentError: 'পেমেন্ট নিশ্চিত করা যায়নি।',
      }
    },
    calculator: {
      title: 'ঈদ সালামি ক্যালকুলেটর',
      description:
        'এই রমজানে, আপনার সম্পর্ক, পেশা এবং আয়ের উপর ভিত্তি করে আপনার সালামি সম্ভাবনা জানুন!',
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
          placeholder: 'টাকা নাই, টাকা দিন...',
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
        approved: 'অনুমোদিত',
        downloadButton: 'রশিদ ডাউনলোড করুন',
        shareButton: 'শেয়ার করুন',
        sharing: 'শেয়ার করা হচ্ছে...',
        shareError: 'ছবি শেয়ার করা যায়নি, লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে।',
        footerDisclaimer:
          'বিশেষ দ্রষ্টব্য: এই গণনাটি শুধুমাত্র মজার জন্য এবং এটিকে গুরুত্ব সহকারে নেওয়ার কিছু নেই।',
        specialTitles: {
          salamiQueen: 'সালামি কুইন',
          bigBrother: 'অফিসিয়াল বড় ভাই',
        },
        salamiLogic: {
          '0-1000': 'পুরো সালামি প্রাপ্য',
          '1001-5000': 'সালামি: ৯০% পাবেন',
          '5001-10000': 'সালামি: ৮০% পাবেন',
          '10001-15000': 'সালামি: ৫০/৫০',
          '15001-20000': 'সালামি: ৩০% (দেবেন)',
          '20001-30000': 'সালামি: -৫০% (দেওয়া বাধ্য)',
          '30001-50000': 'সালামি: -৮০% (অবশ্যই)',
          '50001-100000': 'সালামি: -১০০% (ধনী)',
          '100001+': 'সালামি: -৫০০% (দান)',
        },
        conditions: {
          low_income:
            'শর্ত: এই রশিদ অমান্য করিলে এবং সালামি প্রদান না করিলে, আপনার ঈদের দাওয়াত বাতিল বলিয়া গণ্য হইবে।',
          medium_income:
            'শর্ত: আর্থিক অবস্থার কথা বিবেচনা করিয়া বড় ভাইরা ১৫ বছরের কিস্তিতে এই সালামি পরিশোধ করিতে পারিবেন।',
          high_income:
            'শর্ত: যেহেতু বড় ভাইদের পকেট উপচে পড়িতেছে, তাই সালামি না দিলে ৫০% চাঁদা হিসেবে এই অর্থ আদায় করা হইবে।',
        },
        incomeMessages: {
          '0-1000':
            'আপনার অবস্থা দেখে তো মশার কয়েল কেনার টাকাও নাই মনে হচ্ছে! সালামি ছাড়া গতি নেই।',
          '1001-5000':
            'আয়ের চেয়ে তো রিকশা ভাড়াই বেশি! বড়দের পকেট থেকে \'ইমার্জেন্সি ফান্ড\' আদায়ের রশিদ এটি।',
          '5001-10000':
            'পকেট তো প্রায় গড়ের মাঠ! বড় ভাইদের ধরুন, ঈদটা যেন শুধু মুড়ি খেয়ে না কাটে।',
          '10001-15000':
            'আপনি এখন বর্ডারলাইনে! সালামি নিতে গেলে ইজ্জত যাবে, আর দিতে গেলে পকেট যাবে। কিস্তিতে সালামি দিন!',
          '15001-20000':
            'আয় তো মাশাল্লাহ! এখন কিপটেমি ছেড়ে ছোটদের জন্য কিছু ছাড়ার সময় হয়েছে।',
          '20001-30000':
            'চাকরিজীবী হয়ে সালামি পাওয়ার আশা করা আর আম গাছে জাম খোঁজা একই কথা! সালামি দিন।',
          '30001-50000':
            'আপনি এখন এলাকার ছোটদের \'টার্গেট\'! সালামি না দিলে ঈদের দাওয়াত ১৫ বছরের জন্য স্থগিত করা হবে।',
          '50001-100000':
            'আপনার পকেট তো টাকার খনি! সালামি না দিলে \'ইনকাম ট্যাক্স\' হিসেবে পুরো মানিব্যাগ বাজেয়াপ্ত হবে।',
          '100001+':
            'আপনি তো মূর্তমান বিরিয়ানি! সালামি না, আপনি পুরো এলাকার ঈদ স্পন্সর হতে বাধ্য।',
        },
        relationshipVerdict: {
          single: 'সিঙ্গেল ইজ কিং! পকেট ফুল, টেনশন নীল। আপনার একমাত্র কাজ সালামি আদায় করা।',
          in_a_relationship:
            'সালামি আসবে বিকাশ হয়ে, চলে যাবে গিফট হয়ে! পকেট প্রস্তুত রাখুন।',
          engaged:
            'শ্বশুরবাড়িতে সালামি দিতে দিতে আপনার দেউলিয়া হওয়ার চান্স ১০০%। এখন থেকেই সঞ্চয় শুরু করুন।',
          married:
            'আপনার সালামি এখন আপনার বউ/বাচ্চার সম্পদ। আপনি শুধু একজন মাধ্যম।',
          has_crush: 'একটা সিম্পল "Hi"-ই আপনার সালামি। এর বেশি আশা করবেন না!',
          divorced:
            'নতুন করে জীবন আর পকেট—দুটোই গোছাতে হবে, তাই সবার থেকে ডাবল সালামি দাবি করুন!',
          secret_relation:
            'গোপন সম্পর্কের খরচ অনেক! ধরা পড়ার আগেই বড় ভাইদের থেকে সালামি নিয়ে ব্যাকআপ রাখুন।',
        },
        professionFooter: {
          doctor_male:
            'অপারেশন থিয়েটারে কাঁচি চালানোর আগে বড় ভাইদের পকেটে কাঁচি চালান! এই রশিদ দেখা মাত্রই বড় ভাইরা \'অ্যানেস্থেশিয়া\' ছাড়াই সালামি দিতে বাধ্য থাকিবেন।',
          doctor_female:
            'অনেক তো প্রেসক্রিপশন লিখলেন, এবার নিজের জন্য একটা \'সালামি ডোজ\' লিখে ফেলুন। দুলাভাইরা সালামি না দিলে ঈদের দিন তাদের সব মিষ্টি খাওয়া নিষেধ!',
          engineer_male:
            'আপনার ইনকামের স্ট্রাকচারাল ডিজাইন বেশ মজবুত, কিন্তু পকেটটা কেন জানি লিকুইডেশন চাচ্ছে! বড় ভাইরা দয়া করে লোড বিয়ারিং ক্যাপাসিটি অনুযায়ী সালামি দিন।',
          engineer_female:
            'সালামি আদায়ের জন্য নতুন ব্লু-প্রিন্ট তৈরি করা হয়েছে। দুলাভাইরা এই রশিদ দেখা মাত্রই পেমেন্ট ক্লিয়ার না করলে আপনার সব প্ল্যান বাতিল করা হবে!',
          govt_job_holder_male:
            'সরকারি প্রটোকল অনুযায়ী ছোটদের সালামি দেওয়া এখন আপনার সাংবিধানিক দায়িত্ব। এই রশিদটি একটি \'অফিসিয়াল গ্যাজেট\' হিসেবে গণ্য হইবে!',
          govt_job_holder_female:
            'সালামি পেতে ফাইল যেন লাল ফিতায় আটকে না থাকে! বড় ভাইরা অতি দ্রুত \'উন্নয়ন তহবিল\' থেকে কিউট বোনকে সালামি প্রদান করুন।',
          freelancer_male:
            'ডলারের রেট তো অনেক বাড়লো, এবার বড় ভাইদের থেকে কিছু দেশি টাকা \'উইথড্র\' করুন। এই রশিদটি দেখালে তারা আপনার অ্যাকাউন্টে সরাসরি সালামি পাঠাতে বাধ্য থাকিবেন।',
          freelancer_female:
            'কিউটনেস আর কাজ—দুটোই যখন প্রফেশনাল, তখন সালামিটাও হওয়া চাই প্রিমিয়াম। দুলাভাইরা কিপটেমি করলে আপনার ফ্রিল্যান্সিং আইডিতে রিপোর্ট মারা হবে!',
          gen_z_male:
            'ভাইব ঠিক রাখতে পকেটে নগদ দরকার। বড় ভাইরা \'স্লুই\' না মেরে এই কিউআর কোডে টাকা পাঠান, না হলে আপনাদের মেম বানিয়ে ভাইরাল করা হবে!',
          gen_z_female:
            'নো \'অ্যাস্থেটিক\' ঈদ পিকচার সালামি ছাড়া উঠবে না। দুলাভাইরা দ্রুত পকেট খুলুন, অন্যথায় আপনার সব ছবি থেকে আপনাকে ক্রপ করে ফেলা হবে!',
          retired_awami_leaguer_male:
            'পলিটিক্স অনেক হলো, এবার ছোটদের দাবি মেনে নিন। এই রশিদ অনুযায়ী সালামি না দিলে বড় ভাইদের ঈদের মাঠ থেকে \'অব্যাহতি\' দেওয়া হইবে!',
          retired_awami_leaguer_female:
            'সালামি আমাদের গণতান্ত্রিক অধিকার! বড় ভাইরা ক্ষমতার অপব্যবহার না করে দ্রুত এই রশিদের দাবি পূরণ করুন।',
          teacher_male:
            'বড় ভাইরা দয়া করে ক্লাসের বাইরে এসে সালামিটা দিয়ে যান। এই রশিদ অমান্য করলে আপনাদের নামে নালিশের হোমওয়ার্ক দেওয়া হবে!',
          teacher_female:
            'সালামি দেওয়াটা এখন আপনার জন্য একটি অবলিগেটরি সাবজেক্ট। দুলাভাইরা ফেল করতে না চাইলে এখনই নগদ অর্থ প্রদান করুন।',
          businessman_male:
            'ব্যবসার লাভ-লোকসান যা-ই হোক, সালামি দেওয়া বাধ্যতামূলক! ঈদের দিনে ছোটদের খুশি করাও একটা বড় বিনিয়োগ।',
          businessman_female:
            'ব্যবসার লাভ-লোকসান যা-ই হোক, সালামি দেওয়া বাধ্যতামূলক! ঈদের দিনে ছোটদের খুশি করাও একটা বড় বিনিয়োগ।',
          expat_worker_male:
            'আপনি তো রেমিট্যান্স যোদ্ধা! আপনার ডলার বা রিয়ালের সাথে এবার একটু সালামি যোগ করুন, দেশের ছোটদের ঈদটা রঙিন হয়ে উঠবে।',
          expat_worker_female:
            'আপনি তো রেমিট্যান্স যোদ্ধা! আপনার ডলার বা রিয়ালের সাথে এবার একটু সালামি যোগ করুন, দেশের ছোটদের ঈদটা রঙিন হয়ে উঠবে।',
          student_male:
            'ঈদে আপনার একমাত্র কাজ হলো সালামি আদায় করা। এই রশিদটি ব্যবহার করে বড়দের দেখিয়ে দিন যে এটা আপনার অধিকার!',
          student_female:
            'ঈদে আপনার একমাত্র কাজ হলো সালামি আদায় করা। এই রশিদটি ব্যবহার করে বড়দের দেখিয়ে দিন যে এটা আপনার অধিকার!',
          unemployed_male:
            'যেহেতু আয় নেই, তাই সহানুভূতি সালামি আদায়ের জন্য এই রশিদটি একটি লিগ্যাল ডকুমেন্ট হিসেবে গণ্য হবে।',
          unemployed_female:
            'যেহেতু আয় নেই, তাই সহানুভূতি সালামি আদায়ের জন্য এই রশিদটি একটি লিগ্যাল ডকুমেন্ট হিসেবে গণ্য হবে।',
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
    ngl: {
      create: {
        title: 'আপনার ঈদের চিঠি ইনবক্স তৈরি করুন',
        description: 'গোপন বার্তা পেতে একটি ব্যবহারকারীর নাম এবং পিন সেট করুন।',
        name: {
          label: 'আপনার নাম',
          placeholder: 'যেমন, অনিক আহমেদ',
        },
        username: {
          label: 'একটি ব্যবহারকারীর নাম বাছুন',
          placeholder: 'যেমন, anik_ahmed',
          description:
            'এটি আপনার ইউনিক লিঙ্ক হবে: https://eidvibe.vercel.app/ngl/{username}',
        },
        pin: {
          label: '৪-৬ সংখ্যার একটি পিন সেট করুন',
          placeholder: 'যেমন, ১২৩৪',
          description: 'এটি দিয়ে আপনাকে লগইন করতে হবে। ভুলে যাবেন না!',
        },
        gender: {
          label: 'লিঙ্গ',
          male: 'ছেলে',
          female: 'মেয়ে',
          other: 'অন্যান্য',
        },
        profession: {
          label: 'পেশা',
          placeholder: 'আপনার পেশা নির্বাচন করুন',
        },
        submitButton: 'আমার ইনবক্স তৈরি করুন',
        success: 'ইনবক্স সফলভাবে তৈরি হয়েছে! আপনি এখন লগইন করতে পারেন।',
      },
      login: {
        title: 'আপনার ইনবক্সে প্রবেশ করুন',
        description: 'আপনার বার্তা পড়তে ব্যবহারকারীর নাম এবং পিন লিখুন।',
        username: {
          label: 'ব্যবহারকারীর নাম',
          placeholder: 'আপনার ইউনিক ব্যবহারকারীর নাম',
        },
        pin: {
          label: 'পিন',
          placeholder: 'আপনার গোপন পিন',
        },
        submitButton: 'লগইন করুন',
        error: 'ভুল ব্যবহারকারীর নাম বা পিন।',
        createLink: 'ইনবক্স নেই? এখনই তৈরি করুন!',
      },
      send: {
        title: 'Send an Eid Letter to',
        subtitle: 'Your identity will be kept secret.',
        message: {
          placeholder: 'আমাকে একটি গোপন ঈদ বার্তা বা সালামি আবদার পাঠান!',
          error: 'বার্তা খালি রাখা যাবে না।',
        },
        senderTag: {
          label: 'Choose a secret identity (optional)',
          placeholder: 'একটি ট্যাগ নির্বাচন করুন',
          options: {
            anonymous: 'নাম প্রকাশে অনিচ্ছুক',
            boro_bhai: 'কিপটা বড় ভাই',
            boro_apu: 'দরদী আপু',
            choto_bhai: 'ফাউল ছোট ভাই',
            choto_bon: 'কিউট ছোট বোন',
            shalika: 'বিচ্ছু শ্যালিকা',
            crush: 'গোপন ক্রাশ',
            ex: 'একজন প্রাক্তন',
            friend: 'একজন বন্ধু',
            batchmate: 'ব্যাচমেট',
            senior: 'সিনিয়র',
            junior: 'জুনিয়র',
            colleague: 'সহকর্মী',
          },
        },
        submitButton: 'চিঠি পাঠান',
        getYourOwnButton: 'আপনার নিজের বার্তা পান!',
        orSeparator: 'অথবা',
        success: {
          title: 'বার্তা পাঠানো হয়েছে!',
          description:
            'আপনিও কি গোপন বার্তা পাওয়ার জন্য নিজের ইনবক্স তৈরি করতে চান?',
          cta: 'ইনবক্স তৈরি করুন',
        },
      },
      inbox: {
        title: 'আপনার ঈদের চিঠির ইনবক্স',
        share: {
          title: 'আপনার লিঙ্ক শেয়ার করুন',
          description:
            'বন্ধুদের জানিয়ে দিন কোথায় আপনাকে গোপন ঈদের চিঠি পাঠাতে হবে!',
          shareButton: 'লিঙ্ক শেয়ার করুন',
          copyButton: 'লিঙ্ক কপি করুন',
          linkCopied: 'লিঙ্ক কপি করা হয়েছে!',
        },
        noMessages: 'এখনও কোনো ঈদের চিঠি নেই। কিছু পেতে আপনার লিঙ্ক শেয়ার করুন!',
        replyButton: 'উত্তর দিন ও শেয়ার করুন',
        repliedStatus: 'উত্তর দেওয়া হয়েছে',
        replyModal: {
          title: 'এই বার্তার উত্তর দিন',
          reply: {
            placeholder: 'আপনার উত্তর লিখুন...',
          },
          submitButton: 'নিশ্চিত করুন এবং শেয়ার কার্ড দেখুন',
        },
        shareModal: {
          title: 'আপনার স্টোরিতে শেয়ার করুন',
          description:
            'এই কার্ডটি ডাউনলোড করুন এবং আপনার সোশ্যাল মিডিয়াতে শেয়ার করুন!',
          downloadButton: 'কার্ড ডাউনলোড করুন',
          shareButton: 'স্টোরিতে শেয়ার করুন',
          sharing: 'শেয়ার করা হচ্ছে...',
          shareError: 'স্বয়ংক্রিয়ভাবে শেয়ার করা যায়নি। অনুগ্রহ করে ডাউনলোড করে ম্যানুয়ালি শেয়ার করুন।',
        },
        logout: 'লগআউট',
      },
    },
    eidWheel: {
      title: 'ঈদ প্ল্যানিং লাকি হুইল',
      description: 'চাকা ঘুরিয়ে আপনার ঈদের প্ল্যান জানুন! বন্ধুদের সাথে আপনার ফলাফল শেয়ার করুন।',
      spinButton: 'চাকা ঘোরান',
      name: {
        label: 'আপনার নাম',
        placeholder: 'ঘোরানোর জন্য আপনার নাম লিখুন',
      },
      results: {
        title: "অফিসিয়াল ঈদ প্ল্যান",
        resultFor: "এর জন্য ফলাফল",
        plan: "আপনার ঈদের প্ল্যান",
        downloadButton: "প্ল্যান ডাউনলোড করুন",
        shareButton: "প্ল্যান শেয়ার করুন",
        sharing: "শেয়ার করা হচ্ছে...",
        shareError: "ছবি শেয়ার করা যায়নি, লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে।",
        footerDisclaimer: "বিশেষ দ্রষ্টব্য: এই চাকাটি শুধুমাত্র মজার জন্য এবং এটিকে গুরুত্ব সহকারে নেওয়ার কিছু নেই।",
        backButton: "আবার ঘোরান",
      },
      options: [
        'সালামি কালেকশন: আজ সারাদিন শুধু বড়দের পকেট কাটা।',
        'বিরিয়ানি ডিনার: অন্তত ৩ প্লেট বিরিয়ানি সাবাড় করা।',
        'বিছানা বিলাস: ঈদের দিনও দুপুর পর্যন্ত লম্বা ঘুম।',
        'ঘুরতে যাওয়া: বন্ধুদের সাথে বাইক নিয়ে শহর ভ্রমণ।',
        'মেহমান সামলানো: বাসার সব পিচ্চি মেহমানদের বিজি রাখা।',
        'সালামি ডিস্ট্রিবিউশন: আজ আপনার পকেট থেকে ছোটদের সালামি দিতে হবে।',
        'ক্রাশের সাথে চ্যাট: আজ ক্রাশকে নক দেওয়ার মোক্ষম সুযোগ।',
        'রান্নাঘরে হেল্প: আম্মুকে সেমাই বা পায়েস বানাতে সাহায্য করা।',
        'ফটোশুট সেশন: নতুন পাঞ্জাবি/ড্রেস পরে ১০০টি ছবি তোলা।',
        'মুভি ম্যারাথন: সারারাত জেগে ঈদের নতুন সব নাটক দেখা।',
        'দাওয়াত খাওয়া: আত্মীয়দের বাসায় গিয়ে পেট পুরে খাওয়া।',
        'পুরানো স্মৃতি: স্কুলের বন্ধুদের সাথে আড্ডা দেওয়া।',
        'সিঙ্গেল ঈদ: একা একা হেডফোন লাগিয়ে গান শোনা।',
        'লং ড্রাইভে যাওয়া: ঝমঝম বৃষ্টির মধ্যে ঘুরতে বের হওয়া।',
        'সালামি কুইন/কিং: আজকের সর্বোচ্চ সালামি প্রাপক আপনিই!',
      ],
    },
    iftar: {
      title: 'Iftar & Sehri Spot Finder',
      description: 'Find free Iftar and Sehri spots near you, shared by the community.',
      addSpotButton: 'Add New Spot',
      filter: {
        label: 'Filter by Food',
        all: 'All',
        verified: 'Verified Spots',
      },
      map: {
        loading: 'Loading map...',
        noSpots: 'No spots found for the selected filter. Try another one!',
        popup: {
          verifiedBy: 'যাচাই করেছেন',
          people: 'জন',
          isFake: 'Fake spot?',
          vote: 'Vote',
          distance: "দূরত্ব:",
          kmAway: "কিমি দূরে",
          yourLocation: "আপনি এখানে"
        },
        liveLocationButton: 'আমার অবস্থানে যান',
        geolocationNotSupported: {
          title: 'অবস্থান সমর্থিত নয়',
          description: 'আপনার ব্রাউজার জিওলোকেশন সমর্থন করে না।'
        },
        locationError: {
          title: 'অবস্থান ত্রুটি',
          description: 'আপনার অবস্থান পাওয়া যায়নি। অনুগ্রহ করে লোকেশন সার্ভিস চালু করে আবার চেষ্টা করুন।'
        }
      },
      addSpotDialog: {
        title: 'Add a New Iftar/Sehri Spot',
        description: 'Help the community by sharing a spot. Your entry will be live for 24 hours.',
        masjidName: {
          label: 'Mosque/Spot Name',
          placeholder: 'e.g., Baitul Mukarram Mosque'
        },
        area: {
          label: 'Area / Neighborhood',
          placeholder: 'e.g., Paltan, Dhaka'
        },
        foodType: {
          label: 'Food Type',
          placeholder: 'Select food type'
        },
        otherFoodType: {
          label: 'Specify Other Food',
          placeholder: 'e.g., Fruits, Juice'
        },
        location: {
          label: 'Location',
          description: 'Click on the map to set location or use your current location.',
          useCurrentLocation: 'Use My Current Location',
        },
        endTime: {
            label: 'Food Available Until (Optional)',
            description: 'Time when food distribution ends (24h format).',
            placeholder: 'HH:MM e.g., 18:30',
        },
        submitButton: 'Add Spot',
        submitting: 'Adding...',
        success: 'Spot added successfully!',
        error: 'Failed to add spot. Please try again.'
      },
      foodTypes: {
        'kacchi-biryani': 'Kacchi Biryani',
        'tehari': 'Tehari',
        'khichuri': 'Khichuri (Bhuna/Patla)',
        'polao-korma': 'Polao & Korma',
        'beef-roti': 'Beef & Roti/Rice',
        'chicken-biryani': 'Chicken Biryani/Roast',
        'mutton': 'Mutton',
        'haleem-jilapi': 'Haleem & Jilapi',
        'mixed-iftar': 'Mixed Iftar (Chickpeas, etc.)',
        'sehri-thali': 'Sehri Special Thali',
        'others': 'Others'
      }
    }
  },
};

export type Translation = typeof translations;
