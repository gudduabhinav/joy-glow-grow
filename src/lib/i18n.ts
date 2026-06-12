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
  quiz: { en: "Quiz", hi: "क्विज़" },
  quizDesc: { en: "Test what you know!", hi: "कितना जानते हो?" },
  quizTitle: { en: "Which one is…?", hi: "कौन सा है…?" },
  correct: { en: "Correct! 🎉", hi: "सही! 🎉" },
  wrong: { en: "Try again!", hi: "फिर कोशिश करो!" },
  quizScore: { en: "Quiz Score", hi: "क्विज़ स्कोर" },
  quizDone: { en: "Quiz Complete!", hi: "क्विज़ खत्म!" },
  playAgain: { en: "Play Again", hi: "फिर खेलो" },
  resetProgress: { en: "Reset Progress", hi: "प्रगति मिटाएं" },
  resetConfirm: { en: "Reset all progress?", hi: "सारी प्रगति मिटाएं?" },
  yes: { en: "Yes, Reset", hi: "हाँ, मिटाओ" },
  cancel: { en: "Cancel", hi: "रद्द करो" },
  colorsStat: { en: "Colors learned", hi: "रंग सीखे" },
  animalsStat: { en: "Animals met", hi: "जानवर मिले" },
  fruits: { en: "Fruits", hi: "फल-सब्ज़ी" },
  fruitsDesc: { en: "Yummy fruits & veggies", hi: "फल और सब्ज़ियाँ" },
  body: { en: "Body Parts", hi: "शरीर के अंग" },
  bodyDesc: { en: "Head, eyes, hands!", hi: "सिर, आँखें, हाथ!" },
  fruitsStat: { en: "Fruits learned", hi: "फल सीखे" },
  bodyStat: { en: "Body parts learned", hi: "अंग सीखे" },
  streak: { en: "Day streak", hi: "दिन की streak" },
  tapAnything: { en: "Tap anything!", hi: "कुछ भी छुओ!" },
  // Games
  peekABuddy: { en: "Peek-a-Buddy", hi: "झलक-ए-बडी" },
  peekABuddyDesc: { en: "Find the hiding buddy!", hi: "छिपे बडी को खोजो!" },
  soundMatch: { en: "Sound Match", hi: "आवाज़ मिलाओ" },
  soundMatchDesc: { en: "Match sounds to pictures", hi: "आवाज़ को तस्वीर से मिलाओ" },
  colorMixLab: { en: "Color Mix", hi: "रंग मिलाओ" },
  colorMixDesc: { en: "Create new colors!", hi: "नए रंग बनाओ!" },
  phonicsFarm: { en: "Phonics Farm", hi: "फोनिक्स फार्म" },
  phonicsFarmDesc: { en: "Hear & match words", hi: "सुनो और शब्द मिलाओ" },
  traceRace: { en: "Trace Race", hi: "लेखन दौड़" },
  traceRaceDesc: { en: "Race against the clock", hi: "समय से पहले लिखो!" },
  rhythmTap: { en: "Rhythm Tap", hi: "रिदम टैप" },
  rhythmTapDesc: { en: "Tap to the beat!", hi: "बीट पर टैप करो!" },
  puzzleSlide: { en: "Puzzle Slide", hi: "पज़ल स्लाइड" },
  puzzleSlideDesc: { en: "Solve the puzzle!", hi: "पज़ल को हल करो!" },
  shapeBuilder: { en: "Shape Builder", hi: "आकार बनाओ" },
  shapeBuilderDesc: { en: "Build with shapes!", hi: "आकारों से बनाओ!" },
  treasureMap: { en: "Treasure Map", hi: "खज़ाने का नक्शा" },
  treasureMapDesc: { en: "Follow directions!", hi: "दिशाओं को सुनो!" },
  memoryGarden: { en: "Memory Garden", hi: "स्मृति का बाग़" },
  memoryGardenDesc: { en: "Flip & match pairs", hi: "पत्तियों को उलटो!" },
  stickerStudio: { en: "Sticker Studio", hi: "स्टिकर स्टूडियो" },
  stickerStudioDesc: { en: "Collect & decorate!", hi: "स्टिकर जमा करो!" },
  dailyChallenge: { en: "Daily Challenge", hi: "रोज़ की चुनौती" },
  dailyChallengeDesc: { en: "One game per day!", hi: "हर दिन एक खेल!" },
  leaderboard: { en: "Leaderboard", hi: "स्कोर बोर्ड" },
  leaderboardDesc: { en: "See who's winning!", hi: "कौन जीत रहा है?" },
  storyBuilder: { en: "Story Builder", hi: "कहानी बनाओ" },
  storyBuilderDesc: { en: "Create your story!", hi: "अपनी कहानी बनाओ!" },
  rewardShop: { en: "Reward Shop", hi: "पुरस्कार की दुकान" },
  rewardShopDesc: { en: "Spend your stars!", hi: "तारे खर्च करो!" },
  // Game-specific
  found: { en: "Found it! 🎉", hi: "मिल गया! 🎉" },
  tryAgain: { en: "Try again!", hi: "फिर कोशिश करो!" },
  complete: { en: "Complete!", hi: "पूरा हो गया!" },
  stars: { en: "Stars", hi: "तारे" },
  earned: { en: "Earned", hi: "कमाए" },
  newRecord: { en: "New Record!", hi: "नया रिकॉर्ड!" },
  selectProfile: { en: "Select Profile", hi: "प्रोफाइल चुनो" },
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

