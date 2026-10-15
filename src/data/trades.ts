import { Trade } from '../types';

export const TRADES: Trade[] = [
  {
    id: 'plumber',
    name: {
      en: 'Plumber',
      hi: 'प्लम्बर (नल व पाइप)',
      mr: 'प्लंबर (नळ कारागीर)'
    },
    subtitle: {
      en: 'Pipe fitting, leakage, bathroom sanitary',
      hi: 'पाइप फिटिंग, लीकेज, नल-टंकी मरम्मत',
      mr: 'पाईप फिटिंग, गळती दुरुस्ती, नळकाम'
    },
    iconName: 'Wrench',
    category: 'maintenance',
    avgDailyRate: { min: 700, max: 950 }
  },
  {
    id: 'electrician',
    name: {
      en: 'Electrician',
      hi: 'इलेक्ट्रीशियन (बिजली मिस्त्री)',
      mr: 'इलेक्ट्रिशियन (वीज कारागीर)'
    },
    subtitle: {
      en: 'Wiring, switchboard, motor, MCB repair',
      hi: 'वायरिंग, बोर्ड फिटिंग, मोटर, पंखा रिपेयर',
      mr: 'वायरिंग, स्विच बोर्ड, मोटर, दुरुस्ती'
    },
    iconName: 'Zap',
    category: 'maintenance',
    avgDailyRate: { min: 750, max: 1000 }
  },
  {
    id: 'mason',
    name: {
      en: 'Mason / Rajmistri',
      hi: 'राजमिस्त्री (चिनाई व प्लास्टर)',
      mr: 'गवंडी (बांधकाम कारागीर)'
    },
    subtitle: {
      en: 'Brickwork, plaster, concrete slab, boundary',
      hi: 'ईंट की जोड़ाई, प्लास्टर, लेंटर, फर्श काम',
      mr: 'वीटकाम, गिलावा, स्लॅब, पाया बांधकाम'
    },
    iconName: 'Hammer',
    category: 'construction',
    avgDailyRate: { min: 850, max: 1200 }
  },
  {
    id: 'labourer',
    name: {
      en: 'Daily Wage Labourer (Beldar)',
      hi: 'दैनिक मजदूर (बेलदार / हेल्पर)',
      mr: 'दैनिक मजूर (मदतनीस / बेलदार)'
    },
    subtitle: {
      en: 'Lifting, digging, mixing concrete, loading',
      hi: 'सामान उठाना, खुदाई, मसाला बनाना, लोडिंग',
      mr: 'ओझे उचलणे, खोदकाम, सिमेंट मिश्रण, हमाली'
    },
    iconName: 'HardHat',
    category: 'construction',
    avgDailyRate: { min: 550, max: 700 }
  },
  {
    id: 'painter',
    name: {
      en: 'Painter',
      hi: 'पेंटर (पुट्टी व रंगाई)',
      mr: 'पेंटर (रंगकाम कारागीर)'
    },
    subtitle: {
      en: 'Wall putty, primer, emulsion, exterior paint',
      hi: 'दीवार पुट्टी, प्राइमर, डिस्टेंपर, बाहरी रंग',
      mr: 'पुट्टी भरणे, प्राईमर, वॉटरप्रूफिंग, रंगकाम'
    },
    iconName: 'Paintbrush',
    category: 'finishing',
    avgDailyRate: { min: 700, max: 950 }
  },
  {
    id: 'carpenter',
    name: {
      en: 'Carpenter',
      hi: 'बढ़ई (लकड़ी व प्लाईवुड)',
      mr: 'सुतार (लाकडी काम कारागीर)'
    },
    subtitle: {
      en: 'Door, window, modular wardrobe, lock fitting',
      hi: 'दरवाजे, खिड़की, अलमारी, लॉक रिपेयर',
      mr: 'दरवाजा, खिडकी, कपाट, कुलूप फिटिंग'
    },
    iconName: 'Axe',
    category: 'finishing',
    avgDailyRate: { min: 800, max: 1100 }
  },
  {
    id: 'tiles_mistri',
    name: {
      en: 'Tiles & Marble Mistri',
      hi: 'टाइल व मार्बल मिस्त्री',
      mr: 'टाइल्स व मार्बल कारागीर'
    },
    subtitle: {
      en: 'Floor tiles, bathroom tiles, granite counter',
      hi: 'फर्श की टाइल, बाथरूम टाइल, ग्रेनाइट कटिंग',
      mr: 'फरशी बसवणे, बाथरूम टाईल्स, ग्रॅनाइट काम'
    },
    iconName: 'Layers',
    category: 'finishing',
    avgDailyRate: { min: 850, max: 1200 }
  },
  {
    id: 'welder',
    name: {
      en: 'Welder / Fabricator',
      hi: 'वेल्डर (गेट, ग्रिल व शेड)',
      mr: 'वेल्डर (लोखंडी ग्रिल व शेड)'
    },
    subtitle: {
      en: 'Iron gate, window grill, tin shed welding',
      hi: 'लोहे का गेट, ग्रिल, टिन शेड वेल्डिंग',
      mr: 'लोखंडी गेट, खिडकी ग्रिल, शेड वेल्डिंग'
    },
    iconName: 'Flame',
    category: 'construction',
    avgDailyRate: { min: 800, max: 1100 }
  },
  {
    id: 'cleaner',
    name: {
      en: 'Cleaner / Deep Cleaner',
      hi: 'सफाई कर्मी (डीप क्लीनिंग)',
      mr: 'स्वच्छता कामगार'
    },
    subtitle: {
      en: 'Post-construction cleaning, water tank wash',
      hi: 'मकान बनने के बाद सफाई, पानी टंकी की धुलाई',
      mr: 'घराची सखोल स्वच्छता, पाण्याची टाकी स्वच्छता'
    },
    iconName: 'Sparkles',
    category: 'cleaning',
    avgDailyRate: { min: 600, max: 800 }
  }
];
