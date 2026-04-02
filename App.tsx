import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Upload, 
  Type as TypeIcon, 
  Languages, 
  Volume2, 
  RefreshCw, 
  X, 
  Check, 
  ChevronRight,
  Info,
  AlertCircle,
  Loader2,
  Copy,
  CheckCircle2,
  Mic,
  MicOff,
  Search,
  BookOpen,
  Filter,
  ShieldCheck,
  Compass,
  Sun,
  Moon,
  MapPin,
  Image as ImageIcon,
  ExternalLink
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import Markdown from "react-markdown";
import { processImage, processText, generateSpeech, getNearbyPlaces, getPlacesByCity, type TransliterationResult, type NearbyPlacesResult } from "@/src/services/geminiService";
import { persistentCache } from "@/src/lib/cache";
import { SOLAPUR_STATIC_PLACES } from "@/src/constants/solapurPlaces";
import { INDIAN_STATES_DATA, type State, type City, type Place } from "@/src/constants/indianStates";
import { COMMON_SYMBOLS, type SymbolData } from "@/src/constants/symbols";

const SCRIPTS = [
  "Auto Detect",
  "Devanagari (Hindi, Marathi, Konkani, etc.)", 
  "Gurmukhi (Punjabi)", 
  "Bengali (Bengali, Assamese)", 
  "Gujarati", 
  "Odia", 
  "Tamil", 
  "Telugu", 
  "Kannada", 
  "Malayalam", 
  "Latin (English)",
  "Urdu (Perso-Arabic)",
  "Ol Chiki (Santali)",
  "Meetei Mayek (Manipuri)",
  "Sharada (Kashmiri)",
  "Tirhuta (Maithili)",
  "Modi",
  "Takri (Dogri)",
  "Saurashtra",
  "Grantha",
  "Brahmi"
];

const LANGUAGES = [
  "Auto Detect",
  "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", 
  "Assamese", "Maithili", "Santali", "Kashmiri", "Nepali", "Konkani", "Sindhi", "Dogri", "Manipuri"
];

type Mode = "camera" | "upload" | "text" | "voice" | "places";

const AliveBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Animated Blobs */}
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        x: [0, 100, 0],
        y: [0, 50, 0],
        rotate: [0, 45, 0]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-orange-500/[0.03] dark:bg-orange-500/[0.07] rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1.3, 1, 1.3],
        x: [0, -80, 0],
        y: [0, -40, 0],
        rotate: [0, -30, 0]
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-500/[0.03] dark:bg-blue-500/[0.07] rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.5, 1],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-purple-500/[0.02] dark:bg-purple-500/[0.05] rounded-full blur-[100px]" 
    />

    {/* Professional Grid Pattern */}
    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{ 
      backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
      backgroundSize: '40px 40px' 
    }} />

    {/* Grain Texture Overlay */}
    <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25] mix-blend-overlay pointer-events-none" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }} />
  </div>
);

