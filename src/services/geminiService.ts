import { GoogleGenAI, Type, Modality, ThinkingLevel } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || "dummy_key";
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

function handleGeminiError(error: any): never {
  console.error("Gemini API Error:", error);
  
  const message = error?.message || "";
  const status = error?.status || "";
  
  if (status === 429 || message.includes("429") || message.includes("RESOURCE_EXHAUSTED") || message.includes("quota")) {
    throw new Error("API Quota Exceeded: You've reached the limit for Gemini API requests. Please try again later.");
  }
  
  if (message.includes("API_KEY_INVALID") || message.includes("invalid api key")) {
    throw new Error("Invalid API Key: Please check your configuration.");
  }

  throw new Error(message || "An unexpected error occurred with the AI service.");
}

export interface TransliterationResult {
  originalText: string;
  detectedScript: string;
  transliteratedText: string;
  translatedText: string;
  meaning: string;
  isSymbol?: boolean;
  symbolMeaning?: string;
  symbolTransliteration?: string;
  culturalContext?: string;
  quickPhrases?: string[];
  confidence?: number;
  boundingBox?: {
    ymin: number;
    xmin: number;
    ymax: number;
    xmax: number;
  };
}

export async function generateSpeech(text: string, languageHint?: string): Promise<string> {
  try {
    const ai = getAI();
    
    // Clean up language hint to be more model-friendly
    let cleanLanguage = "English";
    if (languageHint) {
      if (languageHint.includes("Hindi") || languageHint.includes("Devanagari")) cleanLanguage = "Hindi";
      else if (languageHint.includes("Bengali")) cleanLanguage = "Bengali";
      else if (languageHint.includes("Tamil")) cleanLanguage = "Tamil";
      else if (languageHint.includes("Telugu")) cleanLanguage = "Telugu";
      else if (languageHint.includes("Marathi")) cleanLanguage = "Marathi";
      else if (languageHint.includes("Gujarati")) cleanLanguage = "Gujarati";
      else if (languageHint.includes("Kannada")) cleanLanguage = "Kannada";
      else if (languageHint.includes("Malayalam")) cleanLanguage = "Malayalam";
      else if (languageHint.includes("Punjabi")) cleanLanguage = "Punjabi";
      else if (languageHint.includes("Urdu")) cleanLanguage = "Urdu";
      else cleanLanguage = languageHint.split(' ')[0]; // Take first word if complex
    }

    const prompt = `Speak the following text clearly in ${cleanLanguage}: ${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
            prebuiltVoiceConfig: { voiceName: 'Zephyr' },
          },
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("No response parts received from Gemini TTS");
    }

    const audioPart = parts.find(p => p.inlineData?.data);
    const base64Audio = audioPart?.inlineData?.data;

    if (!base64Audio) {
      // Check if there's a text part explaining the failure
      const textPart = parts.find(p => p.text);
      if (textPart?.text) {
        throw new Error(`Gemini TTS failed: ${textPart.text}`);
      }
      throw new Error("Failed to generate audio data from Gemini TTS");
    }
    return base64Audio;
  } catch (error) {
    handleGeminiError(error);
  }
}

export async function processImage(base64Image: string, targetScript: string, targetLanguage: string, meaningLanguage: string): Promise<TransliterationResult> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image.split(",")[1] || base64Image,
              },
            },
            {
              text: `Analyze this image for AksharSetu.
              
              CORE TASK:
              1. Extract text (OCR) ONLY from the most prominent road sign or public signboard.
              2. Detect input script.
              3. Transliterate into ${targetScript === "Auto Detect" ? "Devanagari" : targetScript}.
              4. Translate into ${targetLanguage === "Auto Detect" ? "English" : targetLanguage}.
              5. Provide brief meaning in ${meaningLanguage}.
              6. If it's a symbol, identify it and explain meaning.
              7. Provide 'boundingBox': [ymin, xmin, ymax, xmax] (0-1000).
              8. Provide 'confidence' (0-1).
              
              Return JSON format.`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        maxOutputTokens: 1024,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originalText: { type: Type.STRING },
            detectedScript: { type: Type.STRING },
            transliteratedText: { type: Type.STRING, description: "The text transliterated into the target script." },
            translatedText: { type: Type.STRING },
            meaning: { type: Type.STRING },
            isSymbol: { type: Type.BOOLEAN },
            symbolMeaning: { type: Type.STRING },
            symbolTransliteration: { type: Type.STRING },
            culturalContext: { type: Type.STRING },
            quickPhrases: { type: Type.ARRAY, items: { type: Type.STRING } },
            confidence: { type: Type.NUMBER },
            boundingBox: {
              type: Type.OBJECT,
              properties: {
                ymin: { type: Type.NUMBER },
                xmin: { type: Type.NUMBER },
                ymax: { type: Type.NUMBER },
                xmax: { type: Type.NUMBER },
              },
              required: ["ymin", "xmin", "ymax", "xmax"],
            },
          },
          required: ["originalText", "detectedScript", "transliteratedText", "translatedText", "meaning"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    handleGeminiError(error);
  }
}

export interface NearbyPlacesResult {
  text: string;
  places: { title: string; uri: string }[];
}

export async function getNearbyPlaces(latitude: number, longitude: number): Promise<NearbyPlacesResult> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "What are some interesting places to visit nearby? Give me a short list with brief descriptions.",
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude,
              longitude
            }
          }
        }
      },
    });

    const text = response.text || "No recommendations found.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const places: { title: string; uri: string }[] = [];
    const seenUris = new Set<string>();
    
    chunks.forEach((chunk: any) => {
      if (chunk.maps?.uri && chunk.maps?.title) {
        if (!seenUris.has(chunk.maps.uri)) {
          seenUris.add(chunk.maps.uri);
          places.push({
            title: chunk.maps.title,
            uri: chunk.maps.uri
          });
        }
      }
    });

    return { text, places };
  } catch (error) {
    handleGeminiError(error);
  }
}

export async function getPlacesByCity(cityName: string): Promise<NearbyPlacesResult> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `What are the top 5 must-visit places in ${cityName}, India? Provide a short list with brief descriptions and links.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || `No recommendations found for ${cityName}.`;
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const places: { title: string; uri: string }[] = [];
    const seenUris = new Set<string>();
    
    chunks.forEach((chunk: any) => {
      if (chunk.web?.uri && chunk.web?.title) {
        if (!seenUris.has(chunk.web.uri)) {
          seenUris.add(chunk.web.uri);
          places.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      }
    });

    return { text, places };
  } catch (error) {
    handleGeminiError(error);
  }
}

export async function processText(text: string, targetScript: string, targetLanguage: string, meaningLanguage: string): Promise<TransliterationResult> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Process this text for AksharSetu: "${text}"
      
      TECHNICAL CONTEXT:
      - The core engine is AI4Bharat for high-fidelity script transliteration.
      
      CORE DIRECTIVE:
      - The primary and most critical output is TRANSLITERATION (preserving phonetic continuity).
      - TRANSLATION is a secondary, optional layer.
      
      INSTRUCTIONS:
      1. Detect the input script.
      2. If targetScript is "Auto Detect", choose the most logical target script for a general Indian audience (usually Devanagari or Latin depending on context).
      3. Transliterate it into the chosen target script using phonetic mapping.
      4. Translate it into ${targetLanguage}. If targetLanguage is "Auto Detect", choose English or the most relevant local language.
      5. Provide a brief explanation of the context or meaning in ${meaningLanguage}.
      6. Provide 'culturalContext': Any cultural nuances or local usage tips in ${meaningLanguage}.
      7. Provide 'quickPhrases': Detect if it contains common signs or emergency phrases.
      8. Provide a 'confidence' score between 0 and 1.
      
      Return the result in JSON format.`,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        maxOutputTokens: 1024,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originalText: { type: Type.STRING },
            detectedScript: { type: Type.STRING },
            transliteratedText: { type: Type.STRING, description: "The text transliterated into the target script." },
            translatedText: { type: Type.STRING },
            meaning: { type: Type.STRING },
            culturalContext: { type: Type.STRING },
            quickPhrases: { type: Type.ARRAY, items: { type: Type.STRING } },
            confidence: { type: Type.NUMBER },
          },
          required: ["originalText", "detectedScript", "transliteratedText", "translatedText", "meaning"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    handleGeminiError(error);
  }
}
