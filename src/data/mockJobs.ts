import { Job } from '../types';

export const INITIAL_MOCK_JOBS: Job[] = [
  {
    id: 'job-mum-001',
    title: {
      en: 'Bathroom Concealed CPVC Pipe Leakage & Valve Repair',
      hi: 'बाथरूम की दीवार में CPVC पाइप लीकेज व वॉल मरम्मत',
      mr: 'बाथरूममधील CPVC पाईप गळती व व्हॉल्व्ह दुरुस्ती'
    },
    tradeId: 'plumber',
    employerName: 'Kailash Mehta (Apartment Resident)',
    employerType: 'homeowner',
    phone: '+91-98765-01001',
    wageAmount: 950,
    wageType: 'per_day',
    paymentTiming: 'cash_at_evening',
    city: 'Mumbai',
    areaId: 'mumbai_dadar',
    areaName: 'Dadar West Naka',
    nakaPoint: 'Dadar Kabutar Khana Naka',
    dateCategory: 'today',
    jobDate: 'Today, 15 Oct',
    timing: '9:00 AM to 5:30 PM',
    durationHours: 8.5,
    durationText: {
      en: '1 Day (8.5 hrs)',
      hi: '1 दिन (8.5 घंटे)',
      mr: '१ दिवस (८.५ तास)'
    },
    toolsSuppliedBy: 'worker',
    toolsDetails: {
      en: 'Worker must bring basic hand tools: pipe wrench, hack saw, and PTFE tape. Replacement pipes and cement provided by owner.',
      hi: 'कारीगर अपना पाइप रिंच, आरी और धागा लाएं। नया पाइप और सीमेंट मालिक देगा।',
      mr: 'कारागिराने स्वतःचे पाईप रिंच व करवत आणावी. नवीन पाईप व सिमेंट मालक देईल.'
    },
    description: {
      en: 'Concealed waterline behind bathroom tiles is leaking into the lower flat. Need urgent detection, tile removal around joint, CPVC union replacement, and waterproof plastering.',
      hi: 'बाथरूम की दीवार के अंदर पाइप से पानी रिसकर नीचे की मंजिल में जा रहा है। लीकेज ढूंढना, टाइल हटाकर नया CPVC यूनियन लगाना और वाटरप्रूफिंग करना।',
      mr: 'बाथरूमच्या भिंतीतील पाईपमधून पाणी गळत आहे. लीकेज शोधून टाईल्स काढून नवीन युनियन बसवणे आणि वॉटरप्रूफिंग करणे.'
    },
    toolsProvided: false,
    chaiLunchProvided: true,
    overtimePaid: true,
    overtimeRatePerHour: 130,
    safetyNotes: {
      en: [
        'Main riser stop-cock must be shut off before cutting water lines',
        'Wear protective eye goggles while chisel cutting bathroom plaster'
      ],
      hi: [
        'पाइप काटने से पहले बिल्डिंग की मुख्य लाइन बंद कर दी जाएगी',
        'टाइल तोड़ते समय आंखों पर सुरक्षा चश्मा जरूर लगाएं'
      ],
      mr: [
        'पाईप कापण्यापूर्वी मुख्य पाणी पुरवठा बंद केला जाईल',
        'टाईल्स फोडताना डोळ्यांवर सेफ्टी चष्मा वापरावा'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 1,
    postedAt: '15 mins ago'
  },
  {
    id: 'job-mum-002',
    title: {
      en: 'Commercial Shop 3-Phase Distribution Board & Circuit Breaker Setup',
      hi: 'दुकान में 3-फेज डिस्ट्रीब्यूशन बोर्ड व MCB वायरिंग',
      mr: 'दुकान ३-फेज डिस्ट्रीब्युशन बोर्ड व सर्किट ब्रेकर वायरिंग'
    },
    tradeId: 'electrician',
    employerName: 'Gaurav Shah (Hardware Store)',
    employerType: 'small_business',
    phone: '+91-98765-01002',
    wageAmount: 1100,
    wageType: 'per_day',
    paymentTiming: 'cash_at_evening',
    city: 'Mumbai',
    areaId: 'mumbai_andheri',
    areaName: 'Andheri West SV Road Naka',
    nakaPoint: 'Andheri SV Road Labour Stand',
    dateCategory: 'today',
    jobDate: 'Today, 15 Oct',
    timing: '10:00 AM to 6:30 PM',
    durationHours: 8.5,
    durationText: {
      en: '1 Day (8.5 hrs)',
      hi: '1 दिन (8.5 घंटे)',
      mr: '१ दिवस (८.५ तास)'
    },
    toolsSuppliedBy: 'worker',
    toolsDetails: {
      en: 'Worker must carry insulation tester/multimeter, wire stripper, and insulated screwdrivers. MCBs, wires, and casing provided.',
      hi: 'इलेक्ट्रीशियन मल्टीमीटर, पेचकस और वायर कटर लाएं। एमसीबी, तार व केसिंग दुकान देगी।',
      mr: 'इलेक्ट्रिशियनने स्वतःचे मल्टीमीटर, स्क्रूड्रायव्हर आणावे. एमसीबी, वायर दुकान देईल.'
    },
    description: {
      en: 'Renovating electrical supply for 600 sq ft retail shop. Splitting single meter line into balanced 3-phase load, installing 8-way TPN distribution board and 12 branch MCBs.',
      hi: 'दुकान की पूरी वायरिंग को संतुलित लोड पर बांटना, 8-वे टीपीएन बोर्ड फिट करना और 12 नई एमसीबी लगाकर कनेक्शन चालू करना।',
      mr: '६०० चौरस फुटांच्या दुकानाची वायरिंग ३-फेजवर विभागणे आणि नवीन बोर्ड व १२ एमसीबी बसवणे.'
    },
    toolsProvided: false,
    chaiLunchProvided: true,
    overtimePaid: true,
    overtimeRatePerHour: 150,
    safetyNotes: {
      en: [
        'Main power at street feeder will remain completely isolated and padlocked during termination',
        'Rubber safety mat and non-conductive fiberglass ladder supplied on site'
      ],
      hi: [
        'तार जोड़ने के समय मुख्य पोल का कनेक्शन पूरी तरह बंद रहेगा',
        'साइट पर रबर मैट और लकड़ी/फाइबर की सुरक्षित सीढ़ी मौजूद है'
      ],
      mr: [
        'काम करताना मुख्य वीज पुरवठा बंद राहील',
        'रबरी मॅट आणि सुरक्षित शिडी उपलब्ध आहे'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 1,
    postedAt: '35 mins ago'
  },
  {
    id: 'job-mum-003',
    title: {
      en: 'Residential Society Compound Wall Brickwork & Sand-Face Plaster',
      hi: 'सोसायटी की बाउंड्री वॉल ईंट जोड़ाई व सैंड-फेस प्लास्टर',
      mr: 'सोसायटी कंपाऊंड भिंत वीटकाम व सँड-फेस गिलावा'
    },
    tradeId: 'mason',
    employerName: 'Dhananjay Parab (Housing Society Secretary)',
    employerType: 'contractor',
    phone: '+91-98765-01003',
    wageAmount: 1200,
    wageType: 'per_day',
    paymentTiming: 'cash_at_evening',
    city: 'Thane (MMR)',
    areaId: 'mumbai_thane',
    areaName: 'Thane Teen Hath Naka',
    nakaPoint: 'Teen Hath Labour Point',
    dateCategory: 'today',
    jobDate: 'Today, 15 Oct',
    timing: '8:30 AM to 5:00 PM',
    durationHours: 8.5,
    durationText: {
      en: '2 Days (Daily payment at 5 PM)',
      hi: '2 दिन का काम (प्रतिदिन शाम 5 बजे भुगतान)',
      mr: '२ दिवसांचे काम (दररोज संध्याकाळी ५ वाजता पेमेंट)'
    },
    toolsSuppliedBy: 'mutual',
    toolsDetails: {
      en: 'Mason brings trowel (kandi), spirit level, plumb line (sahul). Society provides cement mixer helper, buckets, and scaffolding.',
      hi: 'राजमिस्त्री कन्नी, साहुल और सूत साथ लाएं। मसाला घोलने के लिए बेलदार और मचान सोसाइटी देगी।',
      mr: 'गवंड्याने स्वतःची करणी व ओळंबा आणावा. मदतनीस व सिमेंट साहित्य सोसायटी देईल.'
    },
    description: {
      en: 'Repairing 50 ft damaged exterior compound wall. Demolishing weakened brick sections, relaying 9-inch red brickwork, and applying double-coat waterproof sand-face plaster.',
      hi: 'सोसायटी की 50 फुट पुरानी बाउंड्री की मरम्मत। कमजोर ईंटें हटाकर 9 इंच की नई चिनाई और दो कोट वाटरप्रूफ प्लास्टर।',
      mr: 'सोसायटीची ५० फूट जुनी भिंत दुरुस्त करून ९ इंची नवीन वीटकाम व वॉटरप्रूफ गिलावा करणे.'
    },
    toolsProvided: true,
    chaiLunchProvided: true,
    overtimePaid: true,
    overtimeRatePerHour: 160,
    safetyNotes: {
      en: [
        'Hard hat and steel-toe gumboots mandatory in working zone',
        'Scaffolding inspected for firmness; perimeter barricaded from vehicular traffic'
      ],
      hi: [
        'कार्य क्षेत्र में हेलमेट और सेफ्टी जूते पहनना जरूरी है',
        'मचान मजबूत बांधी गई है और सड़क से दूरी बनाकर काम होगा'
      ],
      mr: [
        'काम करताना हेल्मेट व गमबूट घालणे बंधनकारक आहे',
        'पाचा सुरक्षित बांधला असून वाहतुकीचा अडथळा नाही'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 2,
    postedAt: '45 mins ago'
  },
  {
    id: 'job-mum-004',
    title: {
      en: 'Building Terrace Iron Shed Truss Welding & Joint Reinforcement',
      hi: 'बिल्डिंग की छत पर टिन शेड लोहे के ट्रस की वेल्डिंग व मजबूती',
      mr: 'इमारतीच्या गच्चीवर लोखंडी शेड ट्रस वेल्डिंग व मजबुतीकरण'
    },
    tradeId: 'welder',
    employerName: 'Maqsood Fabricators',
    employerType: 'small_business',
    phone: '+91-98765-01004',
    wageAmount: 2400,
    wageType: 'fixed_task',
    paymentTiming: 'immediate_task_end',
    city: 'Mumbai',
    areaId: 'mumbai_chembur',
    areaName: 'Chembur Naka',
    nakaPoint: 'Chembur Naka Point',
    dateCategory: 'today',
    jobDate: 'Today, 15 Oct',
    timing: '9:00 AM to 3:00 PM (Task completion basis)',
    durationHours: 6,
    durationText: {
      en: 'Fixed Task (~6 hrs total)',
      hi: 'तय काम (लगभग 6 घंटे का कुल काम)',
      mr: 'ठरलेले काम (साधारण ६ तास)'
    },
    toolsSuppliedBy: 'employer',
    toolsDetails: {
      en: 'Welding inverter machine (200A), 10 gauge electrodes, angle grinder, cutting discs and extension power board are fully supplied at site.',
      hi: 'वेल्डिंग मशीन, इलेक्ट्रोड, ग्राइंडर और पावर बोर्ड सब कुछ छत पर तैयार मिलेगा।',
      mr: 'वेल्डिंग मशिन, रॉड, ग्राइंडर आणि वीज जोडणी गच्चीवर पूर्ण उपलब्ध आहे.'
    },
    description: {
      en: 'Heavy winds loosened 4 joints on the terrace corrugated sheet framework. Cut corroded MS box pipe angles, align new gusset plates, and apply full weld beads with primer coat.',
      hi: 'छत के टिन शेड के 4 जोड़ों में जंग लग गया है। खराब एंगल काटकर नई प्लेट जोड़ना और मजबूत वेल्डिंग करना।',
      mr: 'गच्चीवरील शेडचे गंजलेले अँगल कापून नवीन वेल्डिंग करून प्राईमर मारणे.'
    },
    toolsProvided: true,
    chaiLunchProvided: true,
    overtimePaid: false,
    safetyNotes: {
      en: [
        'Full body safety harness belt and lifeline tie-off mandatory on roof edge',
        'Automatic darkening welding helmet and heavy leather gloves provided on site'
      ],
      hi: [
        'छत के किनारे काम के लिए सेफ्टी बेल्ट बांधना अनिवार्य है',
        'वेल्डिंग फेस मास्क और चमड़े के दस्ताने साइट पर मिलेंगे'
      ],
      mr: [
        'उंचावर काम करण्यासाठी सेफ्टी बेल्ट बांधणे बंधनकारक आहे',
        'वेल्डिंग मुखवटा व लेदर हातमोजे जागेवर मिळतील'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 1,
    postedAt: '1 hour ago'
  },
  {
    id: 'job-mum-005',
    title: {
      en: 'Demolition Debris & Cement Bag Shifting into Waste Trucks',
      hi: 'फ्लैट का मलबा व सीमेंट कट्टे ट्रक में भरने हेतु बेलदार',
      mr: 'घरातील राडारोडा व सिमेंट पोती ट्रकमध्ये भरण्यासाठी मजूर'
    },
    tradeId: 'labourer',
    employerName: 'Vikram Jadhav (Civil Renovation Contractor)',
    employerType: 'contractor',
    phone: '+91-98765-01005',
    wageAmount: 750,
    wageType: 'per_day',
    paymentTiming: 'cash_at_evening',
    city: 'Mumbai',
    areaId: 'mumbai_kurla',
    areaName: 'Kurla West Station Naka',
    nakaPoint: 'Kurla Pipe Road Labour Point',
    dateCategory: 'today',
    jobDate: 'Today, 15 Oct',
    timing: '8:00 AM to 4:30 PM',
    durationHours: 8.5,
    durationText: {
      en: '1 Day (8.5 hrs)',
      hi: '1 दिन (8.5 घंटे)',
      mr: '१ दिवस (८.५ तास)'
    },
    toolsSuppliedBy: 'employer',
    toolsDetails: {
      en: 'Iron tasla (tubs), shovels, nylon sacks, and wheelbarrows provided by contractor.',
      hi: 'तसले, फावड़े, बोरियां सब ठेकेदार द्वारा साइट पर दिए जाएंगे।',
      mr: 'घमेली, फावडे, गोण्या सर्व कंत्राटदाराकडून पुरवले जातील.'
    },
    description: {
      en: 'Carrying broken plaster, brick rubble, and old floor tiles down from 2nd floor flat to municipal debris truck parked at ground level. Continuous work with 1 hr lunch interval.',
      hi: 'दूसरी मंजिल के फ्लैट से तोड़ा गया मलबा नीचे खड़े डंपर ट्रक तक पहुंचाना। दोपहर 1 से 2 बजे खाने का समय।',
      mr: 'दुसऱ्या मजल्यावरून घराचा राडारोडा खाली उभ्या असलेल्या ट्रकमध्ये भरणे. दुपारी १ तास जेवणाची सुट्टी.'
    },
    toolsProvided: true,
    chaiLunchProvided: true,
    overtimePaid: true,
    overtimeRatePerHour: 100,
    safetyNotes: {
      en: [
        'Heavy-duty rubber-coated grip gloves and dust respirators provided',
        'Staircase handrail kept clear; clean drinking water refill station on 2nd floor'
      ],
      hi: [
        'धूल से बचने के लिए मास्क और काम के मजबूत दस्ताने मिलेंगे',
        'पीने का ठंडा पानी साइट पर मौजूद है'
      ],
      mr: [
        'हातांचे मोजे व धूळ मास्क कंत्राटदार देईल',
        'पिण्याचे स्वच्छ पाणी उपलब्ध आहे'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 4,
    postedAt: '1.2 hours ago'
  },
  {
    id: 'job-mum-006',
    title: {
      en: '1BHK Interior Putty Sanding & Acrylic Emulsion Double-Coat Painting',
      hi: '1BHK फ्लैट में दीवार पुट्टी घिसाई व 2 कोट पेंटिंग',
      mr: '१BHK फ्लॅटमध्ये पुट्टी घासणे व २ हात ॲक्रेलिक रंगकाम'
    },
    tradeId: 'painter',
    employerName: 'Dr. Shruti Sen (Homeowner)',
    employerType: 'homeowner',
    phone: '+91-98765-01006',
    wageAmount: 950,
    wageType: 'per_day',
    paymentTiming: 'upi_at_evening',
    city: 'Mumbai',
    areaId: 'mumbai_bandra',
    areaName: 'Bandra West (Pali Naka)',
    nakaPoint: 'Pali Naka Junction Point',
    dateCategory: 'today',
    jobDate: 'Today, 15 Oct',
    timing: '9:00 AM to 6:00 PM',
    durationHours: 9,
    durationText: {
      en: '2 Days (Daily payment ₹950/day)',
      hi: '2 दिन का काम (रोजाना ₹950 शाम को)',
      mr: '२ दिवसांचे काम (दररोज ₹९५० संध्याकाळी)'
    },
    toolsSuppliedBy: 'worker',
    toolsDetails: {
      en: 'Painter brings sanding discs (pattra), putty knives, 4-inch & 9-inch rollers. Paint, primer, plastic floor cover sheets provided by owner.',
      hi: 'पेंटर पुट्टी पत्ती, रोलर व रेगमार लाएं। पेंट, प्राइमर व फर्श पर बिछाने की पन्नी मालिक देगा।',
      mr: 'पेंटरने स्वतःचे रोलर, पुट्टी पट्टी व सँडपेपर आणावे. रंग व प्राईमर मालक देईल.'
    },
    description: {
      en: 'Vacant 1BHK apartment in Pali Naka. Preparing living room and bedroom walls, scraping minor bubbling spots, applying wall primer, and rolling 2 coats of Asian Paints Royale Matte.',
      hi: 'खाली फ्लैट में हॉल और बेडरूम की दीवारों पर प्राइमर लगाना और 2 हाथ प्लास्टिक पेंट करना। खिड़की और फर्श पर पेंट नहीं गिरना चाहिए।',
      mr: 'रिकाम्या फ्लॅटमध्ये हॉल आणि बेडरूमच्या भिंतींना प्राईमर मारून २ हात चांगला रंग देणे.'
    },
    toolsProvided: false,
    chaiLunchProvided: false,
    overtimePaid: true,
    overtimeRatePerHour: 140,
    safetyNotes: {
      en: [
        'All ceiling fans and exhaust windows must remain turned on for thorough air ventilation',
        'Owner covers lunch allowance with extra ₹100 cash'
      ],
      hi: [
        'कमरे में हवा के लिए पंखे और खिड़कियां खुली रहेंगी',
        'दोपहर के खाने के लिए अलग से ₹100 नकद दिए जाएंगे'
      ],
      mr: [
        'खिडक्या व पंखे चालू ठेवले जातील',
        'जेवणासाठी स्वतंत्र ₹१०० रोख दिले जातील'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 2,
    postedAt: '1.5 hours ago'
  },
  {
    id: 'job-mum-007',
    title: {
      en: 'Modular Kitchen Soft-Close Hinges, Drawer Channels & Handle Replacement',
      hi: 'मॉड्यूलर किचन के कब्ज़े, दराज़ के चैनल और हैंडल बदलना',
      mr: 'मॉड्युलर किचनचे बिजागऱ्या, ड्रॉवर चॅनेल व हँडल बसवणे'
    },
    tradeId: 'carpenter',
    employerName: 'Sanjay Borkar (Interior Works)',
    employerType: 'contractor',
    phone: '+91-98765-01007',
    wageAmount: 1150,
    wageType: 'per_day',
    paymentTiming: 'cash_at_evening',
    city: 'Mumbai',
    areaId: 'mumbai_borivali',
    areaName: 'Borivali East Labour Chowk',
    nakaPoint: 'Borivali Kasturba Labour Stand',
    dateCategory: 'tomorrow',
    jobDate: 'Tomorrow, 16 Oct',
    timing: '9:30 AM to 6:00 PM',
    durationHours: 8.5,
    durationText: {
      en: '1 Day (8.5 hrs)',
      hi: '1 दिन (8.5 घंटे)',
      mr: '१ दिवस (८.५ तास)'
    },
    toolsSuppliedBy: 'worker',
    toolsDetails: {
      en: 'Carpenter brings cordless drill machine, hinge cutter bits, screwdrivers, and chisel. Hardware fittings (Hettich hinges, Telescopic channels) provided by contractor.',
      hi: 'बढ़ई अपनी ड्रिल मशीन, कटर बिट्स और पेचकस लाएं। नए कब्ज़े और चैनल ठेकेदार देगा।',
      mr: 'सुताराने स्वतःचे ड्रिल मशिन व स्क्रूड्रायव्हर आणावे. नवीन बिजागऱ्या मालक देईल.'
    },
    description: {
      en: 'Renovating 12 kitchen cabinet shutters with soft-close hinges, replacing 4 rusted ball-bearing drawer channels with telescopic runners, and fitting stainless steel bar handles.',
      hi: 'रसोई की अलमारियों में नए सॉफ्ट-क्लोज कब्ज़े लगाना, 4 खराब दराज़ों में नए चैनल बैठाना और हैंडल कसना।',
      mr: 'किचनच्या कपाटांना नवीन बिजागऱ्या लावणे आणि ४ ड्रॉवर्सचे चॅनेल व्यवस्थित बसवणे.'
    },
    toolsProvided: false,
    chaiLunchProvided: true,
    overtimePaid: true,
    overtimeRatePerHour: 160,
    safetyNotes: {
      en: [
        'Ear protection plugs and eye safety glasses provided for high-speed drill work',
        'Strictly no smoking inside interior wooden flat'
      ],
      hi: [
        'ड्रिलिंग के समय कान और आंखों की सुरक्षा का ध्यान रखें',
        'फ्लैट के अंदर बीड़ी-सिगरेट पीना सख्त मना है'
      ],
      mr: [
        'ड्रिलिंग करताना डोळ्यांवर चष्मा वापरावा',
        'घरामध्ये धुम्रपान करण्यास सक्त मनाई आहे'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 1,
    postedAt: '2 hours ago'
  },
  {
    id: 'job-mum-008',
    title: {
      en: 'Granite Kitchen Countertop Cutting & Stainless Steel Sink Under-Mount Fitting',
      hi: 'ग्रेनाइट किचन स्लैब कटिंग व सिंक फिटिंग',
      mr: 'किचन ग्रॅनाइट स्लॅब कटिंग व सिंक बसवणे'
    },
    tradeId: 'tiles_mistri',
    employerName: 'Manish Chheda (Flat Owner)',
    employerType: 'homeowner',
    phone: '+91-98765-01008',
    wageAmount: 1800,
    wageType: 'fixed_task',
    paymentTiming: 'immediate_task_end',
    city: 'Mumbai',
    areaId: 'mumbai_ghatkopar',
    areaName: 'Ghatkopar East Metro Point',
    nakaPoint: 'Ghatkopar Station Road Point',
    dateCategory: 'tomorrow',
    jobDate: 'Tomorrow, 16 Oct',
    timing: '10:00 AM to 4:00 PM',
    durationHours: 6,
    durationText: {
      en: 'Fixed Task (~6 hrs)',
      hi: 'तय काम (लगभग 6 घंटे)',
      mr: 'ठरलेले काम (६ तास)'
    },
    toolsSuppliedBy: 'worker',
    toolsDetails: {
      en: 'Tile/Granite mistri must bring 4-inch heavy angle cutter, diamond cutting disc, water spray bottle, and silicone gun. Epoxy adhesive provided.',
      hi: 'मिस्त्री अपना कटर, डायमंड ब्लेड और सिलिकॉन गन लाएं। चिपकाने का केमिकल मालिक देगा।',
      mr: 'मिस्त्रीने कटर, डायमंड पाते व सिलिकॉन गन आणावी. केमिकल मालक देईल.'
    },
    description: {
      en: 'Cut oval opening in 18mm Black Galaxy granite platform for 24x18 inch stainless steel sink. Chamfer edges, epoxy glue under-mount sink, and seal joints with silicone sealant.',
      hi: 'रसोई के काले ग्रेनाइट पत्थर में सिंक की सटीक कटिंग, किनारों की घिसाई और सिंक को वाटरप्रूफ सील करके जमाना।',
      mr: 'किचनच्या काळ्या ग्रॅनाइट दगडामध्ये सिंकसाठी अचूक कटिंग करणे आणि वॉटरप्रूफ बसवणे.'
    },
    toolsProvided: false,
    chaiLunchProvided: true,
    overtimePaid: false,
    safetyNotes: {
      en: [
        'Wet-cutting method mandatory to suppress silica dust',
        'N95 dust mask provided on site by homeowner'
      ],
      hi: [
        'धूल न उड़े इसके लिए पानी डालकर कटिंग करना अनिवार्य है',
        'N95 मास्क साइट पर दिया जाएगा'
      ],
      mr: [
        'धूळ उडू नये म्हणून पाणी टाकून कटिंग करावी',
        'N95 मास्क जागेवर दिला जाईल'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 1,
    postedAt: '2.5 hours ago'
  },
  {
    id: 'job-mum-009',
    title: {
      en: 'Post-Renovation 2BHK Deep Cleaning & Acid Tile Scrubbing',
      hi: 'मकान बनने के बाद 2BHK फ्लैट की डीप क्लीनिंग व फर्श धुलाई',
      mr: 'नवीन बांधकामानंतर २BHK घराची सखोल स्वच्छता व फरशी घासणे'
    },
    tradeId: 'cleaner',
    employerName: 'Pratibha Joshi (Homeowner)',
    employerType: 'homeowner',
    phone: '+91-98765-01009',
    wageAmount: 1400,
    wageType: 'fixed_task',
    paymentTiming: 'immediate_task_end',
    city: 'Mumbai',
    areaId: 'mumbai_malad',
    areaName: 'Malad West Marve Road Naka',
    nakaPoint: 'Marve Junction Labour Point',
    dateCategory: 'today',
    jobDate: 'Today, 15 Oct',
    timing: '9:30 AM to 4:30 PM',
    durationHours: 7,
    durationText: {
      en: 'Fixed Task (~7 hrs total for 2 cleaners)',
      hi: 'तय काम (7 घंटे में पूरा फ्लैट)',
      mr: 'ठरलेले काम (७ तास)'
    },
    toolsSuppliedBy: 'employer',
    toolsDetails: {
      en: 'Cleaning chemicals (mild tile cleaner, Harpic, glass spray), mops, wipers, wire scrubbers, and bucket provided by owner.',
      hi: 'फर्श साफ करने की दवा, हार्पिक, वाइपर, पोछा और बाल्टी सब मालिक देगा।',
      mr: 'फरशी स्वच्छ करण्याचे लिक्विड, वायपर, बादली सर्व साहित्य मालक देईल.'
    },
    description: {
      en: 'Renovation just finished. Need thorough scrubbing of cement/paint stains from vitrified tiles, bathroom sanitary fixtures, kitchen granite, and sliding window glass tracks.',
      hi: 'मकान में काम खत्म हुआ है। फर्श से पेंट और सीमेंट के दाग हटाना, बाथरूम की धुलाई और खिड़कियों के कांच व चैनल साफ करना।',
      mr: 'घराचे काम पूर्ण झाले असून फरशीवरील रंगाचे व सिमेंटचे डाग काढणे आणि खिडक्यांची स्वच्छता करणे.'
    },
    toolsProvided: true,
    chaiLunchProvided: true,
    overtimePaid: false,
    safetyNotes: {
      en: [
        'Heavy rubber household gloves provided for handling tile cleaning agents',
        'Adequate window ventilation must be kept open during floor scrubbing'
      ],
      hi: [
        'सफाई की दवा से हाथ बचाने के लिए रबर के लंबे दस्ताने दिए जाएंगे',
        'काम के दौरान कमरे की खिड़कियां खुली रखें'
      ],
      mr: [
        'हात सुरक्षित राहण्यासाठी लांब रबरी मोजे दिले जातील',
        'काम करताना खिडक्या उघड्या ठेवाव्यात'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 2,
    postedAt: '3 hours ago'
  },
  {
    id: 'job-mum-010',
    title: {
      en: 'Corporate Office Ceiling LED Panel Light Installation & Inverter Wiring',
      hi: 'ऑफिस की फॉल्स सीलिंग में LED लाइट व इन्वर्टर फिटिंग',
      mr: 'कार्यालयाच्या सिलिंगमध्ये LED दिवे व इन्व्हर्टर वायरिंग'
    },
    tradeId: 'electrician',
    employerName: 'Apex Business Hub (Facility Manager)',
    employerType: 'small_business',
    phone: '+91-98765-01010',
    wageAmount: 140,
    wageType: 'per_hour',
    paymentTiming: 'cash_at_evening',
    city: 'Navi Mumbai',
    areaId: 'mumbai_vashi',
    areaName: 'Vashi Plaza Naka (Navi Mumbai)',
    nakaPoint: 'Vashi Sector 17 Labour Stand',
    dateCategory: 'tomorrow',
    jobDate: 'Tomorrow, 16 Oct',
    timing: '11:00 AM to 7:00 PM (8 hrs minimum guaranteed)',
    durationHours: 8,
    durationText: {
      en: '8 Hours (Paid hourly at ₹140/hr = ₹1,120 minimum)',
      hi: '8 घंटे (प्रति घंटा ₹140 = ₹1,120 न्यूनतम तय)',
      mr: '८ तास (ताशी ₹१४० = किमान ₹१,१२० हमी)'
    },
    toolsSuppliedBy: 'worker',
    toolsDetails: {
      en: 'Electrician carries standard wire strippers, crimping tool, test pen, and insulating tape. LED panels and wiring clips supplied by company.',
      hi: 'इलेक्ट्रीशियन अपना टेस्टर, कटर और इंसुलेशन टेप लाएं। लाइट और वायर कंपनी देगी।',
      mr: 'इलेक्ट्रिशियनने टेस्टर, कटर आणावे. दिवे व वायर कंपनी पुरवेल.'
    },
    description: {
      en: 'Fitting 16 slim 2x2 LED ceiling panels into gypsum false ceiling grid and routing dedicated battery inverter lines to reception computers. Payment calculated per hour worked.',
      hi: 'फॉल्स सीलिंग में 16 LED पैनल लगाना और रिसेप्शन के कंप्यूटरों के लिए अलग इन्वर्टर की लाइन जोड़ना। प्रति घंटा ₹140 की दर से शाम को भुगतान।',
      mr: 'सिलिंगमध्ये १६ LED दिवे बसवणे आणि इन्व्हर्टर जोडणी करणे. कामाच्या तासांनुसार संध्याकाळी हिशोब.'
    },
    toolsProvided: false,
    chaiLunchProvided: true,
    overtimePaid: true,
    overtimeRatePerHour: 180,
    safetyNotes: {
      en: [
        'All work performed on 6 ft A-frame non-slip aluminum ladder',
        'Sub-main breaker switched off and tagged before cutting ceiling wires'
      ],
      hi: [
        'काम करने के लिए मजबूत एल्युमिनियम सीढ़ी दी जाएगी',
        'तार जोड़ने से पहले मेन स्विच बंद रखा जाएगा'
      ],
      mr: [
        'काम करण्यासाठी सुरक्षित ॲल्युमिनियम शिडी दिली जाईल',
        'काम करताना मुख्य वीज बंद ठेवली जाईल'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 1,
    postedAt: '3.5 hours ago'
  },
  {
    id: 'job-mum-011',
    title: {
      en: 'Terrace Brick Bat Coba Water-Proofing & Sloping Mortar Layer',
      hi: 'छत पर ब्रिक बैट कोबा वाटरप्रूफिंग व ढलान मसाला लेयर',
      mr: 'गच्चीवर ब्रिक बॅट कोबा वॉटरप्रूफिंग व सिमेंट गिलावा'
    },
    tradeId: 'mason',
    employerName: 'Sunil Shinde (Contractor)',
    employerType: 'contractor',
    phone: '+91-98765-01011',
    wageAmount: 1150,
    wageType: 'per_day',
    paymentTiming: 'weekly_saturday',
    city: 'Mumbai',
    areaId: 'mumbai_mulund',
    areaName: 'Mulund West LBS Marg Naka',
    nakaPoint: 'Mulund Check Naka Point',
    dateCategory: 'tomorrow',
    jobDate: 'Tomorrow, 16 Oct',
    timing: '8:30 AM to 5:30 PM',
    durationHours: 9,
    durationText: {
      en: '3-4 Days (Weekly Saturday payment + daily evening cash advances available)',
      hi: '3-4 दिन का काम (शनिवार को पूरा हिसाब, रोज शाम को खुराक एडवांस उपलब्ध)',
      mr: '३-४ दिवसांचे काम (शनिवारी पूर्ण हिशोब, रोज संध्याकाळी उचल मिळेल)'
    },
    toolsSuppliedBy: 'mutual',
    toolsDetails: {
      en: 'Mason brings trowel and level pipe. Contractor provides cement mixer, broken brick ballast, waterproofing chemicals (Dr. Fixit), and helpers.',
      hi: 'मिस्त्री कन्नी और लेवल पाइप लाएं। ईंट के टुकड़े, सीमेंट और डॉक्टर फिक्सिट केमिकल ठेकेदार देगा।',
      mr: 'कारागिराने करणी व लेव्हल पाईप आणावी. सिमेंट, खडी व वॉटरप्रूफिंग केमिकल कंत्राटदार देईल.'
    },
    description: {
      en: 'Rooftop slab waterproofing to stop monsoon leakage. Laying broken burnt clay bricks, grouting with cement slurry mixed with waterproofing compound, and finishing with neat IPS cement topping towards rainwater downpipes.',
      hi: 'बरसात का पानी रोकने के लिए छत पर पक्की ईंट के टुकड़े बिछाकर केमिकल घोल भरना और बारिश के पाइप की तरफ सही ढलान बनाकर फिनिशिंग करना।',
      mr: 'गच्चीवरील गळती रोखण्यासाठी ब्रिक बॅट कोबा करून पाण्याचा योग्य उतार देणे.'
    },
    toolsProvided: true,
    chaiLunchProvided: true,
    overtimePaid: true,
    overtimeRatePerHour: 150,
    safetyNotes: {
      en: [
        'Parapet wall is 3.5 ft high; workers must not stand on coping',
        'Sun protection shade net erected over mixing area; electrolyte ORS drinks provided'
      ],
      hi: [
        'छत की मुंडेर पर खड़े होकर काम न करें',
        'धूप से बचाव के लिए शेड और पीने का ओआरएस पानी साइट पर उपलब्ध है'
      ],
      mr: [
        'गच्चीच्या कठड्यावर उभे राहून काम करू नये',
        'उन्हापासून संरक्षणासाठी शेड व पिण्याचे पाणी उपलब्ध आहे'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 2,
    postedAt: '4 hours ago'
  },
  {
    id: 'job-mum-012',
    title: {
      en: 'Bedroom Sliding Wardrobe Roller Bearings & Bottom Track Repair',
      hi: 'अलमारी के स्लाइडिंग दरवाजों के बैरिंग व निचला ट्रैक ठीक करना',
      mr: 'कपाटाचे सरकते दरवाजे, रोलर बेअरिंग व ट्रॅक दुरुस्ती'
    },
    tradeId: 'carpenter',
    employerName: 'Farooq Merchant (Resident)',
    employerType: 'homeowner',
    phone: '+91-98765-01012',
    wageAmount: 850,
    wageType: 'per_day',
    paymentTiming: 'cash_at_evening',
    city: 'Mumbai',
    areaId: 'mumbai_byculla',
    areaName: 'Byculla Mustafa Bazar Point',
    nakaPoint: 'Mustafa Bazar Timber Stand',
    dateCategory: 'today',
    jobDate: 'Today, 15 Oct',
    timing: '10:00 AM to 5:00 PM',
    durationHours: 7,
    durationText: {
      en: '1 Day (7 hrs)',
      hi: '1 दिन (7 घंटे)',
      mr: '१ दिवस (७ तास)'
    },
    toolsSuppliedBy: 'worker',
    toolsDetails: {
      en: 'Carpenter brings hand planer, screwdrivers, Allen keys, and silicon lubricant spray. Replacement roller sets provided by owner.',
      hi: 'बढ़ई रंदा, पेचकस और एलन की लाएं। नए रोलर के सेट मालिक देगा।',
      mr: 'सुताराने रंधा व स्क्रूड्रायव्हर आणावे. नवीन रोलर मालक देईल.'
    },
    description: {
      en: 'Three heavy ply sliding wardrobe doors are stuck and jumping out of bottom aluminum channel. Dismount shutters, replace worn-out nylon rollers with heavy ball bearings, and level bottom rail.',
      hi: 'अलमारी के 3 भारी स्लाइडिंग दरवाजे अटक रहे हैं। दरवाजे उतारकर नए रोलर लगाना और चैनल को सीधा करना।',
      mr: 'कपाटाचे ३ सरकते दरवाजे अडकत आहेत. ते काढून नवीन रोलर बसवणे व ट्रॅक व्यवस्थित करणे.'
    },
    toolsProvided: false,
    chaiLunchProvided: true,
    overtimePaid: false,
    safetyNotes: {
      en: [
        'Wardrobe shutters are heavy (approx 25 kg); owner helper assists during shutter lifting',
        'Flooring protected with soft blanket under dismantled doors'
      ],
      hi: [
        'दरवाजे भारी हैं, उठाने के लिए घर का लड़का साथ में मदद करेगा',
        'फर्श पर खरोंच न आए इसलिए नीचे कंबल बिछाया जाएगा'
      ],
      mr: [
        'दरवाजे जड असल्यामुळे उचलण्यासाठी मदतीला माणूस दिला जाईल',
        'फरशीवर डाग पडू नये म्हणून चादर अंथरली जाईल'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 1,
    postedAt: '4.5 hours ago'
  },
  {
    id: 'job-mum-013',
    title: {
      en: 'Window Safety Grills Wire Brushing, Red Oxide Primer & Enamel Paint',
      hi: 'खिड़की की लोहे की ग्रिल से जंग छुड़ाना, रेड ऑक्साइड व पेंट',
      mr: 'खिडकीच्या लोखंडी ग्रिलचे गंज काढणे, रेड ऑक्साईड व रंगकाम'
    },
    tradeId: 'painter',
    employerName: 'Subhash Kadam (Society Member)',
    employerType: 'homeowner',
    phone: '+91-98765-01013',
    wageAmount: 900,
    wageType: 'per_day',
    paymentTiming: 'cash_at_evening',
    city: 'Mumbai',
    areaId: 'mumbai_dadar',
    areaName: 'Dadar West Naka',
    nakaPoint: 'Dadar Kabutar Khana Naka',
    dateCategory: 'tomorrow',
    jobDate: 'Tomorrow, 16 Oct',
    timing: '9:00 AM to 5:00 PM',
    durationHours: 8,
    durationText: {
      en: '1 Day (8 hrs)',
      hi: '1 दिन (8 घंटे)',
      mr: '१ दिवस (८ तास)'
    },
    toolsSuppliedBy: 'worker',
    toolsDetails: {
      en: 'Painter brings wire brushes, 2-inch and 1-inch flat brushes, and sandpaper. Paint, thinner, and red oxide primer provided by owner.',
      hi: 'पेंटर लोहे का तार वाला ब्रश और पेंटिंग ब्रश लाएं। रेड ऑक्साइड, पेंट और थिनर मालिक देगा।',
      mr: 'पेंटरने स्वतःचे ब्रश आणावे. रेड ऑक्साईड, रंग व थिनर मालक देईल.'
    },
    description: {
      en: 'Four exterior box-type window grills exposed to sea breeze have surface rust. Thorough wire brushing down to bare metal, 1 coat of anti-rust zinc chromate primer, and 1 topcoat of dark brown synthetic enamel.',
      hi: '4 खिड़कियों की लोहे की ग्रिल पर जंग लगा है। तार के ब्रश से जंग छुड़ाना, रेड ऑक्साइड का 1 हाथ और ब्राउन रंग लगाना।',
      mr: '४ खिडक्यांच्या लोखंडी ग्रिलचा गंज घासून काढून रेड ऑक्साईड व ब्राऊन रंग मारणे.'
    },
    toolsProvided: false,
    chaiLunchProvided: true,
    overtimePaid: true,
    overtimeRatePerHour: 120,
    safetyNotes: {
      en: [
        'First floor windows reachable from inside room; no hazardous exterior hanging required',
        'Protective dust glasses and face mask provided'
      ],
      hi: [
        'कमरे के अंदर से ही पूरा हाथ पहुंच जाता है, बाहर लटकने की जरूरत नहीं है',
        'धूल और पेंट की गंध से बचने के लिए मास्क दिया जाएगा'
      ],
      mr: [
        'खोलीतूनच काम करता येईल, बाहेर लटकण्याची गरज नाही',
        'धूळ व वासापासून संरक्षणासाठी मास्क दिला जाईल'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 1,
    postedAt: '5 hours ago'
  },
  {
    id: 'job-mum-014',
    title: {
      en: 'Sand & Gravel Sifting and Machine Mortar Mixing for Compound Flooring',
      hi: 'फर्श के लिए रेत छानना व कंक्रीट मिक्सर चलाना',
      mr: 'फरशीसाठी वाळू चाळणे व कंक्रीट मिश्रण तयार करणे'
    },
    tradeId: 'labourer',
    employerName: 'Naresh Bhai Patel (Builder)',
    employerType: 'contractor',
    phone: '+91-98765-01014',
    wageAmount: 700,
    wageType: 'per_day',
    paymentTiming: 'cash_at_evening',
    city: 'Mumbai',
    areaId: 'mumbai_kurla',
    areaName: 'Kurla West Station Naka',
    nakaPoint: 'Kurla Pipe Road Labour Point',
    dateCategory: 'today',
    jobDate: 'Today, 15 Oct',
    timing: '8:30 AM to 5:00 PM',
    durationHours: 8.5,
    durationText: {
      en: '1 Day (8.5 hrs)',
      hi: '1 दिन (8.5 घंटे)',
      mr: '१ दिवस (८.५ तास)'
    },
    toolsSuppliedBy: 'employer',
    toolsDetails: {
      en: 'Large wire mesh sifter, shovels, wheelbarrows, and mixing motor machine supplied at site.',
      hi: 'रेत छानने का बड़ा झरना, फावड़े, तसले सब साइट पर मौजूद हैं।',
      mr: 'वाळू चाळण्याची मोठी जाळी, फावडे व सर्व अवजारे साईटवर आहेत.'
    },
    description: {
      en: 'Sifting 2 truckloads of river sand to remove pebbles, loading aggregate into one-bag concrete mixer, and wheeling fresh mortar mix to masons paving the residential driveway.',
      hi: 'रेत को झरने से छानना, मिक्सर मशीन में सीमेंट और बजरी डालकर मसाला बनाना और मिस्त्रियों तक तसलों में पहुंचाना।',
      mr: 'वाळू चाळून कंक्रीट मशिनमध्ये मसाला तयार करणे आणि गवंड्यांपर्यंत पोहोचवणे.'
    },
    toolsProvided: true,
    chaiLunchProvided: true,
    overtimePaid: true,
    overtimeRatePerHour: 110,
    safetyNotes: {
      en: [
        'Safety helmet, protective cotton gloves, and eye safety visor provided',
        'Cool drinking water and electrolyte glucose available at contractor shed'
      ],
      hi: [
        'हेलमेट और कपड़े के दस्ताने दिए जाएंगे',
        'पीने का ठंडा पानी और ग्लूकोज साइट पर उपलब्ध है'
      ],
      mr: [
        'हेल्मेट व हातमोजे दिले जातील',
        'पिण्याचे स्वच्छ पाणी व ग्लुकोज उपलब्ध आहे'
      ]
    },
    completenessState: 'complete',
    isFictionalDemo: true,
    vacancies: 3,
    postedAt: '5.5 hours ago'
  }
];
