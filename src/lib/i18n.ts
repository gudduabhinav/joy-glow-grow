// Tiny Genius i18n — English + Hindi (हिन्दी)
// Lightweight, no deps. Persists to localStorage and notifies subscribers.
import { useSyncExternalStore } from "react";

export type Lang = "en" | "hi";
const KEY = "tinygenius.lang";
const listeners = new Set<() => void>();
let current: Lang = "en";

if (typeof window !== "undefined") {
  try {
    const saved = window.localStorage.getItem(KEY) as Lang | null;
    if (saved === "en" || saved === "hi") current = saved;
    else if (navigator.language?.toLowerCase().startsWith("hi")) current = "hi";
  } catch { /* noop */ }
}

export function getLang(): Lang { return current; }
export function setLang(l: Lang) {
  current = l;
  try { window.localStorage.setItem(KEY, l); } catch { /* noop */ }
  listeners.forEach((cb) => cb());
}
function subscribe(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb); }; }

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getLang, () => "en");
}

export const speechLang: Record<Lang, string> = { en: "en-US", hi: "hi-IN" };

// Dictionary
type Dict = Record<Lang, string>;
const D = {
  appTagline: { en: "Tap anything — let's play!", hi: "कुछ भी छुओ — चलो खेलें!" },
  parents: { en: "Parents", hi: "माता-पिता" },
  home: { en: "Home", hi: "घर" },
  abc: { en: "ABC", hi: "क ख ग" },
  abcDesc: { en: "Letters & sounds", hi: "अक्षर और आवाज़" },
  numbers: { en: "123", hi: "१२३" },
  numbersDesc: { en: "Count to 10", hi: "१ से १० तक" },
  trace: { en: "Trace", hi: "लिखो" },
  traceDesc: { en: "Write & draw", hi: "लिखो और बनाओ" },
  shapes: { en: "Shapes", hi: "आकार" },
  shapesDesc: { en: "Match & learn", hi: "मिलाओ और सीखो" },
  colors: { en: "Colors", hi: "रंग" },
  colorsDesc: { en: "Splash & play", hi: "रंगों से खेलो" },
  animals: { en: "Animals", hi: "जानवर" },
  animalsDesc: { en: "Sounds & names", hi: "आवाज़ और नाम" },
  rhymes: { en: "Rhymes", hi: "बाल कविताएं" },
  rhymesDesc: { en: "Fun songs & poems", hi: "मज़ेदार कविताएं" },
  footer: { en: "Ad-free • Safe for ages 1–3 • Works offline", hi: "विज्ञापन मुक्त • १-३ साल के लिए • ऑफलाइन भी" },
  hello: { en: "Hi! Let's learn together!", hi: "नमस्ते! चलो साथ सीखें!" },
  praise: {
    en: "Amazing! Wonderful! Great job! You did it!",
    hi: "वाह! बहुत खूब! शाबाश! तुमने कर दिखाया!",
  },
  youDidIt: { en: "You did it!", hi: "शाबाश!" },
  next: { en: "Next", hi: "आगे" },
  back: { en: "Back", hi: "वापस" },
  parentCheck: { en: "Parent check", hi: "अभिभावक जाँच" },
  parentCheckSub: { en: "Solve this to continue.", hi: "जारी रखने के लिए हल करें।" },
  unlock: { en: "Unlock", hi: "खोलें" },
  starsEarned: { en: "Stars earned", hi: "तारे मिले" },
  lettersLearned: { en: "Letters learned", hi: "अक्षर सीखे" },
  itemsTraced: { en: "Items traced", hi: "लिखे हुए" },
  numbersStat: { en: "Numbers", hi: "नंबर" },
  lettersMastered: { en: "Letters mastered", hi: "सीखे हुए अक्षर" },
  nothingYet: { en: "Nothing yet — give it a try!", hi: "अभी कुछ नहीं — कोशिश करो!" },
  parentDashboard: { en: "Parent Dashboard", hi: "अभिभावक डैशबोर्ड" },
  tapToHear: { en: "Tap to hear", hi: "सुनने के लिए छुओ" },
} satisfies Record<string, Dict>;