export const FRUITS_DATA: { id: string; en: string; hi: string; emoji: string }[] = [
  { id: "apple",      en: "Apple",      hi: "सेब",        emoji: "🍎" },
  { id: "mango",      en: "Mango",      hi: "आम",         emoji: "🥭" },
  { id: "banana",     en: "Banana",     hi: "केला",       emoji: "🍌" },
  { id: "grapes",     en: "Grapes",     hi: "अंगूर",      emoji: "🍇" },
  { id: "orange",     en: "Orange",     hi: "संतरा",      emoji: "🍊" },
  { id: "watermelon", en: "Watermelon", hi: "तरबूज",      emoji: "🍉" },
  { id: "strawberry", en: "Strawberry", hi: "स्ट्रॉबेरी", emoji: "🍓" },
  { id: "pineapple",  en: "Pineapple",  hi: "अनानास",     emoji: "🍍" },
  { id: "tomato",     en: "Tomato",     hi: "टमाटर",      emoji: "🍅" },
  { id: "carrot",     en: "Carrot",     hi: "गाजर",       emoji: "🥕" },
  { id: "broccoli",   en: "Broccoli",   hi: "हरी गोभी",   emoji: "🥦" },
  { id: "corn",       en: "Corn",       hi: "मक्का",      emoji: "🌽" },
];

