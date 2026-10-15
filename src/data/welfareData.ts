import { WelfareResource } from '../types';

export const WELFARE_RESOURCES: WelfareResource[] = [
  {
    id: 'payment_disputes',
    category: 'rights',
    title: {
      en: 'Payment Disputes: What to Do if Employer Delays or Refuses Pay',
      hi: 'मजदूरी विवाद: यदि मालिक मजदूरी देने में आनाकानी करे तो क्या करें?',
      mr: 'मजुरी वाद: मालकाने मजुरी देण्यास टाळाटाळ केल्यास काय करावे?'
    },
    summary: {
      en: 'Four practical, peaceful steps to resolve wage issues with documentation and mediation.',
      hi: 'शांतिपूर्ण तरीके से और पुख्ता सबूतों के साथ अपनी मेहनत की कमाई पाने के लिए 4 जरूरी कदम।',
      mr: 'शांततेच्या मार्गाने आणि पुराव्यांसह हक्काचे पैसे मिळवण्यासाठी ४ महत्त्वाच्या पायऱ्या.'
    },
    keyDetails: {
      en: [
        'Step 1: Open KAMAI Pehle Pakka terms on your phone and show the exact agreed rate and timestamp to the employer.',
        'Step 2: Take 2-3 clear photos or videos of the finished work and tools on site before leaving the premises.',
        'Step 3: If disagreement persists at evening settlement, immediately call your local Naka Pradhan or senior mistri as a neutral witness.',
        'Step 4: If wages remain unpaid, file an informal report at your nearest Shramik Sahayata Kendra or call the National Labour Helpline (14434).'
      ],
      hi: [
        'कदम 1: अपने फोन पर Pehle Pakka में तय की गई शर्तें, दिहाड़ी और समय मालिक को दिखाएं।',
        'कदम 2: साइट छोड़ने से पहले अपने मोबाइल से किए गए काम और औजारों की 2-3 साफ फोटो खींचकर रख लें।',
        'कदम 3: अगर शाम को हिसाब के समय विवाद हो, तो तुरंत अपने नाका प्रधान या सीनियर मिस्त्री को फोन पर गवाह बनाएं।',
        'कदम 4: यदि फिर भी भुगतान न हो, तो नजदीकी श्रमिक सहायता केंद्र या राष्ट्रीय श्रम हेल्पलाइन (14434) पर शिकायत दर्ज कराएं।'
      ],
      mr: [
        'पायरी १: फोनमधील आधी पक्के करा मधील ठरलेली रोजंदारी व वेळ मालकाला दाखवा.',
        'पायरी २: जागेवरून निघण्यापूर्वी केलेल्या कामाचे २-३ स्पष्ट फोटो मोबाईलमध्ये काढून ठेवा.',
        'पायरी ३: संध्याकाळी पैशांवरून वाद झाल्यास लगेच स्थानिक नाका प्रमुख किंवा ज्येष्ठ कारागिरांशी संपर्क साधा.',
        'पायरी ४: मजुरी न मिळाल्यास कामगार आयुक्त कार्यालयातील श्रमिक कक्षाशी किंवा हेल्पलाईन १४४३४ शी संपर्क करा.'
      ]
    },
    contactOrLink: '14434',
    isPhoneNumber: true,
    cautiousNote: {
      en: 'ILLUSTRATIVE GUIDANCE: Always remain calm and do not engage in physical altercations on site. Preserving work photos and message logs protects your legal wage claim under the Payment of Wages Act.',
      hi: 'सूचनात्मक मार्गदर्शन: साइट पर कभी भी हाथापाई या गाली-गलौज न करें। हमेशा काम की फोटो और बातचीत का रिकॉर्ड सुरक्षित रखें।',
      mr: 'माहिती व मार्गदर्शन: साईटवर कोणताही वाद घालू नका. कामाचे फोटो आणि संवादाचा पुरावा जतन केल्यास मजुरी हक्क सुरक्षित राहतो.'
    }
  },
  {
    id: 'workplace_safety',
    category: 'safety',
    title: {
      en: 'Workplace Safety: Critical Precautions for Construction & Maintenance',
      hi: 'कार्यस्थल सुरक्षा: निर्माण व मरम्मत कार्य में जरूरी सावधानियां',
      mr: 'कार्यस्थळावरील सुरक्षा: बांधकाम व दुरुस्ती कामातील आवश्यक खबरदारी'
    },
    summary: {
      en: 'Every worker has the right to a safe worksite. Simple checks before starting physical tasks.',
      hi: 'हर कारीगर का अधिकार है कि साइट सुरक्षित हो। काम शुरू करने से पहले ये 4 सुरक्षा जांच जरूर करें।',
      mr: 'प्रत्येक कामगाराला सुरक्षित वातावरणात काम करण्याचा हक्क आहे. काम सुरू करण्यापूर्वी ४ सुरक्षा तपासण्या.'
    },
    keyDetails: {
      en: [
        'Heights over 6 feet: Never climb unstable drums or makeshift ladders. Demand a securely tied bamboo/metal scaffold and wear a safety harness belt.',
        'Electrical isolation: Always test wires with an insulated neon tester pen. Ensure the main meter circuit breaker is physically turned off before touching bare conductors.',
        'Dust and eye protection: Wear protective goggles and dust masks when cutting concrete, tile, or granite, or when chipping old plaster.',
        'Footwear on site: Wear thick rubber-soled shoes or gumboots to prevent stepping on rusty nails, sharp broken tiles, and wet cement burns.'
      ],
      hi: [
        '6 फुट से ऊपर का काम: ड्रम या टूटी सीढ़ी पर न चढ़ें। मजबूत मचान (पाड़) और सेफ्टी बेल्ट की मांग करें।',
        'बिजली का काम: तार छूने से पहले टेस्टर से करंट चेक करें और मुख्य एमसीबी बंद रखें।',
        'धूल और आंखों की सुरक्षा: टाइल या पत्थर काटते समय और वेल्डिंग के दौरान चश्मा और मास्क जरूर लगाएं।',
        'मजबूत जूते: साइट पर हमेशा मोटे तलवे वाले जूते या गमबूट पहनें ताकि कील या नुकीले पत्थर से पैर सुरक्षित रहे।'
      ],
      mr: [
        '६ फुटांपेक्षा जास्त उंची: ड्रम किंवा मोडक्या शिडीवर चढू नका. मजबूत पाचा व सेफ्टी बेल्ट वापरा.',
        'विजेचे काम: वायरला हात लावण्यापूर्वी टेस्टरने तपासा आणि मुख्य वीज बंद ठेवा.',
        'डोळ्यांची सुरक्षा: दगड किंवा फरशी कापताना चष्मा व मास्कचा वापर करा.',
        'सुरक्षित बूट: साईटवर नेहमी जाड तळ असलेले बूट वापरा जेणेकरून खिळा किंवा काच टोचणार नाही.'
      ]
    },
    contactOrLink: '112',
    isPhoneNumber: true,
    cautiousNote: {
      en: 'ILLUSTRATIVE GUIDANCE: If an employer refuses to provide mandatory safety equipment for clearly dangerous high-risk work, you have the right to pause and negotiate safe scaffolding before proceeding.',
      hi: 'सूचनात्मक मार्गदर्शन: यदि खतरनाक ऊंचाई या खुली तारों के काम में मालिक सुरक्षा साधन न दे, तो काम रोककर पहले सुरक्षा की मांग करने का आपका अधिकार है।',
      mr: 'माहिती व मार्गदर्शन: धोकादायक कामाच्या ठिकाणी सुरक्षा साधने नसल्यास काम थांबवून प्रथम सुरक्षिततेची मागणी करण्याचा आपल्याला हक्क आहे.'
    }
  },
  {
    id: 'worker_registration',
    category: 'schemes',
    title: {
      en: 'Worker Registration: e-Shram Portal & State BOCW Board Guidance',
      hi: 'श्रमिक पंजीकरण: ई-श्रम पोर्टल और राज्य कर्मकार कल्याण बोर्ड',
      mr: 'कामगार नोंदणी: ई-श्रम पोर्टल आणि राज्य बांधकाम कामगार मंडळ'
    },
    summary: {
      en: 'How informal workers obtain official recognition for social security eligibility.',
      hi: 'असंगठित मजदूरों को सरकारी योजनाओं के लिए राष्ट्रीय पहचान और कार्ड कैसे मिलता है।',
      mr: 'असंघटित कामगारांना शासकीय योजनांसाठी अधिकृत ओळखपत्र कसे मिळते.'
    },
    keyDetails: {
      en: [
        'e-Shram Registration: Free online registration at eshram.gov.in or any nearby Common Service Center (CSC). Requires Aadhaar and an active bank account.',
        'Universal Account Number: Generates a 12-digit UAN valid nationwide across all states.',
        'State BOCW Welfare Boards: Masons, painters, carpenters, and helpers with minimum 90 days construction work proof can register with their state building workers board.',
        'Welfare benefits: Depending on state department guidelines, registered members may be eligible for tool allowances, children educational assistance, and medical relief.'
      ],
      hi: [
        'ई-श्रम रजिस्ट्रेशन: eshram.gov.in या नजदीकी सीएससी (CSC) केंद्र पर पंजीकरण बिल्कुल मुफ्त है। केवल आधार कार्ड और बैंक खाता चाहिए।',
        '12 अंकों का UAN नंबर: यह पहचान पत्र पूरे देश में मान्य रहता है।',
        'राज्य BOCW बोर्ड: 90 दिन निर्माण कार्य करने वाले कारीगर अपने राज्य के सन्निर्माण कर्मकार कल्याण बोर्ड में पंजीकृत हो सकते हैं।',
        'योजना लाभ: राज्य सरकार के नियमों के अनुसार बच्चों की छात्रवृत्ति, औजार सहायता और चिकित्सा सहायता का प्रावधान हो सकता है।'
      ],
      mr: [
        'ई-श्रम नोंदणी: eshram.gov.in किंवा जवळच्या सीएससी केंद्रावर नोंदणी पूर्णपणे मोफत आहे. आधार व बँक खाते आवश्यक.',
        '१२ अंकी UAN ओळखपत्र: संपूर्ण भारतात चालणारे अधिकृत कामगार ओळखपत्र मिळते.',
        'राज्य बांधकाम कामगार मंडळ: ९० दिवस काम केलेल्या कामगारांना मंडळाकडे नोंदणी करता येते.',
        'योजनांचे फायदे: शासकीय नियमांनुसार शैक्षणिक मदत, अवजारे खरेदी अनुदान व वैद्यकीय मदत मिळू शकते.'
      ]
    },
    contactOrLink: 'https://eshram.gov.in',
    isPhoneNumber: false,
    cautiousNote: {
      en: 'ILLUSTRATIVE GUIDANCE: KAMAI provides illustrative information only and does not issue government cards or guarantee benefit payouts. Official eligibility and approvals are strictly determined by the Ministry of Labour and State Labour Departments. Never pay money to private middlemen.',
      hi: 'सूचनात्मक मार्गदर्शन: कमाई (KAMAI) केवल जागरूकता हेतु जानकारी देता है। किसी भी सरकारी कार्ड या योजना का सीधा दावा नहीं करता। आधिकारिक पात्रता केवल सरकारी श्रम विभाग तय करता है। दलालों से सावधान रहें।',
      mr: 'माहिती व मार्गदर्शन: कमाई (KAMAI) केवळ माहिती देण्याचे काम करते. शासकीय ओळखपत्र किंवा लाभ मंजूर करण्याचे अधिकार फक्त कामगार विभागाचे आहेत. कोणत्याही मध्यस्थाला पैसे देऊ नका.'
    }
  },
  {
    id: 'emergency_helplines',
    category: 'helplines',
    title: {
      en: 'Essential Emergency & Labour Helplines (Toll-Free Numbers)',
      hi: 'जरूरी आपातकालीन व श्रम हेल्पलाइन नंबर (टोल-फ्री नंबर)',
      mr: 'तातडीच्या मदतीसाठी आवश्यक टोल-फ्री हेल्पलाईन क्रमांक'
    },
    summary: {
      en: 'Direct official government toll-free numbers for workplace injuries, exploitation, and distress.',
      hi: 'दुर्घटना, उत्पीड़न या आपातकालीन स्थिति में तुरंत मदद के लिए मुफ्त सरकारी हेल्पलाइन नंबर।',
      mr: 'अपघात, फसवणूक किंवा तातडीच्या मदतीसाठी शासकीय टोल-फ्री क्रमांक.'
    },
    keyDetails: {
      en: [
        'National Labour Helpline (Shram Suvidha): 14434 (Multilingual assistance for worker grievances and guidance).',
        'Universal Emergency Response: 112 (Immediate police, fire, or accident assistance across India).',
        'Government Ambulance Service: 108 (Emergency medical transport to nearest district hospital).',
        'National Consumer Helpline: 1915 (For wage exploitation and service disputes).'
      ],
      hi: [
        'राष्ट्रीय श्रम हेल्पलाइन (श्रम सुविधा): 14434 (श्रमिक समस्याओं के लिए मुफ्त सरकारी हेल्पलाइन)।',
        'आपातकालीन सेवा: 112 (पुलिस, दुर्घटना या गंभीर संकट में तुरंत सहायता)।',
        'एंबुलेंस सेवा: 108 (सरकारी अस्पताल ले जाने के लिए मुफ्त एंबुलेंस)।',
        'राष्ट्रीय उपभोक्ता व शिकायत हेल्पलाइन: 1915।'
      ],
      mr: [
        'राष्ट्रीय कामगार हेल्पलाईन (श्रम सुविधा): १४४३४ (कामगार तक्रारींसाठी टोल-फ्री क्रमांक).',
        'सार्वजनिक आपत्कालीन मदत: ११२ (पोलीस, रुग्णवाहिका व संकटकालीन साहाय्य).',
        'रुग्णवाहिका सेवा: १०८ (सरकारी रुग्णालयासाठी मोफत रुग्णवाहिका).',
        'ग्राहक तक्रार निवारण कक्ष: १९१५.'
      ]
    },
    contactOrLink: '14434',
    isPhoneNumber: true,
    cautiousNote: {
      en: 'ILLUSTRATIVE GUIDANCE: Helpline response timings may vary by state and telecom circle. For immediate life-threatening injuries on site, dial 112 or 108 first.',
      hi: 'सूचनात्मक मार्गदर्शन: किसी भी गंभीर दुर्घटना या चोट की स्थिति में सबसे पहले 112 या 108 पर कॉल करें।',
      mr: 'माहिती व मार्गदर्शन: गंभीर दुखापत झाल्यास सर्वप्रथम ११२ किंवा १०८ वर संपर्क साधावा.'
    }
  }
];