export type TKey = keyof typeof D;
export function t(key: TKey, lang: Lang = current): string {
  return D[key][lang];
}

// Module-specific data tables (bilingual labels)

export const NUMBERS_DATA: { n: number; en: string; hi: string; hiNum: string; emoji: string }[] = [
  { n: 1, en: "One", hi: "एक", hiNum: "१", emoji: "🍎" },
  { n: 2, en: "Two", hi: "दो", hiNum: "२", emoji: "🍌" },
  { n: 3, en: "Three", hi: "तीन", hiNum: "३", emoji: "🐱" },
  { n: 4, en: "Four", hi: "चार", hiNum: "४", emoji: "⭐" },
  { n: 5, en: "Five", hi: "पाँच", hiNum: "५", emoji: "🌸" },
  { n: 6, en: "Six", hi: "छह", hiNum: "६", emoji: "🎈" },
  { n: 7, en: "Seven", hi: "सात", hiNum: "७", emoji: "🍓" },
  { n: 8, en: "Eight", hi: "आठ", hiNum: "८", emoji: "🦋" },
  { n: 9, en: "Nine", hi: "नौ", hiNum: "९", emoji: "🐢" },
  { n: 10, en: "Ten", hi: "दस", hiNum: "१०", emoji: "🐬" },
];

export const SHAPES_DATA: { id: string; en: string; hi: string; emoji: string; svg: string }[] = [
  { id: "circle", en: "Circle", hi: "वृत्त", emoji: "⚪", svg: "circle" },
  { id: "square", en: "Square", hi: "वर्ग", emoji: "🟦", svg: "square" },
  { id: "triangle", en: "Triangle", hi: "त्रिकोण", emoji: "🔺", svg: "triangle" },
  { id: "star", en: "Star", hi: "तारा", emoji: "⭐", svg: "star" },
  { id: "heart", en: "Heart", hi: "दिल", emoji: "❤️", svg: "heart" },
  { id: "rectangle", en: "Rectangle", hi: "आयत", emoji: "▬", svg: "rectangle" },
];

export const COLORS_DATA: { id: string; en: string; hi: string; hex: string }[] = [
  { id: "red", en: "Red", hi: "लाल", hex: "#FF4D4D" },
  { id: "orange", en: "Orange", hi: "नारंगी", hex: "#FF9F43" },
  { id: "yellow", en: "Yellow", hi: "पीला", hex: "#FFD93D" },
  { id: "green", en: "Green", hi: "हरा", hex: "#5BD17B" },
  { id: "blue", en: "Blue", hi: "नीला", hex: "#4D9DFF" },
  { id: "purple", en: "Purple", hi: "बैंगनी", hex: "#A66BFF" },
  { id: "pink", en: "Pink", hi: "गुलाबी", hex: "#FF7AB6" },
  { id: "brown", en: "Brown", hi: "भूरा", hex: "#A0673B" },
  { id: "black", en: "Black", hi: "काला", hex: "#2A2A2A" },
];

export const ANIMALS_DATA: { id: string; en: string; hi: string; emoji: string; soundEn: string; soundHi: string }[] = [
  { id: "lion", en: "Lion", hi: "शेर", emoji: "🦁", soundEn: "Roar!", soundHi: "दहाड़!" },
  { id: "dog", en: "Dog", hi: "कुत्ता", emoji: "🐶", soundEn: "Woof woof!", soundHi: "भौं भौं!" },
  { id: "cat", en: "Cat", hi: "बिल्ली", emoji: "🐱", soundEn: "Meow!", soundHi: "म्याऊँ!" },
  { id: "cow", en: "Cow", hi: "गाय", emoji: "🐮", soundEn: "Moo!", soundHi: "अम्बा!" },
  { id: "elephant", en: "Elephant", hi: "हाथी", emoji: "🐘", soundEn: "Trumpet!", soundHi: "चिंघाड़!" },
  { id: "duck", en: "Duck", hi: "बत्तख", emoji: "🦆", soundEn: "Quack quack!", soundHi: "क्वैक क्वैक!" },
  { id: "horse", en: "Horse", hi: "घोड़ा", emoji: "🐴", soundEn: "Neigh!", soundHi: "हिनहिन!" },
  { id: "monkey", en: "Monkey", hi: "बंदर", emoji: "🐵", soundEn: "Oo oo aa aa!", soundHi: "हू हू!" },
];