export const BODY_DATA: { id: string; en: string; hi: string; emoji: string }[] = [
  { id: "eyes",   en: "Eyes",   hi: "आँखें",  emoji: "👀" },
  { id: "nose",   en: "Nose",   hi: "नाक",    emoji: "👃" },
  { id: "mouth",  en: "Mouth",  hi: "मुँह",   emoji: "👄" },
  { id: "ears",   en: "Ears",   hi: "कान",    emoji: "👂" },
  { id: "hair",   en: "Hair",   hi: "बाल",    emoji: "💇" },
  { id: "hands",  en: "Hands",  hi: "हाथ",   emoji: "🙌" },
  { id: "feet",   en: "Feet",   hi: "पैर",    emoji: "🦶" },
  { id: "tummy",  en: "Tummy",  hi: "पेट",    emoji: "🫃" },
  { id: "heart",  en: "Heart",  hi: "दिल",    emoji: "❤️" },
  { id: "head",   en: "Head",   hi: "सिर",    emoji: "🗣️" },
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

// Hindi Varnamala — full set (vowels, consonants & sanyukt akshar) for the bilingual ABC mode
const G = ["bg-gradient-abc", "bg-gradient-numbers", "bg-gradient-shapes", "bg-gradient-tracing", "bg-gradient-colors", "bg-gradient-animals"];
const HINDI_RAW: { letter: string; word: string; wordEn: string; emoji: string }[] = [
  // Vowels (स्वर)
  { letter: "अ", word: "अनार", wordEn: "Pomegranate", emoji: "🍎" },
  { letter: "आ", word: "आम", wordEn: "Mango", emoji: "🥭" },
  { letter: "इ", word: "इमली", wordEn: "Tamarind", emoji: "🌿" },
  { letter: "ई", word: "ईख", wordEn: "Sugarcane", emoji: "🎋" },
  { letter: "उ", word: "उल्लू", wordEn: "Owl", emoji: "🦉" },
  { letter: "ऊ", word: "ऊन", wordEn: "Wool", emoji: "🧶" },
  { letter: "ऋ", word: "ऋषि", wordEn: "Sage", emoji: "🧘" },
  { letter: "ए", word: "एड़ी", wordEn: "Heel", emoji: "🦶" },
  { letter: "ऐ", word: "ऐनक", wordEn: "Glasses", emoji: "👓" },
  { letter: "ओ", word: "ओखली", wordEn: "Mortar", emoji: "🥣" },
  { letter: "औ", word: "औरत", wordEn: "Woman", emoji: "👩" },
  { letter: "अं", word: "अंगूर", wordEn: "Grapes", emoji: "🍇" },
  { letter: "अः", word: "प्रातः", wordEn: "Morning", emoji: "🌅" },
  { letter: "अँ", word: "अँगूठी", wordEn: "Ring", emoji: "💍" },
  // क वर्ग
  { letter: "क", word: "कमल", wordEn: "Lotus", emoji: "🪷" },
  { letter: "ख", word: "खरगोश", wordEn: "Rabbit", emoji: "🐰" },
  { letter: "ग", word: "गाय", wordEn: "Cow", emoji: "🐮" },
  { letter: "घ", word: "घर", wordEn: "House", emoji: "🏠" },
  { letter: "ङ", word: "वाङ्मय", wordEn: "Literature", emoji: "📚" },
  // च वर्ग
  { letter: "च", word: "चम्मच", wordEn: "Spoon", emoji: "🥄" },
  { letter: "छ", word: "छतरी", wordEn: "Umbrella", emoji: "☂️" },
  { letter: "ज", word: "जहाज", wordEn: "Ship", emoji: "🚢" },
  { letter: "झ", word: "झंडा", wordEn: "Flag", emoji: "🚩" },
  { letter: "ञ", word: "ज्ञान", wordEn: "Knowledge", emoji: "🧠" },
  // ट वर्ग
  { letter: "ट", word: "टमाटर", wordEn: "Tomato", emoji: "🍅" },
  { letter: "ठ", word: "ठेला", wordEn: "Cart", emoji: "🛒" },
  { letter: "ड", word: "डमरू", wordEn: "Drum", emoji: "🥁" },
  { letter: "ढ", word: "ढोल", wordEn: "Dhol", emoji: "🪘" },
  { letter: "ण", word: "बाण", wordEn: "Arrow", emoji: "🏹" },
  // त वर्ग
  { letter: "त", word: "तितली", wordEn: "Butterfly", emoji: "🦋" },
  { letter: "थ", word: "थाली", wordEn: "Plate", emoji: "🍽️" },
  { letter: "द", word: "दीपक", wordEn: "Lamp", emoji: "🪔" },
  { letter: "ध", word: "धनुष", wordEn: "Bow", emoji: "🏹" },
  { letter: "न", word: "नाव", wordEn: "Boat", emoji: "⛵" },
  // प वर्ग
  { letter: "प", word: "पतंग", wordEn: "Kite", emoji: "🪁" },
  { letter: "फ", word: "फूल", wordEn: "Flower", emoji: "🌸" },
  { letter: "ब", word: "बकरी", wordEn: "Goat", emoji: "🐐" },
  { letter: "भ", word: "भालू", wordEn: "Bear", emoji: "🐻" },
  { letter: "म", word: "मछली", wordEn: "Fish", emoji: "🐟" },
  // अंतस्थ
  { letter: "य", word: "यज्ञ", wordEn: "Yajna", emoji: "🔥" },
  { letter: "र", word: "रथ", wordEn: "Chariot", emoji: "🛺" },
  { letter: "ल", word: "लड्डू", wordEn: "Laddu", emoji: "🟡" },
  { letter: "व", word: "वन", wordEn: "Forest", emoji: "🌳" },
  // ऊष्म
  { letter: "श", word: "शेर", wordEn: "Lion", emoji: "🦁" },
  { letter: "ष", word: "षट्कोण", wordEn: "Hexagon", emoji: "⬡" },
  { letter: "स", word: "सूरज", wordEn: "Sun", emoji: "☀️" },
  { letter: "ह", word: "हाथी", wordEn: "Elephant", emoji: "🐘" },
  // संयुक्त
  { letter: "क्ष", word: "क्षत्रिय", wordEn: "Warrior", emoji: "🛡️" },
  { letter: "त्र", word: "त्रिशूल", wordEn: "Trident", emoji: "🔱" },
  { letter: "ज्ञ", word: "ज्ञानी", wordEn: "Wise", emoji: "🧠" },
];
export const HINDI_LETTERS = HINDI_RAW.map((x, i) => ({ ...x, gradient: G[i % G.length] }));
