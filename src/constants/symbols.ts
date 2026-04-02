export interface SymbolData {
  id: string;
  icon: string;
  name: string;
  category: string;
  meanings: {
    [language: string]: string;
  };
  transliterations: {
    [script: string]: string;
  };
}

export const COMMON_SYMBOLS: SymbolData[] = [
  {
    id: "hosp",
    icon: "🏥",
    name: "Hospital",
    category: "Public Services",
    meanings: {
      "English": "Hospital / Medical Center",
      "Hindi": "अस्पताल / चिकित्सा केंद्र",
      "Telugu": "ఆసుపత్రి / వైద్య కేంద్రం",
      "Tamil": "மருத்துவமனை",
      "Bengali": "হাসপাতাল",
      "Marathi": "रुग्णालय"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "हॉस्पिटल",
      "Telugu": "హాస్పిటల్",
      "Tamil": "ஹாஸ்பிடல்",
      "Bengali (Bengali, Assamese)": "হসপিটাল",
      "Gurmukhi (Punjabi)": "ਹੌਸਪੀਟਲ"
    }
  },
  {
    id: "no-park",
    icon: "🚫🅿️",
    name: "No Parking",
    category: "Traffic",
    meanings: {
      "English": "No Parking Allowed",
      "Hindi": "पार्किंग मना है",
      "Telugu": "పార్కింగ్ నిషేధించబడింది",
      "Tamil": "பார்க்கிங் செய்யக்கூடாது",
      "Bengali": "পার্কিং নিষেধ",
      "Marathi": "पार्किंग करू नये"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "नो पार्किंग",
      "Telugu": "నో పార్కింగ్",
      "Tamil": "நோ பார்க்கிங்",
      "Bengali (Bengali, Assamese)": "নো পার্কিং",
      "Gurmukhi (Punjabi)": "ਨੋ ਪਾਰਕਿੰਗ"
    }
  },
  {
    id: "exit",
    icon: "🚪🏃",
    name: "Exit",
    category: "Navigation",
    meanings: {
      "English": "Exit / Way Out",
      "Hindi": "निकास / बाहर जाने का रास्ता",
      "Telugu": "నిష్క్రమణ / బయటకు వెళ్లే దారి",
      "Tamil": "வெளியேறும் வழி",
      "Bengali": "প্রস্থান",
      "Marathi": "बाहेर जाण्याचा मार्ग"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "एक्जिट",
      "Telugu": "ఎగ్జిట్",
      "Tamil": "எக்ஸிட்",
      "Bengali (Bengali, Assamese)": "এক্সিট",
      "Gurmukhi (Punjabi)": "ਐਗਜ਼ਿਟ"
    }
  },
  {
    id: "toilet",
    icon: "🚻",
    name: "Restroom",
    category: "Public Services",
    meanings: {
      "English": "Restroom / Toilet",
      "Hindi": "शौचालय",
      "Telugu": "శౌచాలయం",
      "Tamil": "கழிப்பறை",
      "Bengali": "শৌচাগার",
      "Marathi": "शौचालय"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "टॉयलेट",
      "Telugu": "టాయిలెట్",
      "Tamil": "டாய்லெட்",
      "Bengali (Bengali, Assamese)": "টয়লেট",
      "Gurmukhi (Punjabi)": "ਟਾਇਲਟ"
    }
  },
  {
    id: "danger",
    icon: "⚠️",
    name: "Danger",
    category: "Safety",
    meanings: {
      "English": "Danger / High Voltage",
      "Hindi": "खतरा",
      "Telugu": "ప్రమాదం",
      "Tamil": "அబாயம்",
      "Bengali": "বিপদ",
      "Marathi": "धोका"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "डेंजर",
      "Telugu": "డేంజర్",
      "Tamil": "டேஞ்சர்",
      "Bengali (Bengali, Assamese)": "ডেঞ্জার",
      "Gurmukhi (Punjabi)": "ਡੇਂਜਰ"
    }
  },
  {
    id: "police",
    icon: "👮",
    name: "Police Station",
    category: "Public Services",
    meanings: {
      "English": "Police Station",
      "Hindi": "पुलिस स्टेशन / थाना",
      "Telugu": "పోలీస్ స్టేషన్",
      "Tamil": "காவல் நிலையம்",
      "Bengali": "পুলিশ স্টেশন",
      "Marathi": "पोलीस स्टेशन"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "पुलिस स्टेशन",
      "Telugu": "పోలీస్ స్టేషన్",
      "Tamil": "போலீస్ స్టేషన్",
      "Bengali (Bengali, Assamese)": "পুলিশ স্টেশন",
      "Gurmukhi (Punjabi)": "ਪੁਲਿਸ ਸਟੇਸ਼ਨ"
    }
  },
  {
    id: "water",
    icon: "🚰",
    name: "Drinking Water",
    category: "Public Services",
    meanings: {
      "English": "Drinking Water",
      "Hindi": "पीने का पानी",
      "Telugu": "త్రాగునీరు",
      "Tamil": "குடிநீர்",
      "Bengali": "পানীয় জল",
      "Marathi": "पिण्याचे पाणी"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "ड्रिंकिंग वॉटर",
      "Telugu": "డ్రింకింగ్ వాటర్",
      "Tamil": "டிரிங்கிங் వాటర్",
      "Bengali (Bengali, Assamese)": "ড্রিংকিং ওয়াটার",
      "Gurmukhi (Punjabi)": "ਡ੍ਰਿੰਕਿੰਗ ਵਾਟਰ"
    }
  },
  {
    id: "bus",
    icon: "🚌",
    name: "Bus Stand",
    category: "Transport",
    meanings: {
      "English": "Bus Stand / Stop",
      "Hindi": "बस स्टैंड",
      "Telugu": "బస్ స్టాండ్",
      "Tamil": "பேருந்து நிலையம்",
      "Bengali": "বাস স্ট্যান্ড",
      "Marathi": "बस स्थानक"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "बस स्टैंड",
      "Telugu": "బస్ స్టాండ్",
      "Tamil": "பస్ స్టாண்ட్",
      "Bengali (Bengali, Assamese)": "বাস স্ট্যান্ড",
      "Gurmukhi (Punjabi)": "ਬੱਸ ਸਟੈਂਡ"
    }
  },
  {
    id: "train",
    icon: "🚉",
    name: "Railway Station",
    category: "Transport",
    meanings: {
      "English": "Railway Station",
      "Hindi": "रेलवे स्टेशन",
      "Telugu": "రైల్వే స్టేషన్",
      "Tamil": "இரயில் நிலையம்",
      "Bengali": "রেলওয়ে স্টেশন",
      "Marathi": "रेल्वे स्टेशन"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "रेलवे स्टेशन",
      "Telugu": "రైల్వే స్టేషన్",
      "Tamil": "இரயில்வே స్టేషన్",
      "Bengali (Bengali, Assamese)": "রেলওয়ে স্টেশন",
      "Gurmukhi (Punjabi)": "ਰੇਲਵੇ ਸਟੇਸ਼ਨ"
    }
  },
  {
    id: "no-smoke",
    icon: "🚭",
    name: "No Smoking",
    category: "Safety",
    meanings: {
      "English": "No Smoking",
      "Hindi": "धूम्रपान निषेध",
      "Telugu": "ధూమపానం నిషేధించబడింది",
      "Tamil": "புகைபிடிக்கக்கூடாது",
      "Bengali": "ধূমপান নিষেধ",
      "Marathi": "धूम्रपान करू नये"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "नो स्मोकिंग",
      "Telugu": "నో స్మోకింగ్",
      "Tamil": "நோ ஸ்మోக்கிங்",
      "Bengali (Bengali, Assamese)": "নো স্মোকিং",
      "Gurmukhi (Punjabi)": "ਨੋ ਸਮੋਕਿੰਗ"
    }
  },
  {
    id: "fire",
    icon: "🧯",
    name: "Fire Extinguisher",
    category: "Safety",
    meanings: {
      "English": "Fire Extinguisher",
      "Hindi": "अग्निशामक यंत्र",
      "Telugu": "అగ్నిమాపక యంత్రం",
      "Tamil": "தீயணைப்பான்",
      "Bengali": "অগ্নিনির্বাপক যন্ত্র",
      "Marathi": "अग्निशामक यंत्र"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "फायर एक्सटिंगुइशर",
      "Telugu": "ఫైర్ ఎక్స్టింగ్విషర్",
      "Tamil": "பயர் ఎక్స్ట్రింగుయిషర్",
      "Bengali (Bengali, Assamese)": "ফায়ার এক্সটিংগুইশার",
      "Gurmukhi (Punjabi)": "ਫਾਇਰ ਐਕਸਟਿੰਗੁਇਸ਼ਰ"
    }
  },
  {
    id: "pharmacy",
    icon: "💊",
    name: "Pharmacy",
    category: "Public Services",
    meanings: {
      "English": "Pharmacy / Medical Store",
      "Hindi": "दवा की दुकान / फार्मेसी",
      "Telugu": "మందుల దుకాణం",
      "Tamil": "மருந்தகம்",
      "Bengali": "ফার্মেসি",
      "Marathi": "औषधांचे दुकान"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "फार्मेसी",
      "Telugu": "ఫార్మసీ",
      "Tamil": "பார்மசி",
      "Bengali (Bengali, Assamese)": "ফার্মেসি",
      "Gurmukhi (Punjabi)": "ਫਾਰਮੇਸੀ"
    }
  },
  {
    id: "atm",
    icon: "🏧",
    name: "ATM",
    category: "Public Services",
    meanings: {
      "English": "ATM / Cash Machine",
      "Hindi": "एटीएम",
      "Telugu": "ఏటీఎం",
      "Tamil": "ஏடிஎம்",
      "Bengali": "এটিএম",
      "Marathi": "एटीएम"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "एटीएम",
      "Telugu": "ఏటీఎం",
      "Tamil": "ஏடிஎம்",
      "Bengali (Bengali, Assamese)": "এটিএম",
      "Gurmukhi (Punjabi)": "ਏਟੀਐਮ"
    }
  },
  {
    id: "info",
    icon: "ℹ️",
    name: "Information",
    category: "Navigation",
    meanings: {
      "English": "Information Desk",
      "Hindi": "पूछताछ / सूचना",
      "Telugu": "సమాచారం",
      "Tamil": "தகவல் மையம்",
      "Bengali": "তথ্য কেন্দ্র",
      "Marathi": "चौकशी / माहिती"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "इन्फॉर्मेशन",
      "Telugu": "ఇన్ఫర్మేషన్",
      "Tamil": "இன்பர்மேஷன்",
      "Bengali (Bengali, Assamese)": "ইনফরমেশন",
      "Gurmukhi (Punjabi)": "ਇਨਫਰਮੇਸ਼ਨ"
    }
  },
  {
    id: "wifi",
    icon: "📶",
    name: "Wi-Fi",
    category: "Public Services",
    meanings: {
      "English": "Wi-Fi Zone",
      "Hindi": "वाई-फाई",
      "Telugu": "వై-ఫై",
      "Tamil": "వై-பை",
      "Bengali": "ওয়াই-ফাই",
      "Marathi": "वाय-फाय"
    },
    transliterations: {
      "Devanagari (Hindi, Marathi, Konkani, etc.)": "वाई-फाई",
      "Telugu": "వై-ఫై",
      "Tamil": "వై-பை",
      "Bengali (Bengali, Assamese)": "ওয়াই-ফাই",
      "Gurmukhi (Punjabi)": "ਵਾਈ-ਫਾਈ"
    }
  }
];