const FloatingScripts = () => {
  const scripts = ["अ", "क", "श", "र", "से", "तु", "ॐ", "नमस्ते", "A", "B", "C", "あ", "ア", "Ω", "Σ", "你好", "مرحبا"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {scripts.map((script, i) => {
        const blur = Math.random() * 4;
        const opacity = Math.random() * 0.05 + 0.02;
        return (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [null, Math.random() * 360],
              opacity: [0, opacity, 0]
            }}
            transition={{ 
              duration: Math.random() * 40 + 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ filter: `blur(${blur}px)` }}
            className="absolute text-6xl md:text-8xl font-serif text-foreground"
          >
            {script}
          </motion.div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState<Mode>("camera");
  const [targetScript, setTargetScript] = useState("Auto Detect");
  const [targetLanguage, setTargetLanguage] = useState("Auto Detect");
  const [meaningLanguage, setMeaningLanguage] = useState("English");
  const [isTravelMode, setIsTravelMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Analyzing Content...");
  const [result, setResult] = useState<TransliterationResult | null>(null);
  const [placesResult, setPlacesResult] = useState<{ text: string; places: { title: string; uri: string }[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [lastProcessedData, setLastProcessedData] = useState<{
    data: string;
    type: "image" | "text";
  } | null>(null);
  
  // Symbol Library State
  const [isSymbolLibraryOpen, setIsSymbolLibraryOpen] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isSmartGlassesMode, setIsSmartGlassesMode] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [lastSpokenText, setLastSpokenText] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [symbolSearchQuery, setSymbolSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(["All"]));
  const [selectedScriptFilter, setSelectedScriptFilter] = useState<string>("All");

  // Manual Place Selection State
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<string>("");

  // API Caching
  const resultCache = useRef<Map<string, TransliterationResult>>(new Map());
  const audioCache = useRef<Map<string, string>>(new Map());

  const webcamRef = useRef<Webcam>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-IN"; // Default to Indian English, can be adjusted

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleVoiceSubmit(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        setError("Voice recognition failed. Please try again.");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    if (lastProcessedData && !isLoading) {
      const cacheKey = `${lastProcessedData.type}:${lastProcessedData.data.slice(0, 100)}:${targetScript}:${targetLanguage}:${meaningLanguage}`;
      
      const cached = resultCache.current.get(cacheKey) || persistentCache.get(cacheKey);
      if (cached) {
        setResult(cached);
        if (!resultCache.current.has(cacheKey)) resultCache.current.set(cacheKey, cached);
        return;
      }

      const timer = setTimeout(async () => {
        setIsLoading(true);
        setLoadingMessage("Analyzing Content...");
        try {
          let data: TransliterationResult;
          if (lastProcessedData.type === "image") {
            data = await processImage(lastProcessedData.data, targetScript, targetLanguage, meaningLanguage);
          } else {
            data = await processText(lastProcessedData.data, targetScript, targetLanguage, meaningLanguage);
          }
          resultCache.current.set(cacheKey, data);
          persistentCache.set(cacheKey, data);
          setResult(data);
        } catch (err) {
          console.error("Live update failed", err);
        } finally {
          setIsLoading(false);
        }
      }, 500); // Debounce settings changes

      return () => clearTimeout(timer);
    }
  }, [targetScript, targetLanguage, meaningLanguage, lastProcessedData]);

  const handleVoiceSubmit = async (text: string) => {
    if (!text.trim()) return;
    const cacheKey = `text:${text}:${targetScript}:${targetLanguage}:${meaningLanguage}`;
    
    const cached = resultCache.current.get(cacheKey) || persistentCache.get(cacheKey);
    if (cached) {
      setResult(cached);
      if (!resultCache.current.has(cacheKey)) resultCache.current.set(cacheKey, cached);
      setLastProcessedData({ data: text, type: "text" });
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Analyzing Content...");
    setError(null);
    setLastProcessedData({ data: text, type: "text" });
    try {
      const data = await processText(text, targetScript, targetLanguage, meaningLanguage);
      resultCache.current.set(cacheKey, data);
      persistentCache.set(cacheKey, data);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process voice input.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setError(null);
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const handleCapture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        const cacheKey = `image:${imageSrc.slice(0, 100)}:${targetScript}:${targetLanguage}:${meaningLanguage}`;
        
        const cached = resultCache.current.get(cacheKey) || persistentCache.get(cacheKey);
        if (cached) {
          setResult(cached);
          if (!resultCache.current.has(cacheKey)) resultCache.current.set(cacheKey, cached);
          setLastProcessedData({ data: imageSrc, type: "image" });
          return;
        }

        setIsLoading(true);
        setLoadingMessage("Analyzing Content...");
        setError(null);
        setLastProcessedData({ data: imageSrc, type: "image" });
        try {
          let data: TransliterationResult;
          data = await processImage(imageSrc, targetScript, targetLanguage, meaningLanguage);
          resultCache.current.set(cacheKey, data);
          persistentCache.set(cacheKey, data);
          setResult(data);
        } catch (err: any) {
          console.error(err);
          setError(err.message || "Failed to process image. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    }
  }, [targetScript, targetLanguage, meaningLanguage]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setCapturedImage(base64);
        const cacheKey = `image:${base64.slice(0, 100)}:${targetScript}:${targetLanguage}:${meaningLanguage}`;
        
        const cached = resultCache.current.get(cacheKey) || persistentCache.get(cacheKey);
        if (cached) {
          setResult(cached);
          if (!resultCache.current.has(cacheKey)) resultCache.current.set(cacheKey, cached);
          setLastProcessedData({ data: base64, type: "image" });
          return;
        }

        setIsLoading(true);
        setLoadingMessage("Analyzing Content...");
        setError(null);
        setLastProcessedData({ data: base64, type: "image" });
        try {
          let data: TransliterationResult;
          data = await processImage(base64, targetScript, targetLanguage, meaningLanguage);
          resultCache.current.set(cacheKey, data);
          persistentCache.set(cacheKey, data);
          setResult(data);
        } catch (err: any) {
          console.error(err);
          setError(err.message || "Failed to process uploaded image.");
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextSubmit = async () => {
    if (!inputText.trim()) return;
    const cacheKey = `text:${inputText}:${targetScript}:${targetLanguage}:${meaningLanguage}`;
    
    const cached = resultCache.current.get(cacheKey) || persistentCache.get(cacheKey);
    if (cached) {
      setResult(cached);
      if (!resultCache.current.has(cacheKey)) resultCache.current.set(cacheKey, cached);
      setLastProcessedData({ data: inputText, type: "text" });
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Analyzing Content...");
    setError(null);
    setLastProcessedData({ data: inputText, type: "text" });
    try {
      const data = await processText(inputText, targetScript, targetLanguage, meaningLanguage);
      resultCache.current.set(cacheKey, data);
      persistentCache.set(cacheKey, data);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process text.");
    } finally {
      setIsLoading(false);
    }
  };



  const speak = async (text: string, languageHint?: string) => {
    if (!text || isSpeaking) return;
    
    const cacheKey = `audio:${text}:${languageHint || 'default'}`;
    let base64Audio = audioCache.current.get(cacheKey) || persistentCache.get(cacheKey);

    setIsSpeaking(true);
    try {
      if (!base64Audio) {
        base64Audio = await generateSpeech(text, languageHint);
        audioCache.current.set(cacheKey, base64Audio);
        persistentCache.set(cacheKey, base64Audio);
      }
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const audioContext = audioContextRef.current;
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768;
      }
      
      const audioBuffer = audioContext.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.onended = () => setIsSpeaking(false);
      source.start();
    } catch (err) {
      console.error("Gemini TTS failed, falling back to browser TTS", err);
      // Fallback to browser TTS
      const utterance = new SpeechSynthesisUtterance(text);
      if (languageHint) {
        // Simple heuristic to set lang code if hint is a common language name
        const langMap: Record<string, string> = {
          "English": "en-US",
          "Hindi": "hi-IN",
          "Bengali": "bn-IN",
          "Tamil": "ta-IN",
          "Telugu": "te-IN",
          "Marathi": "mr-IN",
          "Gujarati": "gu-IN",
          "Kannada": "kn-IN",
          "Malayalam": "ml-IN",
          "Punjabi": "pa-IN"
        };
        if (langMap[languageHint]) utterance.lang = langMap[languageHint];
      }
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleManualPlaceSelect = (placeTitle: string) => {
    setSelectedPlace(placeTitle);
    
    if (!placeTitle) {
      // Restore all places for the city
      const state = INDIAN_STATES_DATA.find(s => s.name === selectedState);
      const city = state?.cities.find(c => c.name === selectedCity);
      if (city && city.places && city.places.length > 0) {
        setPlacesResult({
          text: `### Exploring ${city.name}\n\nHere are some recommended places to visit in **${city.name}, ${selectedState}**. Select a specific place from the dropdown to see more details or view all below.`,
          places: city.places
        });
      }
      return;
    }

    if (placesResult) {
      const place = placesResult.places.find(p => p.title === placeTitle);
      if (place) {
        setPlacesResult({
          ...placesResult,
          text: `### ${place.title}\n\nThis is a specific place selected from **${selectedCity}, ${selectedState}**. Click the link below to view it on Google Maps.`,
          places: [place]
        });
      }
    }
  };

  const handleCitySelect = async (cityName: string) => {
    setSelectedCity(cityName);
    setSelectedPlace(""); // Reset place when city changes
    setPlacesResult(null);
    setError(null);
    
    const state = INDIAN_STATES_DATA.find(s => s.name === selectedState);
    const city = state?.cities.find(c => c.name === cityName);
    
    if (city && city.places && city.places.length > 0) {
      setPlacesResult({
        text: `### Exploring ${city.name}\n\nHere are some recommended places to visit in **${city.name}, ${selectedState}**. Browse the list below to see more details and locations.`,
        places: city.places
      });
    } else {
      setIsLoading(true);
      setLoadingMessage(`Finding places in ${cityName}...`);
      try {
        const result = await getPlacesByCity(cityName);
        setPlacesResult(result);
        
        // Cache the result
        const cacheKey = `places:city:${cityName.toLowerCase().replace(/\s+/g, '_')}`;
        persistentCache.set(cacheKey, result);
      } catch (err: any) {
        console.error("Error getting places by city:", err);
        setError(err.message || `Failed to get places for ${cityName}.`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const reset = () => {
    setResult(null);
    setCapturedImage(null);
    setError(null);
    setInputText("");
    setIsListening(false);
    setIsCameraActive(false);
    setLastProcessedData(null);
  };

  const filteredSymbols = useMemo(() => {
    return COMMON_SYMBOLS.filter(symbol => {
      const matchesSearch = symbol.name.toLowerCase().includes(symbolSearchQuery.toLowerCase()) ||
        Object.values(symbol.meanings).some(m => m.toLowerCase().includes(symbolSearchQuery.toLowerCase())) ||
        Object.values(symbol.transliterations).some(t => t.toLowerCase().includes(symbolSearchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategories.has("All") || selectedCategories.has(symbol.category);
      
      const matchesScript = selectedScriptFilter === "All" || !!symbol.transliterations[selectedScriptFilter];

      return matchesSearch && matchesCategory && matchesScript;
    });
  }, [symbolSearchQuery, selectedCategories, selectedScriptFilter]);

  const categories = useMemo(() => {
    const cats = new Set(COMMON_SYMBOLS.map(s => s.category));
    return Array.from(cats);
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (category === "All") {
        return new Set(["All"]);
      }
      next.delete("All");
      if (next.has(category)) {
        next.delete(category);
        if (next.size === 0) return new Set(["All"]);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500/30 transition-colors duration-300">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="flex flex-col items-center mb-12 text-center relative py-12">
          <AliveBackground />
          <FloatingScripts />
          
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20"
            >
              <Languages className="w-8 h-8 text-white" />
            </motion.div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setIsSymbolLibraryOpen(true)}
                className="p-2.5 bg-card/40 backdrop-blur-md hover:bg-card/60 rounded-xl border border-border/50 transition-all group"
                title="Symbol Library"
              >
                <BookOpen className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={() => setIsSmartGlassesMode(!isSmartGlassesMode)}
                className={cn(
                  "p-2.5 rounded-xl border transition-all group backdrop-blur-md",
                  isSmartGlassesMode ? "bg-orange-500 border-orange-500" : "bg-card/40 hover:bg-card/60 border-border/50"
                )}
                title="Smart Glasses Mode"
              >
                <Compass className={cn("w-4 h-4 transition-transform", isSmartGlassesMode ? "text-white" : "text-orange-500 group-hover:scale-110")} />
              </button>
              <button 
                onClick={toggleTheme}
                className="p-2.5 bg-card/40 backdrop-blur-md hover:bg-card/60 border border-border/50 rounded-xl transition-all group"
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {theme === "light" ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-yellow-400" />}
              </button>
            </div>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <span className="px-3 py-1 rounded-full bg-orange-500/5 border border-orange-500/10 text-orange-500/60 text-[9px] font-bold uppercase tracking-[0.2em] mb-4">
                Transliteration Reimagined
              </span>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                AksharSetu
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/40 max-w-lg mx-auto font-serif italic leading-relaxed">
                "Bridging scripts, connecting cultures <br className="hidden md:block" />
                <span className="text-orange-500/40">one character at a time.</span>"
              </p>
            </motion.div>
          </div>
        </header>

        {/* Main Interface */}
        <main className="space-y-8">
          {/* Mode Selector */}
          <div className="flex justify-center p-1 bg-card/50 backdrop-blur-xl rounded-2xl border border-border w-fit mx-auto overflow-x-auto max-w-full">
            {[
              { id: "camera", icon: Camera, label: "Live" },
              { id: "upload", icon: Upload, label: "Upload" },
              { id: "text", icon: TypeIcon, label: "Text" },
              { id: "voice", icon: Mic, label: "Talk" },
              { id: "places", icon: MapPin, label: "Places" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => { 
                  setMode(m.id as Mode); 
                  reset(); 
                }}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap",
                  mode === m.id 
                    ? "bg-card text-foreground shadow-lg border border-border" 
                    : "text-foreground/40 hover:text-foreground/70"
                )}
              >
                <m.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Settings Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono">Target Script</label>
                <button 
                  onClick={() => setIsTravelMode(!isTravelMode)}
                  className={cn(
                    "flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter transition-all",
                    isTravelMode ? "bg-orange-500 text-white" : "bg-card border border-border text-foreground/20"
                  )}
                >
                  <MapPin className="w-2 h-2" /> Travel Mode
                </button>
              </div>
              <div className="relative">
                  <select 
                    value={targetScript}
                    onChange={(e) => setTargetScript(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm"
                  >
                    {SCRIPTS.map(s => <option key={`target-script-${s}`} value={s} className="bg-card text-foreground">{s}</option>)}
                  </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 rotate-90" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono ml-1">Translation</label>
              <div className="relative">
                <select 
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm"
                >
                  {LANGUAGES.map(l => <option key={`target-lang-${l}`} value={l} className="bg-card text-foreground">{l}</option>)}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 rotate-90" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono ml-1">Meaning</label>
              <div className="relative">
                <select 
                  value={meaningLanguage}
                  onChange={(e) => setMeaningLanguage(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm"
                >
                  {LANGUAGES.slice(1).map(l => <option key={`meaning-lang-${l}`} value={l} className="bg-card text-foreground">{l}</option>)}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 rotate-90" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono ml-1">Auto-Detect AI</label>
              <div className="w-full bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-foreground/60">Script-Agnostic Active</span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="relative min-h-[600px] md:min-h-[750px] bg-card rounded-3xl border border-border overflow-hidden group shadow-2xl">
            <AnimatePresence mode="wait">
              {!result && !isLoading && (
                <motion.div 
                  key={mode}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="absolute inset-0"
                >
                  {mode === "camera" && (
                    <div className="relative w-full h-full">
                      {isCameraActive ? (
                        <>
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{ facingMode: "environment" }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                          <button 
                            onClick={handleCapture}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center group/btn transition-all active:scale-95"
                          >
                            <div className="w-12 h-12 rounded-full bg-white group-hover/btn:scale-90 transition-transform" />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-background/40 backdrop-blur-sm">
                          <div className="p-6 rounded-full bg-card mb-4 group-hover:scale-110 transition-transform duration-500">
                            <Camera className="w-10 h-10 text-orange-500" />
                          </div>
                          <p className="text-lg font-medium mb-4">Camera is inactive</p>
                          <button 
                            onClick={() => setIsCameraActive(true)}
                            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
                          >
                            Activate Camera <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {mode === "upload" && (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-card/50 transition-colors">
                      <div className="p-6 rounded-full bg-card mb-4 group-hover:scale-110 transition-transform duration-500">
                        <ImageIcon className="w-10 h-10 text-orange-500" />
                      </div>
                      <p className="text-lg font-medium">Drop your image here</p>
                      <p className="text-sm text-foreground/40 mt-1">or click to browse files</p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </label>
                  )}

                  {mode === "text" && (
                    <div className="flex flex-col h-full p-8 relative">
                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type or paste text in any script..."
                        className="flex-1 bg-transparent border-none resize-none focus:outline-none text-xl md:text-2xl font-medium placeholder:text-foreground/20"
                      />
                      {inputText && (
                        <button 
                          onClick={() => setInputText("")}
                          className="absolute top-8 right-8 p-2 hover:bg-foreground/5 rounded-full transition-colors"
                          title="Clear text"
                        >
                          <X className="w-5 h-5 text-foreground/40" />
                        </button>
                      )}
                      <div className="flex justify-end mt-4">
                        <button 
                          onClick={handleTextSubmit}
                          disabled={!inputText.trim()}
                          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
                        >
                          Process <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === "voice" && (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                      <div className="relative mb-8">
                        <AnimatePresence>
                          {isListening && (
                            <motion.div 
                              key="listening-pulse"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1.5, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl animate-pulse"
                            />
                          )}
                        </AnimatePresence>
                        <button 
                          onClick={toggleListening}
                          className={cn(
                            "relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl",
                            isListening ? "bg-orange-500 scale-110" : "bg-card hover:bg-card/80"
                          )}
                        >
                          {isListening ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-orange-500" />}
                        </button>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {isListening ? "Listening..." : "Tap to Talk"}
                      </h3>
                      <p className="text-foreground/40 max-w-xs">
                        {isListening ? "Speak clearly in any language" : "Talk in any language and I will transliterate and translate it for you."}
                      </p>
                      {inputText && !isListening && (
                        <div className="mt-6 p-4 bg-card rounded-2xl border border-border max-w-md">
                          <p className="text-sm italic text-foreground/60">"{inputText}"</p>
                        </div>
                      )}
                    </div>
                  )}


                  {mode === "places" && (
                    <div className="flex flex-col h-full p-6 md:p-10">
                      <div className="mb-8 flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-orange-500" />
                            {selectedCity ? selectedCity : selectedState ? selectedState : "Discover Places"}
                          </h3>
                          <p className="text-foreground/40 text-sm mt-1">
                            {!selectedState ? "Select a state to begin" : !selectedCity ? `Select a city in ${selectedState}` : `Places in ${selectedCity}`}
                          </p>
                        </div>
                        {(selectedState || selectedCity) && (
                          <button 
                            onClick={() => {
                              if (selectedCity) {
                                setSelectedCity("");
                                setSelectedPlace("");
                                setPlacesResult(null);
                              } else {
                                setSelectedState("");
                              }
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-orange-500/50 transition-all text-xs font-bold uppercase tracking-widest"
                          >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                            Back
                          </button>
                        )}
                      </div>

                      <div className="flex-1 overflow-y-auto pr-2">
                        {placesResult ? (
                          <div className="space-y-6">
                            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:leading-relaxed prose-a:text-orange-500 hover:prose-a:text-orange-600">
                              <Markdown>{placesResult.text}</Markdown>
                            </div>
                            
                            <div className="grid gap-3">
                              <h4 className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono ml-1">List of Places & Locations</h4>
                              {placesResult.places.map((place, idx) => (
                                <div 
                                  key={idx}
                                  className="p-5 rounded-2xl bg-card border border-border hover:border-orange-500/50 transition-all group"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <h4 className="font-bold text-lg group-hover:text-orange-500 transition-colors">{place.title}</h4>
                                      <p className="text-sm text-foreground/40 mt-1">Explore this location {selectedCity ? `in ${selectedCity}` : "nearby"}</p>
                                    </div>
                                    <a 
                                      href={place.uri}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="shrink-0 p-3 rounded-xl bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                                    >
                                      <MapPin className="w-4 h-4" />
                                      Location
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : !selectedState ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {INDIAN_STATES_DATA.map(state => (
                              <button
                                key={state.name}
                                onClick={() => setSelectedState(state.name)}
                                className="p-4 rounded-2xl bg-card border border-border hover:border-orange-500/50 hover:bg-orange-500/5 transition-all text-left group"
                              >
                                <span className="font-bold text-sm block group-hover:text-orange-500 transition-colors">{state.name}</span>
                                <span className="text-[10px] text-foreground/20 uppercase tracking-widest mt-1 block">{state.cities.length} Cities</span>
                              </button>
                            ))}
                          </div>
                        ) : !selectedCity ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {INDIAN_STATES_DATA.find(s => s.name === selectedState)?.cities.map(city => (
                              <button
                                key={city.name}
                                onClick={() => handleCitySelect(city.name)}
                                className="p-4 rounded-2xl bg-card border border-border hover:border-orange-500/50 hover:bg-orange-500/5 transition-all text-left group"
                              >
                                <span className="font-bold text-sm block group-hover:text-orange-500 transition-colors">{city.name}</span>
                                <span className="text-[10px] text-foreground/20 uppercase tracking-widest mt-1 block">{city.places?.length || 0} Places</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                            <p className="text-foreground/40">Loading places for {selectedCity}...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}


                </motion.div>
              )}


                  {isLoading && (
                    <motion.div 
                      key="loading-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center z-50"
                    >
                      <div className="relative">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                        <div className="absolute inset-0 blur-xl bg-orange-500/20 animate-pulse" />
                      </div>
                      <p className="mt-6 text-lg font-medium tracking-wide animate-pulse">{loadingMessage}</p>
                      <p className="text-sm text-foreground/40 mt-1">Processing...</p>
                    </motion.div>
                  )}

                  {result && (
                    <motion.div 
                      key="result-overlay"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "absolute inset-0 overflow-y-auto p-8 md:p-16 transition-all duration-500",
                        isSmartGlassesMode ? "bg-background/40 backdrop-blur-sm border-4 border-orange-500/30" : "bg-background"
                      )}
                    >
                      {isSmartGlassesMode && (
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/60">Live AR Overlay Active</span>
                        </div>
                      )}

                        <div className="flex flex-wrap gap-3 mb-8">
                          <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                            <ShieldCheck className="w-3 h-3 text-orange-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Core: Transliteration</span>
                          </div>
                          <button 
                            onClick={() => setShowTranslation(!showTranslation)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-1 rounded-full border transition-all",
                              showTranslation ? "bg-blue-500/20 border-blue-500 text-blue-500" : "bg-card border-border text-foreground/40"
                            )}
                          >
                            <Languages className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{showTranslation ? "Translation Active" : "Enable Translation"}</span>
                          </button>
                      {result.quickPhrases && result.quickPhrases.length > 0 && result.quickPhrases.map(phrase => {
                        const isEmergency = ["danger", "emergency", "hospital", "police", "exit", "fire"].some(word => phrase.toLowerCase().includes(word));
                        return (
                          <motion.div
                            key={phrase}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={cn(
                              "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] border-2 flex items-center gap-2 shadow-xl",
                              isEmergency 
                                ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse" 
                                : "bg-orange-500/20 border-orange-500 text-orange-500"
                            )}
                          >
                            <AlertCircle className="w-3 h-3" />
                            {phrase}
                          </motion.div>
                        );
                      })}
                    </div>

                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-orange-500/10 text-orange-500 text-[10px] font-mono uppercase tracking-widest rounded border border-orange-500/20">
                          {result.detectedScript}
                        </span>
                        {result.confidence && (
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-mono uppercase tracking-widest rounded border border-green-500/20">
                            {Math.round(result.confidence * 100)}% Match
                          </span>
                        )}
                        {result.isSymbol && (
                          <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-mono uppercase tracking-widest rounded border border-blue-500/20">
                            Symbol Detected
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold">{result.originalText}</h2>
                        <button 
                          onClick={() => speak(result.originalText, result.detectedScript)} 
                          disabled={isSpeaking}
                          className={cn(
                            "p-2 bg-card rounded-lg hover:bg-card/80 transition-colors",
                            isSpeaking && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {isSpeaking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Volume2 className="w-5 h-5 text-orange-500" />}
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={reset}
                      className="p-2 hover:bg-card/80 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-foreground/40" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 bg-card rounded-2xl border border-border relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <button 
                            onClick={() => copyToClipboard(result.transliteratedText, "trans")} 
                            className="p-2 bg-background/50 rounded-lg hover:bg-background/80 transition-colors"
                          >
                            {copiedField === "trans" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => speak(result.transliteratedText, targetScript)} 
                            disabled={isSpeaking}
                            className={cn(
                              "p-2 bg-background/50 rounded-lg hover:bg-background/80 transition-colors",
                              isSpeaking && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            {isSpeaking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono">Primary Output: Transliteration ({targetScript})</label>
                          <div className="px-1.5 py-0.5 bg-orange-500/20 text-orange-500 text-[8px] font-bold uppercase rounded border border-orange-500/30">AI4Bharat Engine</div>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-orange-500 leading-tight">
                          {result.transliteratedText}
                        </p>
                      </div>

                      <AnimatePresence>
                        {showTranslation && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-6 bg-card rounded-2xl border border-border relative group overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                              <button 
                                onClick={() => copyToClipboard(result.translatedText, "translat")} 
                                className="p-2 bg-background/50 rounded-lg hover:bg-background/80 transition-colors"
                              >
                                {copiedField === "translat" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                              <button 
                                onClick={() => speak(result.translatedText, targetLanguage)} 
                                disabled={isSpeaking}
                                className={cn(
                                  "p-2 bg-background/50 rounded-lg hover:bg-background/80 transition-colors",
                                  isSpeaking && "opacity-50 cursor-not-allowed"
                                )}
                              >
                                {isSpeaking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
                              </button>
                            </div>
                            <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono block mb-3">Optional Translation ({targetLanguage})</label>
                            <p className="text-2xl md:text-3xl font-bold text-blue-400 leading-tight">
                              {result.translatedText}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-card rounded-2xl border border-border relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <button 
                            onClick={() => speak(result.meaning, meaningLanguage)} 
                            disabled={isSpeaking}
                            className={cn(
                              "p-2 bg-background/50 rounded-lg hover:bg-background/80 transition-colors",
                              isSpeaking && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            {isSpeaking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                        </div>
                        <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono block mb-3">Context & Meaning ({meaningLanguage})</label>
                        <p className="text-lg text-foreground/80 leading-relaxed italic font-serif">
                          "{result.meaning}"
                        </p>
                        
                        {result.culturalContext && (
                          <div className="mt-6 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                            <div className="flex items-center gap-2 text-blue-400 mb-2">
                              <Compass className="w-4 h-4" />
                              <span className="text-[10px] uppercase tracking-widest font-bold">Cultural Layer</span>
                            </div>
                            <p className="text-xs text-foreground/60 leading-relaxed">
                              {result.culturalContext}
                            </p>
                          </div>
                        )}

                        {result.isSymbol && (
                          <div className="mt-6 p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 space-y-4">
                            <div className="flex items-center gap-2 text-orange-500">
                              <Info className="w-4 h-4" />
                              <span className="text-[10px] uppercase tracking-widest font-bold">Symbol Detected</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono block mb-1">Transliteration ({targetScript})</label>
                                <p className="text-xl font-bold text-orange-500">{result.symbolTransliteration || result.transliteratedText}</p>
                              </div>
                              <div>
                                <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono block mb-1">Meaning ({meaningLanguage})</label>
                                <p className="text-sm text-foreground/60">{result.symbolMeaning}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <button 
                          onClick={reset}
                          className="py-4 bg-card hover:bg-card/80 border border-border rounded-2xl flex items-center justify-center gap-3 transition-all font-medium"
                        >
                          <RefreshCw className="w-4 h-4" /> Try Another
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Footer Info */}
          <footer className="pt-12 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-orange-500">
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Script Bridge</span>
                </div>
                <p className="text-xs text-foreground/30 leading-relaxed">
                  AksharSetu preserves pronunciation across scripts, ensuring you can read any signboard in Bharat with confidence.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-500">
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Context Aware</span>
                </div>
                <p className="text-xs text-foreground/30 leading-relaxed">
                  Dual-layer output provides both transliteration for reading and translation for understanding meaning.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Symbol Ready</span>
                </div>
                <p className="text-xs text-foreground/30 leading-relaxed">
                  Recognizes common public symbols and signs, even when text is minimal or absent.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>

      <AnimatePresence>
        {isSymbolLibraryOpen && (
          <motion.div 
            key="symbol-library-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card w-full max-w-5xl h-full max-h-[90vh] rounded-3xl border border-border overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-orange-500" />
                    Symbol Library
                  </h2>
                  <p className="text-foreground/40 text-sm mt-1">Explore common public symbols across scripts and languages.</p>
                </div>
                <button 
                  onClick={() => setIsSymbolLibraryOpen(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-card/80 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-foreground/40" />
                </button>
              </div>

              {/* Filters & Search */}
              <div className="p-6 md:px-8 bg-background/50 border-b border-border space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative md:col-span-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                    <input 
                      type="text"
                      value={symbolSearchQuery}
                      onChange={(e) => setSymbolSearchQuery(e.target.value)}
                      placeholder="Search symbols or meanings..."
                      className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                    <select 
                      value={selectedScriptFilter}
                      onChange={(e) => setSelectedScriptFilter(e.target.value)}
                      className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm"
                    >
                      <option value="All" className="bg-card text-foreground">All Scripts</option>
                      {SCRIPTS.map(s => <option key={`library-script-${s}`} value={s} className="bg-card text-foreground">{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    key="all-categories"
                    onClick={() => toggleCategory("All")}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border",
                      selectedCategories.has("All")
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-card border-border text-foreground/40 hover:text-foreground/60"
                    )}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border",
                        selectedCategories.has(category)
                          ? "bg-orange-500/20 border-orange-500 text-orange-500"
                          : "bg-card border-border text-foreground/40 hover:text-foreground/60"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symbol Grid */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSymbols.map((symbol) => (
                    <motion.div 
                      layout
                      key={symbol.id}
                      className="p-6 bg-card rounded-2xl border border-border hover:border-orange-500/30 transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-4xl p-4 bg-background/50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                          {symbol.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{symbol.name}</h3>
                          <span className="text-[10px] uppercase tracking-widest text-foreground/20 font-mono">{symbol.category}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono block mb-1">Transliteration ({targetScript})</label>
                          <p className="text-base font-bold text-orange-500 leading-tight">
                            {symbol.transliterations[targetScript] || symbol.transliterations["Devanagari (Hindi, Marathi, Konkani, etc.)"]}
                          </p>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono block mb-1">Translation ({targetLanguage})</label>
                          <p className="text-base font-bold text-blue-400 leading-tight">
                            {symbol.meanings[targetLanguage] || symbol.meanings["English"]}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border">
                        <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono block mb-1">Meaning ({meaningLanguage})</label>
                        <p className="text-xs text-foreground/60 italic leading-relaxed">
                          {symbol.meanings[meaningLanguage] || symbol.meanings["English"]}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {filteredSymbols.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <AlertCircle className="w-12 h-12 text-foreground/10 mb-4" />
                    <p className="text-lg font-medium text-foreground/40">No symbols found matching your search.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