// Hindi vowels & key consonants (Varnamala) for the bilingual ABC mode
export const HINDI_LETTERS: { letter: string; word: string; wordEn: string; emoji: string; gradient: string }[] = [
  { letter: "अ", word: "अनार", wordEn: "Pomegranate", emoji: "🍎", gradient: "bg-gradient-abc" },
  { letter: "आ", word: "आम", wordEn: "Mango", emoji: "🥭", gradient: "bg-gradient-numbers" },
  { letter: "इ", word: "इमली", wordEn: "Tamarind", emoji: "🌿", gradient: "bg-gradient-shapes" },
  { letter: "उ", word: "उल्लू", wordEn: "Owl", emoji: "🦉", gradient: "bg-gradient-tracing" },
  { letter: "ए", word: "एड़ी", wordEn: "Heel", emoji: "🦶", gradient: "bg-gradient-colors" },
  { letter: "ओ", word: "ओखली", wordEn: "Mortar", emoji: "🥣", gradient: "bg-gradient-animals" },
  { letter: "क", word: "कमल", wordEn: "Lotus", emoji: "🪷", gradient: "bg-gradient-abc" },
  { letter: "ख", word: "खरगोश", wordEn: "Rabbit", emoji: "🐰", gradient: "bg-gradient-numbers" },
  { letter: "ग", word: "गाय", wordEn: "Cow", emoji: "🐮", gradient: "bg-gradient-shapes" },
  { letter: "घ", word: "घर", wordEn: "House", emoji: "🏠", gradient: "bg-gradient-tracing" },
  { letter: "च", word: "चम्मच", wordEn: "Spoon", emoji: "🥄", gradient: "bg-gradient-colors" },
  { letter: "छ", word: "छतरी", wordEn: "Umbrella", emoji: "☂️", gradient: "bg-gradient-animals" },
  { letter: "ज", word: "जहाज", wordEn: "Ship", emoji: "🚢", gradient: "bg-gradient-abc" },
  { letter: "त", word: "तितली", wordEn: "Butterfly", emoji: "🦋", gradient: "bg-gradient-numbers" },
  { letter: "द", word: "दीपक", wordEn: "Lamp", emoji: "🪔", gradient: "bg-gradient-shapes" },
  { letter: "न", word: "नाव", wordEn: "Boat", emoji: "⛵", gradient: "bg-gradient-tracing" },
  { letter: "प", word: "पतंग", wordEn: "Kite", emoji: "🪁", gradient: "bg-gradient-colors" },
  { letter: "फ", word: "फूल", wordEn: "Flower", emoji: "🌸", gradient: "bg-gradient-animals" },
  { letter: "ब", word: "बकरी", wordEn: "Goat", emoji: "🐐", gradient: "bg-gradient-abc" },
  { letter: "म", word: "मछली", wordEn: "Fish", emoji: "🐟", gradient: "bg-gradient-numbers" },
  { letter: "य", word: "यज्ञ", wordEn: "Yajna", emoji: "🔥", gradient: "bg-gradient-shapes" },
  { letter: "र", word: "रथ", wordEn: "Chariot", emoji: "🛺", gradient: "bg-gradient-tracing" },
  { letter: "ल", word: "लड्डू", wordEn: "Laddu", emoji: "🟡", gradient: "bg-gradient-colors" },
  { letter: "व", word: "वन", wordEn: "Forest", emoji: "🌳", gradient: "bg-gradient-animals" },
  { letter: "श", word: "शेर", wordEn: "Lion", emoji: "🦁", gradient: "bg-gradient-abc" },
  { letter: "स", word: "सूरज", wordEn: "Sun", emoji: "☀️", gradient: "bg-gradient-numbers" },
  { letter: "ह", word: "हाथी", wordEn: "Elephant", emoji: "🐘", gradient: "bg-gradient-shapes" },
];
