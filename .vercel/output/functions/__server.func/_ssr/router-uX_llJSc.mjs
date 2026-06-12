import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-v8pFIqHD.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const KEY$1 = "tinygenius.lang";
const listeners = /* @__PURE__ */ new Set();
let current = "en";
if (typeof window !== "undefined") {
  try {
    const saved = window.localStorage.getItem(KEY$1);
    if (saved === "en" || saved === "hi") current = saved;
    else if (navigator.language?.toLowerCase().startsWith("hi")) current = "hi";
  } catch {
  }
}
function getLang() {
  return current;
}
function setLang(l) {
  current = l;
  try {
    window.localStorage.setItem(KEY$1, l);
  } catch {
  }
  listeners.forEach((cb) => cb());
}
function subscribe(cb) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function useLang() {
  return reactExports.useSyncExternalStore(subscribe, getLang, () => "en");
}
const speechLang = { en: "en-US", hi: "hi-IN" };
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
    hi: "वाह! बहुत खूब! शाबाश! तुमने कर दिखाया!"
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
  selectProfile: { en: "Select Profile", hi: "प्रोफाइल चुनो" }
};
function t(key, lang = current) {
  return D[key][lang];
}
const NUMBERS_DATA = [
  { n: 1, en: "One", hi: "एक", hiNum: "१", emoji: "🍎" },
  { n: 2, en: "Two", hi: "दो", hiNum: "२", emoji: "🍌" },
  { n: 3, en: "Three", hi: "तीन", hiNum: "३", emoji: "🐱" },
  { n: 4, en: "Four", hi: "चार", hiNum: "४", emoji: "⭐" },
  { n: 5, en: "Five", hi: "पाँच", hiNum: "५", emoji: "🌸" },
  { n: 6, en: "Six", hi: "छह", hiNum: "६", emoji: "🎈" },
  { n: 7, en: "Seven", hi: "सात", hiNum: "७", emoji: "🍓" },
  { n: 8, en: "Eight", hi: "आठ", hiNum: "८", emoji: "🦋" },
  { n: 9, en: "Nine", hi: "नौ", hiNum: "९", emoji: "🐢" },
  { n: 10, en: "Ten", hi: "दस", hiNum: "१०", emoji: "🐬" }
];
const SHAPES_DATA = [
  { id: "circle", en: "Circle", hi: "वृत्त", emoji: "⚪", svg: "circle" },
  { id: "square", en: "Square", hi: "वर्ग", emoji: "🟦", svg: "square" },
  { id: "triangle", en: "Triangle", hi: "त्रिकोण", emoji: "🔺", svg: "triangle" },
  { id: "star", en: "Star", hi: "तारा", emoji: "⭐", svg: "star" },
  { id: "heart", en: "Heart", hi: "दिल", emoji: "❤️", svg: "heart" },
  { id: "rectangle", en: "Rectangle", hi: "आयत", emoji: "▬", svg: "rectangle" }
];
const COLORS_DATA = [
  { id: "red", en: "Red", hi: "लाल", hex: "#FF4D4D" },
  { id: "orange", en: "Orange", hi: "नारंगी", hex: "#FF9F43" },
  { id: "yellow", en: "Yellow", hi: "पीला", hex: "#FFD93D" },
  { id: "green", en: "Green", hi: "हरा", hex: "#5BD17B" },
  { id: "blue", en: "Blue", hi: "नीला", hex: "#4D9DFF" },
  { id: "purple", en: "Purple", hi: "बैंगनी", hex: "#A66BFF" },
  { id: "pink", en: "Pink", hi: "गुलाबी", hex: "#FF7AB6" },
  { id: "brown", en: "Brown", hi: "भूरा", hex: "#A0673B" },
  { id: "black", en: "Black", hi: "काला", hex: "#2A2A2A" }
];
const FRUITS_DATA = [
  { id: "apple", en: "Apple", hi: "सेब", emoji: "🍎" },
  { id: "mango", en: "Mango", hi: "आम", emoji: "🥭" },
  { id: "banana", en: "Banana", hi: "केला", emoji: "🍌" },
  { id: "grapes", en: "Grapes", hi: "अंगूर", emoji: "🍇" },
  { id: "orange", en: "Orange", hi: "संतरा", emoji: "🍊" },
  { id: "watermelon", en: "Watermelon", hi: "तरबूज", emoji: "🍉" },
  { id: "strawberry", en: "Strawberry", hi: "स्ट्रॉबेरी", emoji: "🍓" },
  { id: "pineapple", en: "Pineapple", hi: "अनानास", emoji: "🍍" },
  { id: "tomato", en: "Tomato", hi: "टमाटर", emoji: "🍅" },
  { id: "carrot", en: "Carrot", hi: "गाजर", emoji: "🥕" },
  { id: "broccoli", en: "Broccoli", hi: "हरी गोभी", emoji: "🥦" },
  { id: "corn", en: "Corn", hi: "मक्का", emoji: "🌽" }
];
const BODY_DATA = [
  { id: "eyes", en: "Eyes", hi: "आँखें", emoji: "👀" },
  { id: "nose", en: "Nose", hi: "नाक", emoji: "👃" },
  { id: "mouth", en: "Mouth", hi: "मुँह", emoji: "👄" },
  { id: "ears", en: "Ears", hi: "कान", emoji: "👂" },
  { id: "hair", en: "Hair", hi: "बाल", emoji: "💇" },
  { id: "hands", en: "Hands", hi: "हाथ", emoji: "🙌" },
  { id: "feet", en: "Feet", hi: "पैर", emoji: "🦶" },
  { id: "tummy", en: "Tummy", hi: "पेट", emoji: "🫃" },
  { id: "heart", en: "Heart", hi: "दिल", emoji: "❤️" },
  { id: "head", en: "Head", hi: "सिर", emoji: "🗣️" }
];
const ANIMALS_DATA = [
  { id: "lion", en: "Lion", hi: "शेर", emoji: "🦁", soundEn: "Roar!", soundHi: "दहाड़!" },
  { id: "dog", en: "Dog", hi: "कुत्ता", emoji: "🐶", soundEn: "Woof woof!", soundHi: "भौं भौं!" },
  { id: "cat", en: "Cat", hi: "बिल्ली", emoji: "🐱", soundEn: "Meow!", soundHi: "म्याऊँ!" },
  { id: "cow", en: "Cow", hi: "गाय", emoji: "🐮", soundEn: "Moo!", soundHi: "अम्बा!" },
  { id: "elephant", en: "Elephant", hi: "हाथी", emoji: "🐘", soundEn: "Trumpet!", soundHi: "चिंघाड़!" },
  { id: "duck", en: "Duck", hi: "बत्तख", emoji: "🦆", soundEn: "Quack quack!", soundHi: "क्वैक क्वैक!" },
  { id: "horse", en: "Horse", hi: "घोड़ा", emoji: "🐴", soundEn: "Neigh!", soundHi: "हिनहिन!" },
  { id: "monkey", en: "Monkey", hi: "बंदर", emoji: "🐵", soundEn: "Oo oo aa aa!", soundHi: "हू हू!" }
];
const G = ["bg-gradient-abc", "bg-gradient-numbers", "bg-gradient-shapes", "bg-gradient-tracing", "bg-gradient-colors", "bg-gradient-animals"];
const HINDI_RAW = [
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
  { letter: "ज्ञ", word: "ज्ञानी", wordEn: "Wise", emoji: "🧠" }
];
const HINDI_LETTERS = HINDI_RAW.map((x, i) => ({ ...x, gradient: G[i % G.length] }));
let cachedVoices = null;
function getVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  if (cachedVoices && cachedVoices.length) return cachedVoices;
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}
function pickBestVoice(ttsLang) {
  const voices = getVoices();
  const langPrefix = ttsLang.toLowerCase().slice(0, 2);
  const match = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
  if (!match.length) return void 0;
  const priorities = [
    /google.*(हिन्दी|hindi|india|female)/i,
    /microsoft.*(swara|kalpana|aria|jenny|libby|sonia|neerja|natural)/i,
    /(neural|natural|premium|enhanced|wavenet)/i,
    /google/i,
    /(samantha|karen|tessa|moira|fiona|victoria|allison|ava)/i,
    /female/i
  ];
  for (const re of priorities) {
    const v = match.find((x) => re.test(x.name));
    if (v) return v;
  }
  return match[0];
}
function speak(text, opts = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const lang = opts.lang ?? getLang();
    const ttsLang = speechLang[lang];
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts.rate ?? (lang === "hi" ? 0.82 : 0.88);
    u.pitch = opts.pitch ?? 1.15;
    u.volume = 1;
    u.lang = ttsLang;
    const preferred = pickBestVoice(ttsLang);
    if (preferred) u.voice = preferred;
    if (opts.onEnd) u.onend = opts.onEnd;
    if (opts.onError) u.onerror = opts.onError;
    window.speechSynthesis.speak(u);
  } catch {
    if (opts.onError) opts.onError();
  }
}
let audioCtx = null;
function ctx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  return audioCtx;
}
function pop() {
  const c = ctx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(660, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(990, c.currentTime + 0.12);
  g.gain.setValueAtTime(1e-3, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.25, c.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(1e-3, c.currentTime + 0.2);
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.22);
}
function chime() {
  const c = ctx();
  if (!c) return;
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "triangle";
    o.frequency.value = freq;
    g.gain.setValueAtTime(1e-4, c.currentTime + i * 0.1);
    g.gain.exponentialRampToValueAtTime(0.2, c.currentTime + i * 0.1 + 0.02);
    g.gain.exponentialRampToValueAtTime(1e-3, c.currentTime + i * 0.1 + 0.4);
    o.connect(g).connect(c.destination);
    o.start(c.currentTime + i * 0.1);
    o.stop(c.currentTime + i * 0.1 + 0.45);
  });
}
function haptic(ms = 15) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
    }
  }
}
function isIosSafari() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  return /iphone|ipad|ipod/i.test(ua) && /safari/i.test(ua) && !/crios|fxios/i.test(ua);
}
function isInstalled() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}
const DISMISSED_KEY = "tinygenius.pwa.dismissed";
function PWAInstallBanner() {
  const lang = useLang();
  const [deferredPrompt, setDeferredPrompt] = reactExports.useState(null);
  const [showIos, setShowIos] = reactExports.useState(false);
  const [visible, setVisible] = reactExports.useState(false);
  const [installing, setInstalling] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isInstalled()) return;
    try {
      const ts = localStorage.getItem(DISMISSED_KEY);
      if (ts && Date.now() - Number(ts) < 3 * 24 * 60 * 60 * 1e3) return;
    } catch {
    }
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    if (isIosSafari()) {
      setTimeout(() => setShowIos(true), 3e3);
      setTimeout(() => setVisible(true), 3e3);
    }
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  function dismiss() {
    haptic();
    pop();
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {
    }
  }
  async function install() {
    if (!deferredPrompt) return;
    haptic(30);
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setInstalling(false);
    if (outcome === "accepted") {
      setVisible(false);
    } else {
      dismiss();
    }
    setDeferredPrompt(null);
  }
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed bottom-4 left-4 right-4 z-50 animate-pop-in",
      style: { maxWidth: 420, margin: "0 auto" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-[28px] shadow-pop overflow-hidden",
          style: { background: "linear-gradient(135deg, #ff7ab6, #ffbe3b)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/icon-192.png", alt: "Tiny Genius", className: "size-14 rounded-2xl shadow flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-extrabold text-white text-base leading-tight", children: lang === "hi" ? "📲 ऐप इंस्टॉल करो!" : "📲 Install the App!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-xs font-semibold mt-0.5 leading-tight", children: showIos && !deferredPrompt ? lang === "hi" ? "Safari में Share → 'Home Screen पर जोड़ें' टैप करो" : "Tap Share → 'Add to Home Screen' in Safari" : lang === "hi" ? "होम स्क्रीन पर जोड़ें — ऑफलाइन भी चलेगा!" : "Add to home screen — works offline too!" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-shrink-0", children: [
                deferredPrompt && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: install,
                    disabled: installing,
                    className: "bg-white text-primary font-extrabold text-sm px-4 py-2 rounded-full shadow active:scale-95 transition-transform",
                    children: installing ? "⏳" : lang === "hi" ? "इंस्टॉल" : "Install"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: dismiss,
                    className: "text-white/70 font-bold text-xs text-center px-2",
                    children: lang === "hi" ? "बाद में" : "Not now"
                  }
                )
              ] })
            ] }),
            showIos && !deferredPrompt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/20 px-5 py-2 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "1️⃣" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-xs", children: lang === "hi" ? "नीचे Share बटन दबाओ 🔗" : "Tap the Share button below 🔗" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl ml-auto", children: "2️⃣" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-xs", children: lang === "hi" ? "'Add to Home Screen' चुनो" : "'Add to Home Screen'" })
            ] })
          ]
        }
      )
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$r = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#FF7AB6" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Tiny Genius" },
      { name: "mobile-web-app-capable", content: "yes" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "icon", href: "/icon-192.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Fredoka:wght@400;600;700;900&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$r.useRouteContext();
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
      });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PWAInstallBanner, {})
  ] });
}
const KEY = "tinygenius.progress.v1";
const empty = {
  stars: 0,
  letters: [],
  numbers: [],
  traced: [],
  animals: [],
  colors: [],
  fruits: [],
  body: [],
  quizScore: 0,
  lastVisit: (/* @__PURE__ */ new Date()).toISOString(),
  streak: 1,
  lastVisitDate: (/* @__PURE__ */ new Date()).toDateString()
};
function loadProgress() {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}
function saveProgress(p) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
  }
}
function addStars(n) {
  const p = loadProgress();
  p.stars += n;
  saveProgress(p);
  return p.stars;
}
function markLetter(letter) {
  const p = loadProgress();
  if (!p.letters.includes(letter)) {
    p.letters.push(letter);
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}
function markNumber(n) {
  const p = loadProgress();
  if (!p.numbers.includes(n)) {
    p.numbers.push(n);
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}
function markAnimal(id) {
  const p = loadProgress();
  if (!p.animals.includes(id)) {
    p.animals.push(id);
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}
function markColor(id) {
  const p = loadProgress();
  if (!p.colors.includes(id)) {
    p.colors.push(id);
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}
function markFruit(id) {
  const p = loadProgress();
  if (!(p.fruits ?? []).includes(id)) {
    p.fruits = [...p.fruits ?? [], id];
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}
function markBody(id) {
  const p = loadProgress();
  if (!(p.body ?? []).includes(id)) {
    p.body = [...p.body ?? [], id];
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}
function updateStreak() {
  const p = loadProgress();
  const today = (/* @__PURE__ */ new Date()).toDateString();
  if (p.lastVisitDate === today) return p.streak ?? 1;
  const yesterday = new Date(Date.now() - 864e5).toDateString();
  p.streak = p.lastVisitDate === yesterday ? (p.streak ?? 1) + 1 : 1;
  p.lastVisitDate = today;
  saveProgress(p);
  return p.streak;
}
function markTraced(id) {
  const p = loadProgress();
  if (!p.traced.includes(id)) {
    p.traced.push(id);
    p.stars += 2;
  }
  saveProgress(p);
  return p;
}
function addQuizScore(n) {
  const p = loadProgress();
  p.quizScore = (p.quizScore ?? 0) + n;
  p.stars += n;
  saveProgress(p);
  return p;
}
function resetProgress() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
  }
}
function LangToggle({ className = "" }) {
  const lang = useLang();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `inline-flex rounded-full bg-white/90 backdrop-blur p-1 shadow-pop ${className}`, role: "group", "aria-label": "Language", children: ["en", "hi"].map((l) => {
    const active = lang === l;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          if (!active) {
            haptic();
            pop();
            setLang(l);
          }
        },
        className: `px-3 py-1.5 rounded-full text-sm font-extrabold transition-colors ${active ? "bg-gradient-hero text-white" : "text-foreground/70"}`,
        "aria-pressed": active,
        children: l === "en" ? "EN" : "हिं"
      },
      l
    );
  }) });
}
const Route$q = createFileRoute("/treasure-map")({
  head: () => ({
    meta: [
      { title: "Treasure Map — Tiny Genius" },
      { name: "description", content: "Follow directions to find treasure!" }
    ]
  }),
  component: TreasureMap
});
const directions = ["left", "right", "up", "down"];
function TreasureMap() {
  const lang = useLang();
  const [path, setPath] = reactExports.useState([]);
  const [pos, setPos] = reactExports.useState({ x: 1, y: 1 });
  const [found, setFound] = reactExports.useState(false);
  reactExports.useMemo(
    () => directions[Math.floor(Math.random() * directions.length)],
    []
  );
  const handleDirection = (dir) => {
    haptic();
    const newPath = [...path, dir];
    setPath(newPath);
    let newPos = { ...pos };
    if (dir === "left") newPos.x = Math.max(0, pos.x - 1);
    else if (dir === "right") newPos.x = Math.min(2, pos.x + 1);
    else if (dir === "up") newPos.y = Math.max(0, pos.y - 1);
    else if (dir === "down") newPos.y = Math.min(2, pos.y + 1);
    setPos(newPos);
    if (newPos.x === 2 && newPos.y === 2) {
      chime();
      speak(t("found", lang));
      addStars(10);
      setFound(true);
    }
  };
  if (found) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-gradient-to-br from-mint/20 via-background to-sky/10 flex items-center justify-center pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-7xl mb-4", children: "💎" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-extrabold mb-2", children: [
        t("found", lang),
        "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-primary font-bold mb-8", children: "⭐ 10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treasure-map", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: "🔄 Again" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-mint/20 via-background to-sky/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("treasureMap", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold mb-6", children: t("treasureMapDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 max-w-xs mx-auto mb-8", children: Array.from({ length: 9 }).map((_, idx) => {
        const x = idx % 3;
        const y = Math.floor(idx / 3);
        const isPlayer = pos.x === x && pos.y === y;
        const isTarget = x === 2 && y === 2;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `aspect-square rounded-xl shadow-pop flex items-center justify-center font-bold text-2xl ${isTarget ? "bg-yellow-300" : isPlayer ? "bg-gradient-hero text-white" : "bg-white/80 border-2 border-primary/20"}`,
            children: isPlayer ? "🎯" : isTarget ? "💎" : ""
          },
          idx
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 w-48 mx-auto mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleDirection("up"),
            className: "rounded-xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 text-2xl",
            children: "⬆️"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleDirection("left"),
            className: "rounded-xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 text-2xl",
            children: "⬅️"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleDirection("down"),
            className: "rounded-xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 text-2xl",
            children: "⬇️"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleDirection("right"),
            className: "rounded-xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 text-2xl",
            children: "➡️"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Moves: ",
        path.length
      ] })
    ] })
  ] });
}
const Route$p = createFileRoute("/tracing")({
  head: () => ({
    meta: [
      { title: "Tracing — Tiny Genius" },
      { name: "description", content: "Trace English & Hindi letters and numbers with a rainbow brush." }
    ]
  }),
  component: Tracing
});
const EN_ITEMS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10"
];
const HI_ITEMS = [
  "अ",
  "आ",
  "इ",
  "ई",
  "उ",
  "ऊ",
  "ए",
  "ऐ",
  "ओ",
  "औ",
  "क",
  "ख",
  "ग",
  "घ",
  "च",
  "छ",
  "ज",
  "झ",
  "ट",
  "ठ",
  "ड",
  "ढ",
  "ण",
  "त",
  "थ",
  "द",
  "ध",
  "न",
  "प",
  "फ",
  "ब",
  "भ",
  "म",
  "य",
  "र",
  "ल",
  "व",
  "श",
  "ष",
  "स",
  "ह",
  "क्ष",
  "त्र",
  "ज्ञ"
];
function TracingDemo({ item }) {
  const isHindi = /[\u0900-\u097F]/.test(item);
  const fontFamily = isHindi ? "'Baloo 2', system-ui, sans-serif" : "'Fredoka', system-ui, sans-serif";
  const fontSize = isHindi ? 58 : 66;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-purple-200 rounded-2xl overflow-hidden shadow-pop flex items-center justify-center",
      style: { width: 92, height: 92, flexShrink: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-30", style: { backgroundImage: "repeating-linear-gradient(0deg, transparent 0 18px, rgba(139,92,246,0.25) 18px 19px)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", width: "92", height: "92", className: "absolute inset-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "penInk", x1: "0", y1: "0", x2: "1", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#ff7ab6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "55%", stopColor: "#ffbe3b" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#4d9dff" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: "50",
              y: "50",
              textAnchor: "middle",
              dominantBaseline: "central",
              fontFamily,
              fontWeight: 800,
              fontSize,
              fill: "rgba(148,163,184,0.30)",
              children: item
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: "50",
              y: "50",
              textAnchor: "middle",
              dominantBaseline: "central",
              fontFamily,
              fontWeight: 800,
              fontSize,
              fill: "none",
              stroke: "url(#penInk)",
              strokeWidth: 2.2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              style: {
                strokeDasharray: 600,
                strokeDashoffset: 600,
                animation: "tg-draw 2.4s ease-in-out 0.15s infinite"
              },
              children: item
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("g", { style: { animation: "tg-pen 2.4s ease-in-out 0.15s infinite", transformOrigin: "50% 50%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "0", y: "0", fontSize: "18", textAnchor: "middle", children: "✏️" }) })
        ] }, item),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes tg-draw {
          0%   { stroke-dashoffset: 600; opacity: 1; }
          70%  { stroke-dashoffset: 0;   opacity: 1; }
          90%  { stroke-dashoffset: 0;   opacity: 1; }
          100% { stroke-dashoffset: 0;   opacity: 0; }
        }
        @keyframes tg-pen {
          0%   { transform: translate(28px, 26px) rotate(-12deg); }
          25%  { transform: translate(50px, 18px) rotate(8deg); }
          50%  { transform: translate(72px, 40px) rotate(14deg); }
          70%  { transform: translate(58px, 72px) rotate(-6deg); }
          90%  { transform: translate(40px, 60px) rotate(0deg); opacity: 1; }
          100% { transform: translate(40px, 60px) rotate(0deg); opacity: 0; }
        }
      ` })
      ]
    }
  );
}
function Tracing() {
  const lang = useLang();
  const ITEMS = lang === "hi" ? HI_ITEMS : EN_ITEMS;
  const [idx, setIdx] = reactExports.useState(0);
  const [celebrate, setCelebrate] = reactExports.useState(false);
  const item = ITEMS[idx % ITEMS.length];
  const canvasRef = reactExports.useRef(null);
  const drawingRef = reactExports.useRef(false);
  const lastRef = reactExports.useRef(null);
  const totalUserPointsRef = reactExports.useRef(0);
  const offPathPointsRef = reactExports.useRef(0);
  const targetCellsRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const hitCellsRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const cellSize = 12;
  reactExports.useEffect(() => {
    setIdx(0);
  }, [lang]);
  reactExports.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    let rafId;
    function init() {
      const dpr = window.devicePixelRatio || 1;
      const rect = c.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) {
        rafId = requestAnimationFrame(init);
        return;
      }
      c.width = Math.round(rect.width * dpr);
      c.height = Math.round(rect.height * dpr);
      const ctx2 = c.getContext("2d", { willReadFrequently: true });
      if (!ctx2) return;
      ctx2.scale(dpr, dpr);
      drawGuide(ctx2, rect.width, rect.height, item);
      buildTargetGrid(ctx2, rect.width, rect.height, item);
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(() => {
          const ctx22 = c.getContext("2d", { willReadFrequently: true });
          const r2 = c.getBoundingClientRect();
          if (ctx22 && r2.width > 1) {
            drawGuide(ctx22, r2.width, r2.height, item);
            buildTargetGrid(ctx22, r2.width, r2.height, item);
          }
        });
      }
    }
    rafId = requestAnimationFrame(init);
    const ro = new ResizeObserver(() => {
      const ctx2 = c.getContext("2d");
      const r = c.getBoundingClientRect();
      if (ctx2 && r.width > 1 && r.height > 1) {
        const dpr = window.devicePixelRatio || 1;
        c.width = Math.round(r.width * dpr);
        c.height = Math.round(r.height * dpr);
        ctx2.scale(dpr, dpr);
        drawGuide(ctx2, r.width, r.height, item);
      }
    });
    ro.observe(c);
    hitCellsRef.current.clear();
    totalUserPointsRef.current = 0;
    offPathPointsRef.current = 0;
    setCelebrate(false);
    const isNumber = /[0-9०-९१२३४५६७८९]/.test(item);
    if (lang === "hi") speak(isNumber ? `अंक ${item} लिखो` : `अक्षर ${item} लिखो`);
    else speak(`Trace the ${isNumber ? "number" : "letter"} ${item}`);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [item, lang]);
  function drawGuide(ctx2, w, h, ch) {
    ctx2.clearRect(0, 0, w, h);
    ctx2.fillStyle = "#ffffff";
    ctx2.fillRect(0, 0, w, h);
    const isHindi = /[\u0900-\u097F]/.test(ch);
    const fontSize = Math.min(w, h) * 0.45;
    ctx2.font = `800 ${fontSize}px ${isHindi ? "'Baloo 2'" : "Fredoka"}, system-ui, sans-serif`;
    ctx2.textAlign = "center";
    ctx2.textBaseline = "middle";
    const cy = h / 2 + (isHindi ? -fontSize * 0.05 : fontSize * 0.04);
    ctx2.fillStyle = "rgba(226, 232, 240, 0.90)";
    ctx2.fillText(ch, w / 2, cy);
    ctx2.lineWidth = 4;
    ctx2.lineCap = "round";
    ctx2.lineJoin = "round";
    ctx2.setLineDash([7, 12]);
    ctx2.strokeStyle = "rgba(139, 92, 246, 0.55)";
    ctx2.strokeText(ch, w / 2, cy);
    ctx2.setLineDash([]);
  }
  function buildTargetGrid(ctx2, w, h, ch) {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;
    const isHindi = /[\u0900-\u097F]/.test(ch);
    const fontSize = Math.min(w, h) * 0.45;
    octx.font = `800 ${fontSize}px ${isHindi ? "'Baloo 2'" : "Fredoka"}, system-ui, sans-serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    const cy = h / 2 + (isHindi ? -fontSize * 0.05 : fontSize * 0.04);
    octx.fillStyle = "#000";
    octx.fillText(ch, w / 2, cy);
    const imgData = octx.getImageData(0, 0, w, h).data;
    const targets = /* @__PURE__ */ new Set();
    for (let y = 0; y < h; y += cellSize / 2) {
      for (let x = 0; x < w; x += cellSize / 2) {
        const i = (Math.floor(y) * Math.floor(w) + Math.floor(x)) * 4;
        if (imgData[i + 3] > 50) {
          const gx = Math.floor(x / cellSize);
          const gy = Math.floor(y / cellSize);
          targets.add(`${gx},${gy}`);
        }
      }
    }
    targetCellsRef.current = targets;
  }
  function pos(e) {
    const c = canvasRef.current;
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function start(e) {
    e.preventDefault();
    drawingRef.current = true;
    lastRef.current = pos(e);
    canvasRef.current?.setPointerCapture(e.pointerId);
    haptic(8);
  }
  function move(e) {
    if (!drawingRef.current) return;
    const c = canvasRef.current;
    const ctx2 = c.getContext("2d");
    const p = pos(e);
    const last = lastRef.current ?? p;
    const hue = Date.now() / 8 % 360;
    ctx2.strokeStyle = `hsl(${hue}, 90%, 60%)`;
    ctx2.lineWidth = 18;
    ctx2.lineCap = "round";
    ctx2.lineJoin = "round";
    ctx2.shadowColor = `hsl(${hue}, 90%, 70%)`;
    ctx2.shadowBlur = 12;
    ctx2.beginPath();
    ctx2.moveTo(last.x, last.y);
    ctx2.lineTo(p.x, p.y);
    ctx2.stroke();
    lastRef.current = p;
    totalUserPointsRef.current += 1;
    const gx = Math.floor(p.x / cellSize);
    const gy = Math.floor(p.y / cellSize);
    let isHit = false;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (targetCellsRef.current.has(`${gx + dx},${gy + dy}`)) {
          isHit = true;
          hitCellsRef.current.add(`${gx + dx},${gy + dy}`);
        }
      }
    }
    if (!isHit) {
      offPathPointsRef.current += 1;
    }
  }
  function end() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastRef.current = null;
    pop();
    const targets = targetCellsRef.current.size;
    const hits = hitCellsRef.current.size;
    if (targets === 0) return;
    const coverage = hits / targets;
    const scribbleRatio = offPathPointsRef.current / Math.max(1, totalUserPointsRef.current);
    if (coverage >= 0.8 && scribbleRatio < 0.35 && !celebrate) {
      setCelebrate(true);
      chime();
      haptic(40);
      markTraced(item);
      const praiseList = t("praise", lang).split("!").map((s) => s.trim()).filter(Boolean);
      const pick = praiseList[Math.floor(Math.random() * praiseList.length)] + "!";
      speak(pick);
    }
  }
  function clearCanvas() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx2 = c.getContext("2d");
    if (!ctx2) return;
    const r = c.getBoundingClientRect();
    drawGuide(ctx2, r.width, r.height, item);
    hitCellsRef.current.clear();
    totalUserPointsRef.current = 0;
    offPathPointsRef.current = 0;
    setCelebrate(false);
  }
  function next() {
    setIdx((i) => (i + 1) % ITEMS.length);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-tracing flex flex-col select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 flex items-center justify-between gap-2 px-4 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl active:scale-95", "aria-label": "Home", children: "🏠" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-white/90 px-4 py-2 shadow-pop font-extrabold text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-3xl ${lang === "hi" ? "font-hindi" : ""}`, children: item }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: clearCanvas, "aria-label": "Clear", className: "size-12 rounded-full bg-white/90 shadow-pop text-xl active:scale-95", children: "🧽" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex justify-center px-4 mt-3 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/90 backdrop-blur rounded-[24px] px-4 py-2 shadow-pop flex items-center gap-4 animate-pop-in border border-white/20 max-w-sm w-full justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col text-left leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold text-indigo-500 tracking-wide uppercase", children: lang === "hi" ? "देखो और सीखो" : "WATCH & LEARN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-slate-700 mt-0.5", children: lang === "hi" ? "ऐसे लिखना सीखें!" : "Trace like this!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 mt-1", children: lang === "hi" ? `✏️ अक्षर है: ${item}` : `✏️ Letter: ${item}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TracingDemo, { item })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 px-4 py-4 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "canvas",
        {
          ref: canvasRef,
          onPointerDown: start,
          onPointerMove: move,
          onPointerUp: end,
          onPointerCancel: end,
          className: "w-full h-full rounded-[36px] shadow-pop bg-white touch-none",
          style: { minHeight: "52vh" },
          "aria-label": `Tracing ${item}`
        }
      ),
      celebrate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/95 rounded-3xl px-8 py-6 shadow-pop animate-pop-in text-center max-w-xs w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl animate-bounce-big", children: "🎉" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-extrabold", children: t("youDidIt", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: next, className: "pointer-events-auto mt-4 w-full rounded-full bg-gradient-hero text-white font-extrabold px-6 py-3 shadow-pop active:scale-95", children: [
          t("next", lang),
          " →"
        ] })
      ] }) })
    ] })
  ] });
}
const Route$o = createFileRoute("/trace-race")({
  head: () => ({
    meta: [
      { title: "Trace Race — Tiny Genius" },
      { name: "description", content: "Race to trace the pattern." }
    ]
  }),
  component: TraceRace
});
const patterns = [
  { name: "zigzag", instructions: "Make a zigzag!" },
  { name: "circle", instructions: "Draw a circle!" },
  { name: "wave", instructions: "Make waves!" }
];
function TraceRace() {
  const lang = useLang();
  const canvasRef = reactExports.useRef(null);
  const [isDrawing, setIsDrawing] = reactExports.useState(false);
  const [time, setTime] = reactExports.useState(30);
  const [completed, setCompleted] = reactExports.useState(false);
  const [pattern] = reactExports.useState(() => patterns[Math.floor(Math.random() * patterns.length)]);
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      setTime((t2) => t2 > 0 ? t2 - 1 : 0);
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const handleMouseDown = () => {
    setIsDrawing(true);
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
    haptic();
  };
  const handleMouseMove = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx2 = canvas.getContext("2d");
    if (!ctx2) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx2.lineWidth = 4;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "oklch(0.72 0.21 350)";
    ctx2.lineTo(x, y);
    ctx2.stroke();
  };
  const handleClear = () => {
    if (canvasRef.current) {
      const ctx2 = canvasRef.current.getContext("2d");
      if (ctx2) ctx2.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };
  const handleComplete = () => {
    haptic();
    chime();
    speak(t("complete", lang));
    addStars(Math.max(5, time));
    setCompleted(true);
  };
  if (completed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-gradient-to-br from-mint/20 via-background to-sky/10 flex items-center justify-center pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-7xl mb-4", children: "🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-extrabold mb-2", children: [
        t("complete", lang),
        "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-primary font-bold mb-8", children: [
        "⭐ ",
        Math.max(5, time)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trace-race", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: "🔄 Again" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-mint/20 via-background to-sky/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("traceRace", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-lg font-bold mb-4", children: pattern.instructions }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-3xl font-extrabold text-primary mb-6", children: [
        "⏱️ ",
        time,
        "s"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "canvas",
        {
          ref: canvasRef,
          width: 320,
          height: 320,
          onMouseDown: handleMouseDown,
          onMouseUp: handleMouseUp,
          onMouseMove: handleMouseMove,
          className: "w-full max-w-sm mx-auto border-3 border-primary/30 rounded-2xl bg-white shadow-pop cursor-crosshair",
          style: { touchAction: "none" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center mt-6 max-w-sm mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleClear,
            className: "flex-1 rounded-xl bg-muted text-foreground font-bold py-2 shadow-pop active:scale-95 transition-transform",
            children: "🗑️ Clear"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleComplete,
            className: "flex-1 rounded-xl bg-gradient-hero text-white font-bold py-2 shadow-pop active:scale-95 transition-transform",
            children: "✓ Done"
          }
        )
      ] })
    ] })
  ] });
}
const Route$n = createFileRoute("/story-builder")({
  head: () => ({
    meta: [
      { title: "Story Builder — Tiny Genius" },
      { name: "description", content: "Create your own story!" }
    ]
  }),
  component: StoryBuilder
});
const STORY_PARTS = {
  character: ["🦁", "🐶", "🐱", "🐸", "🦆", "🐻"],
  action: ["jumped", "ran", "danced", "sang", "played", "swam"],
  place: ["forest", "beach", "mountain", "lake", "garden", "sky"]
};
function StoryBuilder() {
  const lang = useLang();
  const [selected, setSelected] = reactExports.useState({
    character: "",
    action: "",
    place: ""
  });
  const [story, setStory] = reactExports.useState("");
  const handleSelect = (key, value) => {
    setSelected({ ...selected, [key]: value });
  };
  const buildStory = () => {
    if (selected.character && selected.action && selected.place) {
      const storyText = `${selected.character} ${selected.action} in the ${selected.place}!`;
      setStory(storyText);
      chime();
      speak(storyText);
    }
  };
  const downloadStory = () => {
    if (!story) return;
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(story)
    );
    element.setAttribute("download", "my_story.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-coral/20 via-background to-grape/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("storyBuilder", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 max-w-sm mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-lg font-bold mb-8", children: t("storyBuilderDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold mb-2", children: [
          "Who? ",
          selected.character
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: STORY_PARTS.character.map((char) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleSelect("character", char),
            className: `text-3xl p-2 rounded-lg shadow-pop active:scale-95 transition-transform ${selected.character === char ? "bg-gradient-hero ring-2 ring-primary" : "bg-white/80"}`,
            children: char
          },
          char
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold mb-2", children: [
          "What? ",
          selected.action
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: STORY_PARTS.action.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleSelect("action", action),
            className: `font-bold p-2 rounded-lg shadow-pop active:scale-95 transition-transform ${selected.action === action ? "bg-gradient-abc text-white" : "bg-white/80"}`,
            children: action
          },
          action
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold mb-2", children: [
          "Where? ",
          selected.place
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: STORY_PARTS.place.map((place) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleSelect("place", place),
            className: `font-bold p-2 rounded-lg shadow-pop active:scale-95 transition-transform ${selected.place === place ? "bg-gradient-colors text-white" : "bg-white/80"}`,
            children: place
          },
          place
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: buildStory,
          disabled: !selected.character || !selected.action || !selected.place,
          className: "w-full rounded-2xl bg-gradient-hero text-white font-extrabold py-3 shadow-pop active:scale-95 transition-transform disabled:opacity-50",
          children: "✨ Create Story"
        }
      ),
      story && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-white/80 rounded-2xl p-4 shadow-pop", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-lg font-bold mb-4", children: story }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: downloadStory,
            className: "w-full rounded-xl bg-gradient-hero text-white font-bold py-2",
            children: "💾 Save Story"
          }
        )
      ] })
    ] })
  ] });
}
const Route$m = createFileRoute("/sticker-studio")({
  head: () => ({
    meta: [
      { title: "Sticker Studio — Tiny Genius" },
      { name: "description", content: "Collect and decorate with stickers!" }
    ]
  }),
  component: StickerStudio
});
const STICKERS = ["⭐", "🌈", "🎈", "🎉", "💫", "🌟", "✨", "🦋", "🌸", "🎨", "🎭", "🎪"];
function StickerStudio() {
  const lang = useLang();
  const [progress, setProgress] = reactExports.useState(loadProgress());
  const [collected, setCollected] = reactExports.useState([]);
  const [canvas, setCanvas] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const stickersEarned = Math.min(12, Math.floor(progress.stars / 5));
    setCollected(STICKERS.slice(0, stickersEarned));
  }, [progress]);
  const handlePlaceSticker = (sticker) => {
    setCanvas([...canvas, sticker]);
  };
  const handleDownload = () => {
    const text = "My Sticker Art:\n" + canvas.join(" ");
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", "stickers.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-grape/20 via-background to-coral/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("stickerStudio", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-lg font-bold mb-4", children: t("stickerStudioDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/80 rounded-2xl p-4 shadow-pop max-w-xs mx-auto h-40 mb-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl flex flex-wrap gap-1", children: canvas.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-muted-foreground mb-2", children: [
        "Stickers collected: ",
        collected.length,
        "/12"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-6 gap-2 max-w-xs mx-auto mb-6", children: STICKERS.map((sticker, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => collected.includes(sticker) && handlePlaceSticker(sticker),
          disabled: !collected.includes(sticker),
          className: `aspect-square rounded-lg text-2xl shadow-pop active:scale-95 transition-transform ${collected.includes(sticker) ? "bg-white/80 border-2 border-primary/30" : "bg-gray-300 border-2 border-gray-400 opacity-40"}`,
          children: sticker
        },
        sticker
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 max-w-xs mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setCanvas([]),
            className: "flex-1 rounded-xl bg-muted text-foreground font-bold py-2 shadow-pop",
            children: "🗑️ Clear"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleDownload,
            className: "flex-1 rounded-xl bg-gradient-hero text-white font-bold py-2 shadow-pop",
            children: "💾 Save"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: [
      "🏠 ",
      t("home", lang)
    ] }) })
  ] });
}
const Route$l = createFileRoute("/sound-match")({
  head: () => ({
    meta: [
      { title: "Sound Match — Tiny Genius" },
      { name: "description", content: "Match animal sounds to pictures." }
    ]
  }),
  component: SoundMatch
});
function SoundMatch() {
  const lang = useLang();
  const [score, setScore] = reactExports.useState(0);
  const [played, setPlayed] = reactExports.useState(false);
  const [usedIndices, setUsedIndices] = reactExports.useState([]);
  const allAnimalsShuffled = reactExports.useMemo(
    () => ANIMALS_DATA.sort(() => Math.random() - 0.5),
    []
  );
  const getNewRound = () => {
    let available = allAnimalsShuffled.filter((_, idx) => !usedIndices.includes(idx));
    if (available.length < 4) {
      setUsedIndices([]);
      available = allAnimalsShuffled;
    }
    return available.slice(0, 4).sort(() => Math.random() - 0.5);
  };
  const [animals, setAnimals] = reactExports.useState(getNewRound());
  const [current2, setCurrent] = reactExports.useState(animals[Math.floor(Math.random() * animals.length)]);
  const handleCorrect = (id) => {
    if (id === current2.id) {
      haptic();
      chime();
      speak(t("correct", lang));
      addStars(5);
      setScore((s) => s + 1);
      setTimeout(() => {
        const newAnimals = getNewRound();
        setAnimals(newAnimals);
        setCurrent(newAnimals[Math.floor(Math.random() * newAnimals.length)]);
        setPlayed(false);
      }, 800);
    } else {
      pop();
      speak(t("tryAgain", lang));
    }
  };
  const playSound = () => {
    setPlayed(true);
    speak(lang === "hi" ? current2.soundHi : current2.soundEn);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-sky/20 via-background to-grape/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("soundMatch", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold mb-6", children: [
        "🎵 ",
        t("soundMatchDesc", lang)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-extrabold text-primary mb-8", children: [
        lang === "hi" ? "स्कोर" : "Score",
        ": ",
        score
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: playSound,
          className: "mx-auto block w-20 h-20 rounded-full bg-gradient-hero text-white text-3xl shadow-pop active:scale-95 transition-transform mb-8",
          children: "🔊"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: played ? t("soundMatchDesc", lang) : "Tap speaker!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 max-w-xs mx-auto", children: animals.map((animal) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleCorrect(animal.id),
          className: "rounded-2xl bg-white/80 p-4 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 hover:border-primary/50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-1", children: animal.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold", children: lang === "hi" ? animal.hi : animal.en })
          ]
        },
        animal.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: [
      "🏠 ",
      t("home", lang)
    ] }) })
  ] });
}
const Route$k = createFileRoute("/shapes")({
  head: () => ({
    meta: [
      { title: "Shapes — Tiny Genius" },
      { name: "description", content: "Learn shapes in English and Hindi." }
    ]
  }),
  component: Shapes
});
function ShapeSvg({ kind, color = "#fff" }) {
  const common = { fill: color, stroke: "rgba(0,0,0,0.15)", strokeWidth: 6 };
  switch (kind) {
    case "circle":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 200 200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "100", r: "80", ...common }) });
    case "square":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 200 200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "25", y: "25", width: "150", height: "150", rx: "14", ...common }) });
    case "triangle":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 200 200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "100,25 180,175 20,175", ...common }) });
    case "star":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 200 200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "100,15 123,75 188,80 138,122 155,185 100,150 45,185 62,122 12,80 77,75", ...common }) });
    case "heart":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 200 200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100 175 C30 130 20 80 55 55 C85 35 100 70 100 70 C100 70 115 35 145 55 C180 80 170 130 100 175 Z", ...common }) });
    case "rectangle":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 200 200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "15", y: "55", width: "170", height: "90", rx: "12", ...common }) });
    default:
      return null;
  }
}
function Shapes() {
  const lang = useLang();
  const [idx, setIdx] = reactExports.useState(0);
  const s = SHAPES_DATA[idx];
  reactExports.useEffect(() => {
    haptic();
    pop();
    const t2 = setTimeout(() => speak(lang === "hi" ? s.hi : s.en), 150);
    return () => clearTimeout(t2);
  }, [s, lang]);
  function tap() {
    haptic(20);
    chime();
    addStars(1);
    speak(lang === "hi" ? `${s.hi}` : `${s.en}!`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-shapes flex flex-col select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl", "aria-label": "Home", children: "🏠" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-full bg-white/90 px-4 py-2 shadow-pop text-sm font-extrabold", children: [
        idx + 1,
        "/",
        SHAPES_DATA.length
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 flex flex-col items-center justify-center px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: tap,
          "aria-label": s.en,
          className: "size-64 sm:size-80 bg-white rounded-[48px] shadow-pop flex items-center justify-center active:scale-95 transition-transform animate-pop-in p-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-full text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShapeSvg, { kind: s.svg, color: "currentColor" }) })
        },
        s.id
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-white/95 rounded-full px-6 py-3 shadow-pop animate-pop-in flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-extrabold", children: lang === "hi" ? s.hi : s.en }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-muted-foreground", children: lang === "hi" ? s.en : s.hi })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center justify-between px-6 pb-8 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIdx((i) => (i - 1 + SHAPES_DATA.length) % SHAPES_DATA.length), className: "size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90", "aria-label": "Previous", children: "⬅️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIdx((i) => (i + 1) % SHAPES_DATA.length), className: "size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90", "aria-label": "Next", children: "➡️" })
    ] })
  ] });
}
const Route$j = createFileRoute("/shape-builder")({
  head: () => ({
    meta: [
      { title: "Shape Builder — Tiny Genius" },
      { name: "description", content: "Build with shapes!" }
    ]
  }),
  component: ShapeBuilder
});
function ShapeBuilder() {
  const lang = useLang();
  const objects = [
    { name: "house", shapes: ["square", "triangle"], emoji: "🏠" },
    { name: "tree", shapes: ["triangle", "square"], emoji: "🌳" },
    { name: "rocket", shapes: ["triangle", "square", "square"], emoji: "🚀" }
  ];
  const target = reactExports.useMemo(() => objects[Math.floor(Math.random() * objects.length)], []);
  const [placed, setPlaced] = reactExports.useState([]);
  const [completed, setCompleted] = reactExports.useState(false);
  const handleShapeDrop = (shapeId) => {
    haptic();
    const newPlaced = [...placed, shapeId];
    setPlaced(newPlaced);
    if (newPlaced.length === target.shapes.length) {
      const isCorrect = newPlaced.every(
        (shape, idx) => SHAPES_DATA.find((s) => s.id === shape)?.id === target.shapes[idx]
      );
      if (isCorrect) {
        chime();
        speak(t("complete", lang));
        addStars(10);
        setCompleted(true);
      } else {
        speak(t("tryAgain", lang));
        setPlaced([]);
      }
    }
  };
  if (completed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-gradient-to-br from-coral/20 via-background to-sunshine/10 flex items-center justify-center pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-7xl mb-4", children: target.emoji }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-extrabold mb-2", children: [
        t("complete", lang),
        "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-primary font-bold mb-8", children: "⭐ 10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shape-builder", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: "🔄 Again" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-coral/20 via-background to-sunshine/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("shapeBuilder", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold mb-4", children: t("shapeBuilderDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-6", children: target.emoji }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/80 rounded-2xl p-6 shadow-pop max-w-xs mx-auto mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Shapes needed:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center flex-wrap", children: target.shapes.map((shapeId, idx) => {
          const shape = SHAPES_DATA.find((s) => s.id === shapeId);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: shape?.emoji }, idx);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 max-w-xs mx-auto", children: SHAPES_DATA.slice(0, 3).map((shape) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleShapeDrop(shape.id),
          className: "aspect-square rounded-2xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: shape.emoji })
        },
        shape.id
      )) }),
      placed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-sm text-muted-foreground", children: [
        placed.length,
        "/",
        target.shapes.length
      ] })
    ] })
  ] });
}
const Route$i = createFileRoute("/rhythm-tap")({
  head: () => ({
    meta: [
      { title: "Rhythm Tap — Tiny Genius" },
      { name: "description", content: "Tap to the rhythm beat!" }
    ]
  }),
  component: RhythmTap
});
function RhythmTap() {
  const lang = useLang();
  const [beats, setBeats] = reactExports.useState([]);
  const [taps, setTaps] = reactExports.useState([]);
  const [combo, setCombo] = reactExports.useState(0);
  const [round, setRound] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const newBeats = Array.from({ length: 8 }, () => Math.random() > 0.5);
    setBeats(newBeats);
    setTaps([]);
    setRound((r) => r + 1);
    let delay = 500;
    newBeats.forEach((beat) => {
      if (beat) {
        setTimeout(() => {
          haptic();
          speak("Tap!");
        }, delay);
      }
      delay += 400;
    });
  }, []);
  const handleTap = (idx) => {
    if (idx < taps.length) return;
    const isCorrect = beats[idx] === true;
    setTaps([...taps, isCorrect]);
    if (isCorrect) {
      haptic();
      chime();
      setCombo((c) => c + 1);
    } else {
      pop();
      setCombo(0);
    }
    if (taps.length + 1 === beats.length) {
      const finalScore = combo + (isCorrect ? 1 : 0);
      setTimeout(() => {
        addStars(finalScore * 2);
        speak(t("complete", lang));
        setTimeout(() => {
          window.location.reload();
        }, 1e3);
      }, 500);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-grape/20 via-background to-sky/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("rhythmTap", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold mb-6", children: [
        "🎵 ",
        t("rhythmTapDesc", lang)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-extrabold text-primary mb-8", children: [
        "Combo: ",
        combo
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 max-w-xs mx-auto mb-8", children: beats.map((beat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleTap(idx),
          disabled: idx < taps.length,
          className: `aspect-square rounded-xl font-bold text-xl shadow-pop active:scale-95 transition-transform ${idx < taps.length ? taps[idx] ? "bg-gradient-hero text-white" : "bg-destructive text-white" : "bg-white/80 border-2 border-primary/30"}`,
          children: idx < taps.length ? taps[idx] ? "✓" : "✗" : beat ? "🎵" : ""
        },
        idx
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        taps.length,
        "/",
        beats.length,
        " tapped"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: [
      "🏠 ",
      t("home", lang)
    ] }) })
  ] });
}
const Route$h = createFileRoute("/rhymes")({
  head: () => ({
    meta: [
      { title: "Rhymes — Tiny Genius" },
      { name: "description", content: "Sing along and watch popular bilingual nursery rhymes and videos." }
    ]
  }),
  component: Rhymes
});
const RHYMES_DATA = [
  {
    id: "johny",
    title: "Johny Johny Yes Papa",
    titleHi: "जॉनी जॉनी यस पापा",
    emoji: "👶",
    lang: "en",
    bgGradient: "bg-gradient-abc",
    floatingEmojis: ["👶", "🍬", "🍭", "😀"],
    youtubeId: "m-bw5zcn5hg",
    startSec: 10,
    endSec: 188
  },
  {
    id: "machli",
    title: "Machli Jal Ki Rani",
    titleHi: "मछली जल की रानी",
    emoji: "🐟",
    lang: "hi",
    bgGradient: "bg-gradient-animals",
    floatingEmojis: ["🐟", "🌊", "💧", "🐠"],
    youtubeId: "F72r2aU0NW8",
    startSec: 10,
    endSec: 163
  },
  {
    id: "twinkle",
    title: "Twinkle Twinkle Little Star",
    titleHi: "ट्विंकल ट्विंकल",
    emoji: "⭐",
    lang: "en",
    bgGradient: "bg-gradient-numbers",
    floatingEmojis: ["⭐", "✨", "🌟", "🌙"],
    youtubeId: "5HRrKZQxaXo",
    startSec: 10,
    endSec: 143
  },
  {
    id: "chanda",
    title: "Chanda Mama Door Ke",
    titleHi: "चंदा मामा दूर के",
    emoji: "🌙",
    lang: "hi",
    bgGradient: "bg-gradient-shapes",
    floatingEmojis: ["🌙", "⭐", "🥣", "🍯"],
    youtubeId: "7iVIJDKHhDU",
    startSec: 10,
    endSec: 148
  },
  {
    id: "kathi",
    title: "Lakdi Ki Kathi",
    titleHi: "लकड़ी की काठी",
    emoji: "🐴",
    lang: "hi",
    bgGradient: "bg-gradient-colors",
    floatingEmojis: ["🐴", "🔨", "🪵", "🏃"],
    youtubeId: "uT0KgOrFwdA",
    startSec: 10,
    endSec: 158
  },
  {
    id: "naani",
    title: "Naani Teri Morni",
    titleHi: "नानी तेरी मोरनी को मोर ले गया",
    emoji: "🦚",
    lang: "hi",
    bgGradient: "bg-gradient-tracing",
    floatingEmojis: ["🦚", "🦜", "🌸", "🎶"],
    youtubeId: "VI5N37BqwwI",
    startSec: 10,
    endSec: 153
  },
  {
    id: "tamatar",
    title: "Aaha Tamatar",
    titleHi: "आहा टमाटर बड़े मज़ेदार",
    emoji: "🍅",
    lang: "hi",
    bgGradient: "bg-gradient-abc",
    floatingEmojis: ["🍅", "🥕", "🧅", "🥦"],
    youtubeId: "GeVTkEq4pDs",
    startSec: 10,
    endSec: 177
  },
  {
    id: "roti",
    title: "Mummy Ki Roti Gol Gol",
    titleHi: "मम्मी की रोटी गोल गोल",
    emoji: "🫓",
    lang: "hi",
    bgGradient: "bg-gradient-numbers",
    floatingEmojis: ["🫓", "💰", "👩‍🍳", "😋"],
    youtubeId: "7BLC80zJQk4",
    startSec: 10,
    endSec: 128
  },
  {
    id: "aloo",
    title: "Aloo Kachalu Beta",
    titleHi: "आलू कचालू बेटा कहाँ गये थे",
    emoji: "🥔",
    lang: "hi",
    bgGradient: "bg-gradient-shapes",
    floatingEmojis: ["🥔", "🧆", "😄", "🍽️"],
    youtubeId: "5iGi3JpU6h0",
    startSec: 10,
    endSec: 143
  }
];
function Rhymes() {
  const lang = useLang();
  const [selected, setSelected] = reactExports.useState(null);
  function handleClose() {
    setSelected(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-gradient-rhymes flex flex-col select-none", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fixed inset-0 z-50 ${selected.bgGradient} flex flex-col animate-pop-in overflow-hidden`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: selected.floatingEmojis.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "absolute text-4xl opacity-40 animate-bounce",
        style: {
          left: `${(i * 23 + 8) % 90}%`,
          top: `${(i * 31 + 12) % 80}%`,
          animationDelay: `${i * 0.4}s`,
          animationDuration: `${2 + i % 3}s`
        },
        children: e
      },
      i
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 flex items-center gap-3 px-4 pt-5 pb-3 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleClose,
          className: "rounded-full bg-white/95 size-11 flex items-center justify-center shadow-pop text-xl active:scale-95 flex-shrink-0",
          "aria-label": "Back",
          children: "⬅️"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: `flex-1 text-lg font-extrabold text-white drop-shadow-md leading-tight ${selected.lang === "hi" ? "font-hindi" : ""}`, children: lang === "hi" ? selected.titleHi : selected.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex-1 px-4 pb-4 flex flex-col items-center justify-center min-h-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-md rounded-[32px] p-3 shadow-pop",
          style: {
            background: "linear-gradient(135deg, #ffd6f0, #ffe9b8, #bde4ff)",
            border: "4px solid rgba(255,255,255,0.85)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-hidden rounded-[22px] bg-black/80", style: { aspectRatio: "16 / 9" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "iframe",
              {
                src: `https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&fs=1&start=${selected.startSec}&end=${selected.endSec}`,
                title: selected.title,
                className: "absolute inset-0 w-full h-full",
                frameBorder: "0",
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                allowFullScreen: true
              },
              selected.youtubeId
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-1.5 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-pink-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-sky-400" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 w-full max-w-md bg-white/95 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-pop", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: selected.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-extrabold text-slate-800 text-sm leading-tight truncate ${selected.lang === "hi" ? "font-hindi" : ""}`, children: lang === "hi" ? selected.titleHi : selected.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-semibold mt-0.5", children: selected.lang === "hi" ? "Hindi Song • हिंदी गाना" : "English Rhyme" })
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95",
          "aria-label": "Home",
          children: "🏠"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold text-white drop-shadow-md", children: lang === "hi" ? "बाल कविताएं 🎶" : "Rhymes & Poems 🎶" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/parent", className: "rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow-pop text-sm font-bold", children: "👨‍👩‍👧" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "flex-1 px-5 py-4 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 max-w-md mx-auto", children: RHYMES_DATA.map((rhyme, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          haptic(15);
          pop();
          setSelected(rhyme);
        },
        className: "w-full rounded-[28px] p-4 shadow-pop flex items-center justify-between text-left active:scale-[0.97] transition-transform bg-white border border-slate-100 animate-pop-in",
        style: { animationDelay: `${i * 60}ms` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl bg-slate-50 rounded-2xl p-2 size-14 flex items-center justify-center shadow-sm", children: rhyme.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-base font-extrabold text-slate-800 leading-tight ${rhyme.lang === "hi" ? "font-hindi" : ""}`, children: lang === "hi" ? rhyme.titleHi : rhyme.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-400 mt-0.5", children: rhyme.lang === "hi" ? "Hindi • हिंदी" : "English Rhyme" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl ml-2", children: "▶️" })
        ]
      },
      rhyme.id
    )) }) })
  ] }) });
}
const Route$g = createFileRoute("/reward-shop")({
  head: () => ({
    meta: [
      { title: "Reward Shop — Tiny Genius" },
      { name: "description", content: "Spend your stars on rewards!" }
    ]
  }),
  component: RewardShop
});
const REWARDS = [
  { id: 1, name: "Gold Star", emoji: "🌟", cost: 5 },
  { id: 2, name: "Rainbow", emoji: "🌈", cost: 10 },
  { id: 3, name: "Sparkle", emoji: "✨", cost: 15 },
  { id: 4, name: "Rocket", emoji: "🚀", cost: 20 },
  { id: 5, name: "Trophy", emoji: "🏆", cost: 25 },
  { id: 6, name: "Crown", emoji: "👑", cost: 30 }
];
function RewardShop() {
  const lang = useLang();
  const [progress, setProgress] = reactExports.useState(loadProgress());
  const [owned, setOwned] = reactExports.useState(() => {
    const stored = localStorage.getItem("ownedRewards");
    return stored ? JSON.parse(stored) : [];
  });
  const [message, setMessage] = reactExports.useState("");
  reactExports.useEffect(() => {
    setProgress(loadProgress());
  }, []);
  const handlePurchase = (reward) => {
    if (owned.includes(reward.id)) {
      setMessage("Already owned!");
      setTimeout(() => setMessage(""), 2e3);
      return;
    }
    if (progress.stars >= reward.cost) {
      haptic();
      chime();
      const newStars = progress.stars - reward.cost;
      const newProgress = { ...progress, stars: newStars };
      saveProgress(newProgress);
      setProgress(newProgress);
      const newOwned = [...owned, reward.id];
      setOwned(newOwned);
      localStorage.setItem("ownedRewards", JSON.stringify(newOwned));
      setMessage(`Got ${reward.name}!`);
      speak(t("found", lang));
      setTimeout(() => setMessage(""), 2e3);
    } else {
      setMessage("Not enough stars!");
      setTimeout(() => setMessage(""), 2e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-sunshine/20 via-background to-coral/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("rewardShop", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 max-w-sm mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/80 rounded-2xl p-4 shadow-pop mb-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your stars" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-extrabold text-primary", children: [
          "⭐ ",
          progress.stars
        ] })
      ] }),
      message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 bg-gradient-hero text-white rounded-2xl p-3 text-center font-bold shadow-pop", children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: REWARDS.map((reward) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handlePurchase(reward),
          className: `rounded-2xl p-4 shadow-pop active:scale-95 transition-transform ${owned.includes(reward.id) ? "bg-muted text-muted-foreground opacity-50" : progress.stars >= reward.cost ? "bg-white/80 hover:border-primary/50" : "bg-white/50 opacity-60"} border-2 border-primary/20`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: reward.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold", children: reward.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: owned.includes(reward.id) ? "✓ Owned" : `${reward.cost}⭐` })
          ]
        },
        reward.id
      )) }),
      owned.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-white/80 rounded-2xl p-4 shadow-pop", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold mb-3", children: "Your collection:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl flex flex-wrap gap-2", children: REWARDS.filter((r) => owned.includes(r.id)).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.emoji }, r.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: [
      "🏠 ",
      t("home", lang)
    ] }) })
  ] });
}
const Route$f = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — Tiny Genius" },
      { name: "description", content: "Test what you know! Animals, Colors, Shapes quiz in English and Hindi." }
    ]
  }),
  component: Quiz
});
const MODES = [
  { id: "animals", label: "Animals", labelHi: "जानवर", emoji: "🦁", gradient: "bg-gradient-animals" },
  { id: "colors", label: "Colors", labelHi: "रंग", emoji: "🎨", gradient: "bg-gradient-colors" },
  { id: "shapes", label: "Shapes", labelHi: "आकार", emoji: "🔺", gradient: "bg-gradient-shapes" },
  { id: "numbers", label: "Numbers", labelHi: "नंबर", emoji: "🔢", gradient: "bg-gradient-numbers" }
];
const POOL = {
  animals: ANIMALS_DATA.map((a) => ({ id: a.id, label: a.en, labelHi: a.hi, emoji: a.emoji })),
  colors: COLORS_DATA.map((c) => ({ id: c.id, label: c.en, labelHi: c.hi, color: c.hex })),
  shapes: SHAPES_DATA.map((s) => ({ id: s.id, label: s.en, labelHi: s.hi, emoji: s.emoji })),
  numbers: NUMBERS_DATA.map((n) => ({ id: String(n.n), label: n.en, labelHi: n.hi, emoji: n.emoji }))
};
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function makeQuestion(mode) {
  const pool = POOL[mode];
  const shuffled = shuffle(pool);
  const correct = shuffled[0];
  const options = shuffled.slice(0, 4);
  return { correct, options: shuffle(options) };
}
function ColorSwatch({ hex, size = 48 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "rounded-2xl inline-block border-2 border-white/60 shadow",
      style: { width: size, height: size, backgroundColor: hex }
    }
  );
}
const TOTAL_QUESTIONS = 8;
function Quiz() {
  const lang = useLang();
  const [mode, setMode] = reactExports.useState(null);
  const [qNum, setQNum] = reactExports.useState(0);
  const [score, setScore] = reactExports.useState(0);
  const [done, setDone] = reactExports.useState(false);
  const [picked, setPicked] = reactExports.useState(null);
  const question = reactExports.useMemo(() => mode ? makeQuestion(mode) : null, [mode, qNum]);
  reactExports.useEffect(() => {
    if (!question || !mode || picked !== null) return;
    const label = lang === "hi" ? question.correct.labelHi : question.correct.label;
    const prefix = lang === "hi" ? t("quizTitle", lang).replace("…?", "") : "Which one is ";
    setTimeout(() => speak(`${prefix} ${label}?`), 300);
  }, [question, lang, mode]);
  function handlePick(item) {
    if (picked !== null) return;
    setPicked(item.id);
    const isCorrect = item.id === question.correct.id;
    if (isCorrect) {
      haptic(30);
      chime();
      setScore((s) => s + 1);
      addQuizScore(1);
      speak(t("correct", lang));
    } else {
      haptic(80);
      pop();
      speak(t("wrong", lang));
    }
    setTimeout(() => {
      if (qNum + 1 >= TOTAL_QUESTIONS) {
        setDone(true);
      } else {
        setQNum((q) => q + 1);
        setPicked(null);
      }
    }, 1e3);
  }
  function restart() {
    setQNum(0);
    setScore(0);
    setDone(false);
    setPicked(null);
  }
  function backToModes() {
    setMode(null);
    restart();
  }
  if (!mode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-rhymes flex flex-col select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95", "aria-label": "Home", children: "🏠" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-14" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 px-5 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center text-3xl font-extrabold text-white drop-shadow mb-2", children: lang === "hi" ? "क्विज़ चुनो! 🧠" : "Pick a Quiz! 🧠" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-white/80 font-semibold mb-6 text-sm", children: lang === "hi" ? `${TOTAL_QUESTIONS} सवाल` : `${TOTAL_QUESTIONS} questions` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 max-w-md mx-auto", children: MODES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              haptic();
              pop();
              setMode(m.id);
            },
            className: `${m.gradient} rounded-3xl p-5 shadow-pop active:scale-95 transition-transform flex flex-col items-start min-h-[120px]`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-2", children: m.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-extrabold text-white drop-shadow", children: lang === "hi" ? m.labelHi : m.label })
            ]
          },
          m.id
        )) })
      ] })
    ] });
  }
  if (done) {
    const pct = Math.round(score / TOTAL_QUESTIONS * 100);
    const medal = pct === 100 ? "🏆" : pct >= 75 ? "🥇" : pct >= 50 ? "🥈" : "🥉";
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-gradient-rhymes flex flex-col items-center justify-center select-none px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[40px] p-8 shadow-pop text-center max-w-sm w-full animate-pop-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl animate-bounce-big", children: medal }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl font-extrabold", children: t("quizDone", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-5xl font-black text-primary", children: [
        score,
        "/",
        TOTAL_QUESTIONS
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-muted-foreground mt-1", children: lang === "hi" ? `${pct}% सही` : `${pct}% correct` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
          restart();
        }, className: "flex-1 rounded-2xl bg-gradient-hero text-white font-extrabold py-3 shadow-pop active:scale-95", children: t("playAgain", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: backToModes, className: "flex-1 rounded-2xl bg-muted font-extrabold py-3 shadow-pop active:scale-95", children: lang === "hi" ? "बदलो" : "Change" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mt-4 block text-sm font-semibold text-muted-foreground", children: [
        "← ",
        t("back", lang)
      ] })
    ] }) });
  }
  if (!question) return null;
  const { correct, options } = question;
  const currentMode = MODES.find((m) => m.id === mode);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `min-h-screen ${currentMode.gradient} flex flex-col select-none`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: backToModes, className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95", "aria-label": "Back", children: "⬅️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-full bg-white/90 px-4 py-2 shadow-pop text-sm font-extrabold", children: [
        qNum + 1,
        "/",
        TOTAL_QUESTIONS,
        " · ⭐",
        score
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 flex flex-col items-center justify-center px-5 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/95 rounded-[32px] px-6 py-5 shadow-pop text-center max-w-sm w-full mb-6 animate-pop-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-muted-foreground uppercase tracking-wide", children: t("quizTitle", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-4xl font-extrabold text-slate-800", children: lang === "hi" ? correct.labelHi : correct.label }),
        mode === "colors" && correct.color && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorSwatch, { hex: correct.color, size: 56 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 max-w-sm w-full", children: options.map((opt) => {
        const isCorrect = opt.id === correct.id;
        const isPicked = picked === opt.id;
        const isWrong = isPicked && !isCorrect;
        const showGreen = picked !== null && isCorrect;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handlePick(opt),
            disabled: picked !== null,
            className: `
                  relative rounded-3xl bg-white shadow-pop p-4 flex flex-col items-center justify-center min-h-[100px] active:scale-95 transition-all
                  ${showGreen ? "ring-4 ring-green-400 bg-green-50 scale-105" : ""}
                  ${isWrong ? "ring-4 ring-red-400 bg-red-50" : ""}
                  ${picked !== null && !isPicked && !isCorrect ? "opacity-50" : ""}
                `,
            "aria-label": opt.label,
            children: [
              mode === "colors" && opt.color ? /* @__PURE__ */ jsxRuntimeExports.jsx(ColorSwatch, { hex: opt.color, size: 52 }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl leading-none", children: opt.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 text-sm font-extrabold text-slate-700 text-center leading-tight", children: lang === "hi" ? opt.labelHi : opt.label }),
              showGreen && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 right-2 text-xl", children: "✅" }),
              isWrong && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 right-2 text-xl", children: "❌" })
            ]
          },
          opt.id
        );
      }) })
    ] })
  ] });
}
const Route$e = createFileRoute("/puzzle-slide")({
  head: () => ({
    meta: [
      { title: "Puzzle Slide — Tiny Genius" },
      { name: "description", content: "Slide and solve the puzzle." }
    ]
  }),
  component: PuzzleSlide
});
function PuzzleSlide() {
  const lang = useLang();
  reactExports.useMemo(() => FRUITS_DATA[Math.floor(Math.random() * FRUITS_DATA.length)], []);
  const [moves, setMoves] = reactExports.useState(0);
  const [solved, setSolved] = reactExports.useState(false);
  const [tiles, setTiles] = reactExports.useState(() => {
    const arr = Array.from({ length: 9 }, (_, i) => i);
    return arr.sort(() => Math.random() - 0.5);
  });
  const emptyIdx = tiles.indexOf(null);
  const canSwap = (idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const emptyRow = Math.floor(emptyIdx / 3);
    const emptyCol = emptyIdx % 3;
    return Math.abs(row - emptyRow) === 1 && col === emptyCol || Math.abs(col - emptyCol) === 1 && row === emptyRow;
  };
  const handleTap = (idx) => {
    if (!canSwap(idx)) return;
    haptic();
    const newTiles = [...tiles];
    [newTiles[idx], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[idx]];
    setTiles(newTiles);
    setMoves((m) => m + 1);
    if (newTiles.every((t2, i) => t2 === i)) {
      chime();
      speak(t("complete", lang));
      addStars(Math.max(5, 30 - moves));
      setSolved(true);
    }
  };
  if (solved) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-gradient-to-br from-sky/20 via-background to-mint/10 flex items-center justify-center pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-7xl mb-4", children: "🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-extrabold mb-2", children: [
        t("complete", lang),
        "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-primary font-bold mb-2", children: [
        "🎵 ",
        moves,
        " moves"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-primary font-bold mb-8", children: [
        "⭐ ",
        Math.max(5, 30 - moves)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/puzzle-slide", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: "🔄 Again" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-sky/20 via-background to-mint/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("puzzleSlide", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold mb-4", children: t("puzzleSlideDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-extrabold text-primary mb-6", children: [
        "🎵 ",
        moves
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 max-w-xs mx-auto", children: tiles.map((tile, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleTap(idx),
          disabled: !canSwap(idx),
          className: `aspect-square rounded-xl shadow-pop active:scale-95 transition-transform font-bold text-2xl ${tile === null ? "bg-transparent" : "bg-gradient-shapes text-white border-2 border-white"}`,
          children: tile !== null ? tile + 1 : ""
        },
        idx
      )) })
    ] })
  ] });
}
const BILINGUAL_LETTERS$1 = [
  { letter: "A", letterHi: "ए", wordEn: "Apple", emoji: "🍎" },
  { letter: "B", letterHi: "बी", wordEn: "Ball", emoji: "⚽" },
  { letter: "C", letterHi: "सी", wordEn: "Cat", emoji: "🐱" },
  { letter: "D", letterHi: "डी", wordEn: "Dog", emoji: "🐶" },
  { letter: "E", letterHi: "ई", wordEn: "Elephant", emoji: "🐘" },
  { letter: "F", letterHi: "एफ", wordEn: "Fish", emoji: "🐟" },
  { letter: "G", letterHi: "जी", wordEn: "Grapes", emoji: "🍇" },
  { letter: "H", letterHi: "एच", wordEn: "Hat", emoji: "🎩" },
  { letter: "I", letterHi: "आई", wordEn: "Ice cream", emoji: "🍦" },
  { letter: "J", letterHi: "जे", wordEn: "Juice", emoji: "🧃" }
];
const Route$d = createFileRoute("/phonics-farm")({
  head: () => ({
    meta: [
      { title: "Phonics Farm — Tiny Genius" },
      { name: "description", content: "Hear phonics and match words." }
    ]
  }),
  component: PhoneticsFarm
});
function PhoneticsFarm() {
  const lang = useLang();
  const [score, setScore] = reactExports.useState(0);
  const [played, setPlayed] = reactExports.useState(false);
  const letter = reactExports.useMemo(() => BILINGUAL_LETTERS$1[Math.floor(Math.random() * BILINGUAL_LETTERS$1.length)], []);
  const options = reactExports.useMemo(
    () => BILINGUAL_LETTERS$1.sort(() => Math.random() - 0.5).slice(0, 3).map((l) => l.letter),
    []
  );
  const choices = reactExports.useMemo(() => {
    const opts = [...options];
    if (!opts.includes(letter.letter)) {
      opts[Math.floor(Math.random() * 3)] = letter.letter;
    }
    return opts.sort(() => Math.random() - 0.5);
  }, []);
  const playSound = () => {
    setPlayed(true);
    speak(lang === "hi" ? letter.letterHi : letter.letter);
  };
  const handleAnswer = (selected) => {
    if (selected === letter.letter) {
      haptic();
      chime();
      speak(t("correct", lang));
      addStars(5);
      setScore((s) => s + 1);
      setTimeout(() => {
        window.location.reload();
      }, 1e3);
    } else {
      pop();
      speak(t("tryAgain", lang));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-coral/20 via-background to-sky/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("phonicsFarm", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold mb-6", children: t("phonicsFarmDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-extrabold text-primary mb-8", children: [
        "⭐ ",
        score
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: playSound,
          className: "mx-auto block w-20 h-20 rounded-full bg-gradient-abc text-white text-3xl shadow-pop active:scale-95 transition-transform mb-8",
          children: "🔊"
        }
      ),
      played && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-extrabold text-primary mb-4", children: letter.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Which letter?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 max-w-xs mx-auto mt-8", children: choices.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleAnswer(ch),
          className: "rounded-2xl bg-white/80 p-4 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 hover:border-primary/50",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-extrabold text-primary", children: ch })
        },
        ch
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: [
      "🏠 ",
      t("home", lang)
    ] }) })
  ] });
}
const Route$c = createFileRoute("/peek-a-buddy")({
  head: () => ({
    meta: [
      { title: "Peek-a-Buddy — Tiny Genius" },
      { name: "description", content: "Find the hiding buddy game." }
    ]
  }),
  component: PeekABuddy
});
function PeekABuddy() {
  const lang = useLang();
  const [revealed, setRevealed] = reactExports.useState(null);
  const [found, setFound] = reactExports.useState(0);
  const [boxes] = reactExports.useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const buddyBox = Math.floor(Math.random() * boxes.length);
  const handleBoxClick = (idx) => {
    setRevealed(idx);
    haptic();
    pop();
    if (idx === buddyBox) {
      speak(t("found", lang));
      chime();
      addStars(3);
      setFound((f) => f + 1);
      setTimeout(() => {
        setRevealed(null);
        Math.floor(Math.random() * boxes.length);
        window.location.reload();
      }, 1500);
    } else {
      speak(t("tryAgain", lang));
      setTimeout(() => setRevealed(null), 800);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-bubblegum/20 via-background to-sunshine/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold text-center flex-1", children: t("peekABuddy", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground mb-2", children: [
        t("found", lang),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl text-primary", children: found })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground mb-8", children: t("peekABuddyDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 max-w-sm mx-auto", children: boxes.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleBoxClick(idx),
          disabled: revealed !== null,
          className: `aspect-square rounded-2xl font-extrabold text-4xl shadow-pop transition-all active:scale-95 ${revealed === idx ? "bg-gradient-hero text-white scale-105" : revealed === buddyBox && revealed !== null ? "bg-gradient-hero text-white" : "bg-white/80 hover:bg-white border-2 border-primary/20"}`,
          children: revealed === idx ? "👋" : revealed === buddyBox && revealed !== null && idx === buddyBox ? "😊" : ""
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: [
      "🏠 ",
      t("home", lang)
    ] }) })
  ] });
}
const Route$b = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parents — Tiny Genius" },
      { name: "description", content: "Parent area — view your child's bilingual learning progress." }
    ]
  }),
  component: Parent
});
function Parent() {
  const lang = useLang();
  const [unlocked, setUnlocked] = reactExports.useState(false);
  const [a] = reactExports.useState(() => 3 + Math.floor(Math.random() * 6));
  const [b] = reactExports.useState(() => 2 + Math.floor(Math.random() * 6));
  const [answer, setAnswer] = reactExports.useState("");
  const [progress, setProgress] = reactExports.useState(loadProgress());
  const [showReset, setShowReset] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (unlocked) setProgress(loadProgress());
  }, [unlocked]);
  function handleReset() {
    resetProgress();
    setProgress(loadProgress());
    setShowReset(false);
  }
  if (!unlocked) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-background flex items-center justify-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card rounded-3xl p-6 shadow-pop", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("parentCheck", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("parentCheckSub", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-3xl font-extrabold text-center", children: [
        a,
        " + ",
        b,
        " = ?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          inputMode: "numeric",
          value: answer,
          onChange: (e) => setAnswer(e.target.value),
          className: "mt-4 w-full rounded-2xl border-2 border-input px-4 py-3 text-xl text-center font-bold focus:outline-none focus:border-primary",
          "aria-label": "Answer"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            if (Number(answer) === a + b) setUnlocked(true);
            else setAnswer("");
          },
          className: "mt-4 w-full rounded-2xl bg-gradient-hero text-white font-extrabold py-3 shadow-pop active:scale-95 transition-transform",
          children: t("unlock", lang)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mt-3 block text-center text-sm font-semibold text-muted-foreground", children: [
        "← ",
        t("back", lang)
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-extrabold", children: t("parentDashboard", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 mt-6 grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: t("starsEarned", lang), value: progress.stars, emoji: "⭐" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: t("lettersLearned", lang), value: progress.letters.length, emoji: "🔤" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: t("itemsTraced", lang), value: progress.traced.length, emoji: "✏️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: t("numbersStat", lang), value: progress.numbers.length, emoji: "🔢" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: t("animalsStat", lang), value: progress.animals?.length ?? 0, emoji: "🦁" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: t("colorsStat", lang), value: progress.colors?.length ?? 0, emoji: "🎨" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: t("quizScore", lang), value: progress.quizScore ?? 0, emoji: "🧠" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-extrabold", children: t("lettersMastered", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
        progress.letters.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("nothingYet", lang) }),
        progress.letters.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-12 rounded-2xl bg-gradient-abc text-white font-extrabold flex items-center justify-center shadow-pop", children: l }, l))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 mt-8 mb-4", children: !showReset ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setShowReset(true),
        className: "w-full rounded-2xl border-2 border-destructive/40 text-destructive font-bold py-3 text-sm",
        children: [
          "🗑️ ",
          t("resetProgress", lang)
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 shadow-pop", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center font-bold", children: t("resetConfirm", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleReset, className: "flex-1 rounded-xl bg-destructive text-white font-bold py-2", children: t("yes", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowReset(false), className: "flex-1 rounded-xl bg-muted font-bold py-2", children: t("cancel", lang) })
      ] })
    ] }) })
  ] });
}
function Stat({ label, value, emoji }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card p-5 shadow-pop", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: emoji }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-3xl font-extrabold tabular-nums", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground", children: label })
  ] });
}
const Route$a = createFileRoute("/numbers")({
  head: () => ({
    meta: [
      { title: "Numbers — Tiny Genius" },
      { name: "description", content: "Count 1 to 20, visual counting, and multiplication tables in English and Hindi." }
    ]
  }),
  component: Numbers
});
const ALL_NUMBERS = [
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
  { n: 11, en: "Eleven", hi: "ग्यारह", hiNum: "११", emoji: "🌙" },
  { n: 12, en: "Twelve", hi: "बारह", hiNum: "१२", emoji: "🎂" },
  { n: 13, en: "Thirteen", hi: "तेरह", hiNum: "१३", emoji: "🦄" },
  { n: 14, en: "Fourteen", hi: "चौदह", hiNum: "१४", emoji: "🌈" },
  { n: 15, en: "Fifteen", hi: "पंद्रह", hiNum: "१५", emoji: "🏆" },
  { n: 16, en: "Sixteen", hi: "सोलह", hiNum: "१६", emoji: "🚀" },
  { n: 17, en: "Seventeen", hi: "सत्रह", hiNum: "१७", emoji: "🦋" },
  { n: 18, en: "Eighteen", hi: "अठारह", hiNum: "१८", emoji: "🌺" },
  { n: 19, en: "Nineteen", hi: "उन्नीस", hiNum: "१९", emoji: "🐠" },
  { n: 20, en: "Twenty", hi: "बीस", hiNum: "२०", emoji: "🎉" }
];
const TABLE_EMOJIS = ["🍎", "🌟", "🐱", "🍌", "🌸", "🎈", "🍓", "🦋", "🐢", "🐬"];
const HI_MULTIPLIER = ["एकम", "दूनी", "तिया", "चौके", "पंचे", "छक्के", "सत्ते", "अट्ठे", "नौवे", "दहिये"];
const EN_MULTIPLIER = ["ones", "twos", "threes", "fours", "fives", "sixes", "sevens", "eights", "nines", "tens"];
const HI_NUMBERS_100 = {
  1: "एक",
  2: "दो",
  3: "तीन",
  4: "चार",
  5: "पाँच",
  6: "छह",
  7: "सात",
  8: "आठ",
  9: "नौ",
  10: "दस",
  11: "ग्यारह",
  12: "बारह",
  13: "तेरह",
  14: "चौदह",
  15: "पंद्रह",
  16: "सोलह",
  17: "सत्रह",
  18: "अठारह",
  19: "उन्नीस",
  20: "बीस",
  21: "इक्कीस",
  22: "बाईस",
  23: "तेईस",
  24: "चौबीस",
  25: "पच्चीस",
  26: "छब्बीस",
  27: "सत्ताईस",
  28: "अट्ठाईस",
  29: "उनतीस",
  30: "तीस",
  31: "इकतीस",
  32: "बत्तीस",
  33: "तैंतीस",
  34: "चौंतीस",
  35: "पैंतीस",
  36: "छत्तीस",
  37: "सैंतीस",
  38: "अड़तीस",
  39: "उनतालीस",
  40: "चालीस",
  41: "इकतालीस",
  42: "बयालीस",
  43: "तैंतालीस",
  44: "चौवालीस",
  45: "पैंतालीस",
  46: "छियालीस",
  47: "सैंतालीस",
  48: "अड़तालीस",
  49: "उनचास",
  50: "पचास",
  51: "इक्यावन",
  52: "बावन",
  53: "तिरपन",
  54: "चौवन",
  55: "पचपन",
  56: "छप्पन",
  57: "सत्तावन",
  58: "अट्ठावन",
  59: "उनसठ",
  60: "साठ",
  61: "इकसठ",
  62: "बासठ",
  63: "तिरसठ",
  64: "चौंसठ",
  65: "पैंसठ",
  66: "छियासठ",
  67: "सड़सठ",
  68: "अड़सठ",
  69: "उनहत्तर",
  70: "सत्तर",
  71: "इकहत्तर",
  72: "बहत्तर",
  73: "तिहत्तर",
  74: "चौहत्तर",
  75: "पचहत्तर",
  76: "छिहत्तर",
  77: "सतहत्तर",
  78: "अठहत्तर",
  79: "उनासी",
  80: "अस्सी",
  81: "इक्यासी",
  82: "बयासी",
  83: "तिरासी",
  84: "चौरासी",
  85: "पचासी",
  86: "छियासी",
  87: "सत्तासी",
  88: "अट्ठासी",
  89: "नवासी",
  90: "नब्बे",
  91: "इक्यानवे",
  92: "बानवे",
  93: "तिरानवे",
  94: "चौरानवे",
  95: "पचानवे",
  96: "छियानवे",
  97: "सत्तानवे",
  98: "अट्ठानवे",
  99: "निन्यानवे",
  100: "सौ"
};
function LearnTab({ lang }) {
  const [idx, setIdx] = reactExports.useState(0);
  const [burst, setBurst] = reactExports.useState(0);
  const item = ALL_NUMBERS[idx];
  const touchStartX = reactExports.useRef(0);
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next();
    else prev();
  }
  function prev() {
    setIdx((i) => (i - 1 + ALL_NUMBERS.length) % ALL_NUMBERS.length);
  }
  function next() {
    setIdx((i) => (i + 1) % ALL_NUMBERS.length);
  }
  const particles = reactExports.useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: `${burst}-${i}`,
    x: Math.cos(i / 12 * Math.PI * 2) * (60 + Math.random() * 40),
    y: Math.sin(i / 12 * Math.PI * 2) * (60 + Math.random() * 40)
  })), [burst]);
  reactExports.useEffect(() => {
    haptic();
    pop();
    const t2 = setTimeout(() => speak(lang === "hi" ? item.hi : `${item.n}, ${item.en}`), 150);
    return () => clearTimeout(t2);
  }, [item, lang]);
  function tap() {
    haptic(20);
    chime();
    markNumber(item.n);
    setBurst((b) => b + 1);
    speak(lang === "hi" ? item.hi : `${item.n}, ${item.en}`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center px-6 relative flex-1",
      onTouchStart,
      onTouchEnd,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute text-2xl", style: { animation: "pop-in 0.7s cubic-bezier(.34,1.56,.64,1) both", transform: `translate(${p.x}px, ${p.y}px)` }, children: "⭐" }, p.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-4 flex-wrap justify-center max-w-xs", children: ALL_NUMBERS.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIdx(i),
            className: `rounded-full transition-all ${i === idx ? "w-4 h-2.5 bg-white" : "size-2 bg-white/40"}`
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: tap,
            "aria-label": `Number ${item.n}`,
            className: "relative bg-white rounded-[48px] w-56 h-56 sm:w-72 sm:h-72 flex flex-col items-center justify-center shadow-pop active:scale-95 transition-transform animate-pop-in",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7rem] sm:text-[9rem] font-black leading-none bg-gradient-hero bg-clip-text text-transparent", children: lang === "hi" ? item.hiNum : item.n }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mt-1 animate-wiggle", children: item.emoji })
            ]
          },
          item.n
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-3 bg-white/95 rounded-full px-6 py-3 shadow-pop animate-pop-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-extrabold", children: lang === "hi" ? item.hi : item.en }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-muted-foreground", children: lang === "hi" ? `(${item.en})` : `(${item.hi})` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-1.5 max-w-xs", children: [
          Array.from({ length: Math.min(item.n, 10) }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl animate-pop-in", style: { animationDelay: `${i * 50}ms` }, children: item.emoji }, i)),
          item.n > 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-extrabold text-white/90 self-center", children: [
            "+",
            item.n - 10
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: prev, className: "size-16 rounded-full bg-white shadow-pop text-3xl flex items-center justify-center active:scale-90", "aria-label": "Previous", children: "⬅️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-extrabold text-sm", children: [
            idx + 1,
            "/",
            ALL_NUMBERS.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: next, className: "size-16 rounded-full bg-white shadow-pop text-3xl flex items-center justify-center active:scale-90", "aria-label": "Next", children: "➡️" })
        ] })
      ]
    }
  );
}
function CountingTab({ lang }) {
  const [target, setTarget] = reactExports.useState(5);
  const [count, setCount] = reactExports.useState(0);
  const item = ALL_NUMBERS[target - 1];
  reactExports.useEffect(() => {
    setCount(0);
    speak(lang === "hi" ? `${item.hi} तक गिनो!` : `Count to ${item.en}!`);
  }, [target, lang]);
  function tapEmoji(i) {
    if (i !== count) return;
    haptic(10);
    pop();
    const next = count + 1;
    setCount(next);
    speak(lang === "hi" ? ALL_NUMBERS[next - 1].hi : String(next));
    if (next === target) {
      setTimeout(() => {
        chime();
        haptic(40);
        speak(lang === "hi" ? "शाबाश!" : "Well done!");
      }, 200);
    }
  }
  function reset() {
    setCount(0);
    pop();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center px-5 py-4 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/20 rounded-2xl p-3 mb-4 w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-extrabold text-sm text-center mb-2", children: lang === "hi" ? "कितने तक गिनें?" : "Count up to:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap justify-center", children: [5, 10, 15, 20].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            haptic();
            setTarget(n);
          },
          className: `px-4 py-1.5 rounded-full font-extrabold text-sm transition-all ${target === n ? "bg-white text-slate-800 shadow-pop" : "bg-white/30 text-white"}`,
          children: n
        },
        n
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/95 rounded-3xl px-6 py-3 shadow-pop text-center mb-4 w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-black bg-gradient-hero bg-clip-text text-transparent leading-none", children: count === 0 ? "0" : lang === "hi" ? ALL_NUMBERS[count - 1].hiNum : count }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-500 mt-0.5", children: count === 0 ? lang === "hi" ? "नीचे जानवर छुओ!" : "Tap the animal below!" : lang === "hi" ? ALL_NUMBERS[count - 1].hi : ALL_NUMBERS[count - 1].en }),
      count === target && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500 font-extrabold mt-1 animate-pop-in text-base", children: lang === "hi" ? "🎉 शाबाश!" : "🎉 Amazing!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 max-w-sm w-full", children: Array.from({ length: target }).map((_, i) => {
      const tapped = i < count;
      const isNext = i === count;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center", children: [
        isNext && count < target && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute top-2 text-xl z-10 pointer-events-none",
            style: { animation: "float-y 0.8s ease-in-out infinite" },
            children: "👆"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => tapEmoji(i),
            "aria-label": `Item ${i + 1}`,
            className: `
                  relative text-4xl rounded-2xl p-2 transition-all duration-200
                  ${tapped ? "opacity-100 scale-100" : isNext ? "opacity-100 scale-110 active:scale-95" : "opacity-25 grayscale scale-90"}
                `,
            style: isNext ? {
              animation: "bounce-big 0.7s ease-in-out infinite",
              filter: "drop-shadow(0 0 10px rgba(255,200,0,0.9))"
            } : void 0,
            children: [
              tapped && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute -top-1 -right-1 text-base leading-none z-10",
                  style: { animation: "pop-in 0.3s cubic-bezier(.34,1.56,.64,1) both" },
                  children: "✅"
                }
              ),
              item.emoji
            ]
          }
        ),
        tapped && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold text-white mt-0.5", children: lang === "hi" ? ALL_NUMBERS[i].hiNum : i + 1 })
      ] }, i);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: reset,
        className: "mt-5 bg-white/30 text-white font-extrabold px-6 py-2 rounded-full active:scale-95",
        children: [
          "🔄 ",
          lang === "hi" ? "फिर से" : "Reset"
        ]
      }
    )
  ] });
}
function TablesTab({ lang }) {
  const [tableOf, setTableOf] = reactExports.useState(2);
  const [revealed, setRevealed] = reactExports.useState(0);
  const emoji = TABLE_EMOJIS[tableOf - 1];
  const tableName = ALL_NUMBERS[tableOf - 1];
  reactExports.useEffect(() => {
    setRevealed(0);
    speak(lang === "hi" ? `${tableName.hi} का पहाड़ा` : `Table of ${tableOf}`);
  }, [tableOf, lang]);
  function speakRow(step) {
    const result = tableOf * step;
    const resultHi = HI_NUMBERS_100[result] ?? String(result);
    if (lang === "hi") {
      speak(`${tableName.hi} ${HI_MULTIPLIER[step - 1]} ${resultHi}`);
    } else {
      speak(`${tableName.en} ${EN_MULTIPLIER[step - 1]} are ${result}`);
    }
  }
  function revealNext() {
    if (revealed >= 10) return;
    const next = revealed + 1;
    setRevealed(next);
    haptic(10);
    pop();
    speakRow(next);
    if (next === 10) {
      setTimeout(() => {
        chime();
        haptic(50);
      }, 400);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center px-4 py-4 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/20 rounded-2xl p-3 mb-4 w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-extrabold text-sm text-center mb-2", children: lang === "hi" ? "किसका पहाड़ा?" : "Table of:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap justify-center", children: [2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            haptic();
            setTableOf(n);
          },
          className: `w-10 h-10 rounded-2xl font-extrabold text-base transition-all ${tableOf === n ? "bg-white text-slate-800 shadow-pop" : "bg-white/30 text-white"}`,
          children: n
        },
        n
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm space-y-2 overflow-y-auto", style: { maxHeight: "52vh" }, children: Array.from({ length: 10 }, (_, i) => i + 1).map((step) => {
      const result = tableOf * step;
      const resultHi = HI_NUMBERS_100[result] ?? String(result);
      const visible = step <= revealed;
      const leftEn = `${tableName.en} ${EN_MULTIPLIER[step - 1]}`;
      const leftHi = `${tableName.hi} ${HI_MULTIPLIER[step - 1]}`;
      const rightEn = String(result);
      const rightHi = resultHi;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: visible ? () => speakRow(step) : revealNext,
          className: `w-full rounded-2xl px-4 py-3 flex items-center justify-between shadow-pop transition-all active:scale-[0.98]
                ${visible ? "bg-white" : "bg-white/30"}`,
          "aria-label": `${tableOf} x ${step}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", children: emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-extrabold text-slate-800 leading-tight truncate ${lang === "hi" ? "text-sm font-hindi" : "text-sm"}`, children: lang === "hi" ? leftHi : leftEn }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-400 font-semibold", children: [
                  tableOf,
                  " × ",
                  step,
                  " = ",
                  result
                ] })
              ] })
            ] }),
            visible ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-black text-primary ml-2 flex-shrink-0", children: [
              "= ",
              lang === "hi" ? rightHi : rightEn
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-extrabold text-xs px-2 py-1 bg-white/40 rounded-full flex-shrink-0", children: lang === "hi" ? "छुओ" : "Tap" })
          ]
        },
        step
      );
    }) }),
    revealed < 10 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: revealNext,
        className: "mt-4 bg-white text-slate-800 font-extrabold px-6 py-3 rounded-full shadow-pop active:scale-95",
        children: lang === "hi" ? "अगला ➡️" : "Next ➡️"
      }
    ),
    revealed === 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-extrabold text-lg animate-pop-in", children: [
        "🎉 ",
        lang === "hi" ? "पहाड़ा पूरा!" : "Table done!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setRevealed(0),
          className: "bg-white/30 text-white font-bold px-4 py-2 rounded-full active:scale-95",
          children: "🔄"
        }
      )
    ] })
  ] });
}
function Numbers() {
  const lang = useLang();
  const [tab, setTab] = reactExports.useState("learn");
  const tabs = [
    { id: "learn", label: "Learn", labelHi: "सीखो", emoji: "🔢" },
    { id: "count", label: "Count", labelHi: "गिनो", emoji: "👆" },
    { id: "table", label: "Tables", labelHi: "पहाड़ा", emoji: "✖️" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-numbers flex flex-col select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95", "aria-label": "Home", children: "🏠" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-14" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 px-5 mt-4 flex-shrink-0", children: tabs.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          haptic();
          pop();
          setTab(t2.id);
        },
        className: `flex-1 rounded-2xl py-2.5 font-extrabold text-sm flex items-center justify-center gap-1.5 transition-all
              ${tab === t2.id ? "bg-white text-slate-800 shadow-pop" : "bg-white/25 text-white"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t2.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lang === "hi" ? t2.labelHi : t2.label })
        ]
      },
      t2.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col pb-6 overflow-hidden", children: [
      tab === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsx(LearnTab, { lang }),
      tab === "count" && /* @__PURE__ */ jsxRuntimeExports.jsx(CountingTab, { lang }),
      tab === "table" && /* @__PURE__ */ jsxRuntimeExports.jsx(TablesTab, { lang })
    ] })
  ] });
}
const Route$9 = createFileRoute("/memory-garden")({
  head: () => ({
    meta: [
      { title: "Memory Garden — Tiny Genius" },
      { name: "description", content: "Flip and match pairs!" }
    ]
  }),
  component: MemoryGarden
});
function MemoryGarden() {
  const lang = useLang();
  const animals = reactExports.useMemo(
    () => ANIMALS_DATA.slice(0, 4).flatMap((a) => [a, a]).sort(() => Math.random() - 0.5),
    []
  );
  const [flipped, setFlipped] = reactExports.useState([]);
  const [matched, setMatched] = reactExports.useState([]);
  const [moves, setMoves] = reactExports.useState(0);
  const handleFlip = (idx) => {
    if (matched.includes(idx) || flipped.includes(idx)) return;
    haptic();
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const id1 = animals[newFlipped[0]].id;
      const id2 = animals[newFlipped[1]].id;
      if (id1 === id2) {
        chime();
        setMatched([...matched, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
        if (matched.length + 2 === animals.length) {
          speak(t("complete", lang));
          addStars(20);
        }
      } else {
        pop();
        setTimeout(() => setFlipped([]), 1e3);
      }
    }
  };
  const isComplete = matched.length === animals.length;
  if (isComplete) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-gradient-to-br from-coral/20 via-background to-mint/10 flex items-center justify-center pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-7xl mb-4", children: "🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-extrabold mb-2", children: [
        t("complete", lang),
        "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-primary font-bold mb-2", children: [
        "🎵 ",
        moves,
        " moves"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-primary font-bold mb-8", children: "⭐ 20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/memory-garden", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: "🔄 Again" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-coral/20 via-background to-mint/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("memoryGarden", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold mb-4", children: t("memoryGardenDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-primary mb-6", children: [
        "🎵 ",
        moves
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 max-w-xs mx-auto", children: animals.map((animal, idx) => {
        const isFlipped = flipped.includes(idx) || matched.includes(idx);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleFlip(idx),
            disabled: isFlipped,
            className: `aspect-square rounded-lg shadow-pop active:scale-95 transition-transform font-bold text-2xl ${isFlipped ? "bg-white/80 border-2 border-primary/30" : "bg-gradient-animals text-white border-2 border-white"}`,
            children: isFlipped ? animal.emoji : "🌿"
          },
          idx
        );
      }) })
    ] })
  ] });
}
const Route$8 = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Tiny Genius" },
      { name: "description", content: "See who's winning!" }
    ]
  }),
  component: Leaderboard
});
function Leaderboard() {
  const lang = useLang();
  const [profiles, setProfiles] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const progress = loadProgress();
    const storedProfiles = localStorage.getItem("childProfiles");
    if (storedProfiles) {
      try {
        const pfs = JSON.parse(storedProfiles);
        setProfiles(pfs.sort((a, b) => b.stars - a.stars));
      } catch {
        setProfiles([]);
      }
    } else {
      setProfiles([
        { name: "Your Child", stars: progress.stars, emoji: "😊", id: "default" }
      ]);
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-sky/20 via-background to-grape/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("leaderboard", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 max-w-sm mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-lg font-bold mb-8", children: t("leaderboardDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: profiles.map((profile, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-2xl p-4 shadow-pop flex items-center justify-between ${idx === 0 ? "bg-gradient-hero text-white" : "bg-white/80 text-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: profile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-75", children: profile.emoji || "😊" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-extrabold", children: [
              "⭐ ",
              profile.stars
            ] })
          ]
        },
        profile.id
      )) }),
      profiles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No profiles yet. Start playing to appear on the leaderboard!" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: [
      "🏠 ",
      t("home", lang)
    ] }) })
  ] });
}
const Route$7 = createFileRoute("/fruits")({
  head: () => ({
    meta: [
      { title: "Fruits — Tiny Genius" },
      { name: "description", content: "Learn fruits and vegetables in English and Hindi." }
    ]
  }),
  component: Fruits
});
function Fruits() {
  const lang = useLang();
  const [active, setActive] = reactExports.useState(null);
  function tap(f) {
    haptic();
    pop();
    chime();
    setActive(f.id);
    markFruit(f.id);
    speak(lang === "hi" ? f.hi : f.en);
    setTimeout(() => setActive(null), 700);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "main",
    {
      className: "min-h-screen bg-gradient-animals flex flex-col select-none",
      style: { background: "linear-gradient(135deg, #f9a825, #ff7043)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95", "aria-label": "Home", children: "🏠" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-14" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 px-4 py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center text-3xl font-extrabold text-white drop-shadow mb-6", children: lang === "hi" ? "फल छुओ! 🍎" : "Tap a fruit! 🍎" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 max-w-md mx-auto", children: FRUITS_DATA.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => tap(f),
              "aria-label": f.en,
              className: `bg-white rounded-3xl p-3 shadow-pop flex flex-col items-center active:scale-95 transition-transform
                ${active === f.id ? "ring-4 ring-yellow-400 animate-pop-in" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-5xl ${active === f.id ? "animate-bounce-big" : "animate-float-y"}`, children: f.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 text-sm font-extrabold text-slate-800 text-center leading-tight", children: lang === "hi" ? f.hi : f.en }),
                lang === "hi" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400 font-semibold", children: f.en })
              ]
            },
            f.id
          )) })
        ] })
      ]
    }
  );
}
const Route$6 = createFileRoute("/daily-challenge")({
  head: () => ({
    meta: [
      { title: "Daily Challenge — Tiny Genius" },
      { name: "description", content: "One game per day!" }
    ]
  }),
  component: DailyChallenge
});
const GAMES = [
  { name: "Peek-a-Buddy", to: "/peek-a-buddy", emoji: "👋" },
  { name: "Sound Match", to: "/sound-match", emoji: "🔊" },
  { name: "Color Mix", to: "/color-mix", emoji: "🎨" },
  { name: "Rhythm Tap", to: "/rhythm-tap", emoji: "🎵" },
  { name: "Memory Garden", to: "/memory-garden", emoji: "🌿" }
];
function DailyChallenge() {
  const lang = useLang();
  const [todayGame, setTodayGame] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const today = (/* @__PURE__ */ new Date()).toDateString();
    const stored = localStorage.getItem("dailyChallenge.date");
    if (stored !== today) {
      const gameOfTheDay = GAMES[Math.floor(Math.random() * GAMES.length)];
      setTodayGame(gameOfTheDay);
      localStorage.setItem("dailyChallenge.date", today);
      localStorage.setItem("dailyChallenge.game", gameOfTheDay.name);
    } else {
      const gameName = localStorage.getItem("dailyChallenge.game");
      const game = GAMES.find((g) => g.name === gameName) || GAMES[0];
      setTodayGame(game);
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-to-br from-sunshine/20 via-background to-sky/10 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("dailyChallenge", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-12 text-center max-w-sm mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold mb-8", children: [
        "🌟 ",
        t("dailyChallengeDesc", lang)
      ] }),
      todayGame ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/80 rounded-3xl p-8 shadow-pop mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl mb-4", children: todayGame.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold mb-6", children: todayGame.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Bonus: +50 stars for completing today's challenge!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: todayGame.to,
            className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop",
            children: "▶️ Play Now"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Loading today's challenge..." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Come back tomorrow for a new challenge!" })
    ] })
  ] });
}
const Route$5 = createFileRoute("/colors")({
  head: () => ({
    meta: [
      { title: "Colors — Tiny Genius" },
      { name: "description", content: "Tap to learn colors in English and Hindi." }
    ]
  }),
  component: Colors
});
function Colors() {
  const lang = useLang();
  const [picked, setPicked] = reactExports.useState(null);
  function tap(id, en, hi) {
    haptic();
    pop();
    setPicked(id);
    markColor(id);
    chime();
    speak(lang === "hi" ? hi : en);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-colors flex flex-col select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl", "aria-label": "Home", children: "🏠" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-14" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 px-5 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center text-3xl font-extrabold text-white drop-shadow mb-6", children: lang === "hi" ? "रंग छुओ!" : "Tap a color!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 max-w-md mx-auto", children: COLORS_DATA.map((c) => {
        const active = picked === c.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => tap(c.id, c.en, c.hi),
            "aria-label": c.en,
            className: `relative aspect-square rounded-3xl shadow-pop active:scale-95 transition-transform flex items-end justify-center p-2 ${active ? "ring-4 ring-white animate-pop-in" : ""}`,
            style: { backgroundColor: c.hex },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold px-2 py-1 rounded-full bg-white/90 text-foreground", children: lang === "hi" ? c.hi : c.en })
          },
          c.id
        );
      }) })
    ] })
  ] });
}
const Route$4 = createFileRoute("/color-mix")({
  head: () => ({
    meta: [
      { title: "Color Mix Lab — Tiny Genius" },
      { name: "description", content: "Mix colors to create new ones." }
    ]
  }),
  component: ColorMix
});
const colorMixes = [
  { color1: "#FF4D4D", color2: "#FFD93D", result: "#FFB84D" },
  // red + yellow = orange
  { color1: "#4D9DFF", color2: "#FF4D4D", result: "#A66BFF" },
  // blue + red = purple
  { color1: "#FF7AB6", color2: "#FFD93D", result: "#FFA566" }
  // pink + yellow = coral
];
function ColorMix() {
  const lang = useLang();
  const [score, setScore] = reactExports.useState(0);
  const [selected, setSelected] = reactExports.useState([]);
  const mix = reactExports.useMemo(() => colorMixes[Math.floor(Math.random() * colorMixes.length)], []);
  const handleColorClick = (hex) => {
    const newSelected = [...selected, hex];
    setSelected(newSelected);
    haptic();
    if (newSelected.length === 2) {
      const isCorrect = newSelected[0] === mix.color1 && newSelected[1] === mix.color2 || newSelected[0] === mix.color2 && newSelected[1] === mix.color1;
      if (isCorrect) {
        chime();
        speak(t("correct", lang));
        addStars(5);
        setScore((s) => s + 1);
        setTimeout(() => {
          setSelected([]);
        }, 1500);
      } else {
        speak(t("tryAgain", lang));
        setTimeout(() => {
          setSelected([]);
        }, 800);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("colorMixLab", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold mb-6", children: t("colorMixDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-extrabold text-primary mb-8", children: [
        "⭐ ",
        score
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs mx-auto mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Make this color:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-24 h-24 rounded-3xl shadow-pop mx-auto border-4 border-primary/30",
            style: { backgroundColor: mix.result }
          }
        )
      ] }),
      selected.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-3 mb-8", children: selected.map((hex, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-12 h-12 rounded-2xl shadow-pop border-2 border-white",
          style: { backgroundColor: hex }
        },
        idx
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 max-w-xs mx-auto", children: COLORS_DATA.slice(0, 6).map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleColorClick(color.hex),
          disabled: selected.length === 2,
          className: "w-16 h-16 rounded-2xl shadow-pop active:scale-95 transition-transform border-3 border-white",
          style: {
            backgroundColor: color.hex,
            opacity: selected.length === 2 ? 0.5 : 1
          }
        },
        color.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop", children: [
      "🏠 ",
      t("home", lang)
    ] }) })
  ] });
}
const Route$3 = createFileRoute("/body")({
  head: () => ({
    meta: [
      { title: "Body Parts — Tiny Genius" },
      { name: "description", content: "Learn body parts in English and Hindi." }
    ]
  }),
  component: Body
});
function Body() {
  const lang = useLang();
  const [active, setActive] = reactExports.useState(null);
  function tap(b) {
    haptic(20);
    pop();
    chime();
    setActive(b.id);
    markBody(b.id);
    const text = lang === "hi" ? `यह है ${b.hi}!` : `This is your ${b.en}!`;
    speak(text);
    setTimeout(() => setActive(null), 800);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "main",
    {
      className: "min-h-screen flex flex-col select-none",
      style: { background: "linear-gradient(135deg, #ce93d8, #f48fb1)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95", "aria-label": "Home", children: "🏠" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-14" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 px-4 py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center text-3xl font-extrabold text-white drop-shadow mb-6", children: lang === "hi" ? "शरीर के अंग छुओ! 👁️" : "Tap body parts! 👁️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 max-w-md mx-auto", children: BODY_DATA.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => tap(b),
              "aria-label": b.en,
              className: `bg-white rounded-3xl p-5 shadow-pop flex flex-col items-center active:scale-95 transition-transform
                ${active === b.id ? "ring-4 ring-purple-400 scale-105" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-6xl ${active === b.id ? "animate-bounce-big" : "animate-wiggle"}`, children: b.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 text-xl font-extrabold text-slate-800", children: lang === "hi" ? b.hi : b.en }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-400 mt-0.5", children: lang === "hi" ? b.en : b.hi })
              ]
            },
            b.id
          )) })
        ] })
      ]
    }
  );
}
const Route$2 = createFileRoute("/animals")({
  head: () => ({
    meta: [
      { title: "Animals — Tiny Genius" },
      { name: "description", content: "Meet animals and hear their sounds in English and Hindi." }
    ]
  }),
  component: Animals
});
function Animals() {
  const lang = useLang();
  const [active, setActive] = reactExports.useState(null);
  function tap(a) {
    haptic();
    pop();
    chime();
    setActive(a.id);
    markAnimal(a.id);
    const text = lang === "hi" ? `${a.hi}. ${a.soundHi}` : `${a.en}. ${a.soundEn}`;
    speak(text);
    setTimeout(() => setActive(null), 800);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gradient-animals flex flex-col select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl", "aria-label": "Home", children: "🏠" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-14" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center text-3xl font-extrabold text-white drop-shadow mb-6", children: lang === "hi" ? "जानवर छुओ!" : "Tap an animal!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 max-w-md mx-auto", children: ANIMALS_DATA.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => tap(a),
          "aria-label": a.en,
          className: "relative bg-white rounded-3xl p-4 shadow-pop active:scale-95 transition-transform flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-7xl ${active === a.id ? "animate-bounce-big" : "animate-float-y"}`, children: a.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 text-xl font-extrabold", children: lang === "hi" ? a.hi : a.en }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground", children: lang === "hi" ? a.soundHi : a.soundEn })
          ]
        },
        a.id
      )) })
    ] })
  ] });
}
const Route$1 = createFileRoute("/abc")({
  head: () => ({
    meta: [
      { title: "ABC — Tiny Genius" },
      { name: "description", content: "Learn letters A–Z in English and Hindi with interactive sounds and pictures." }
    ]
  }),
  component: ABC
});
const BILINGUAL_LETTERS = [
  { letter: "A", letterHi: "ए", wordEn: "Apple", wordHi: "सेब", wordHiPhonetic: "एप्पल", emoji: "🍎", gradient: "bg-gradient-abc" },
  { letter: "B", letterHi: "बी", wordEn: "Ball", wordHi: "गेंद", wordHiPhonetic: "बॉल", emoji: "⚽", gradient: "bg-gradient-numbers" },
  { letter: "C", letterHi: "सी", wordEn: "Cat", wordHi: "बिल्ली", wordHiPhonetic: "कैट", emoji: "🐱", gradient: "bg-gradient-shapes" },
  { letter: "D", letterHi: "डी", wordEn: "Dog", wordHi: "कुत्ता", wordHiPhonetic: "डॉग", emoji: "🐶", gradient: "bg-gradient-tracing" },
  { letter: "E", letterHi: "ई", wordEn: "Elephant", wordHi: "हाथी", wordHiPhonetic: "एलीफेंट", emoji: "🐘", gradient: "bg-gradient-colors" },
  { letter: "F", letterHi: "एफ", wordEn: "Fish", wordHi: "मछली", wordHiPhonetic: "फिश", emoji: "🐟", gradient: "bg-gradient-animals" },
  { letter: "G", letterHi: "जी", wordEn: "Grapes", wordHi: "अंगूर", wordHiPhonetic: "ग्रेप्स", emoji: "🍇", gradient: "bg-gradient-abc" },
  { letter: "H", letterHi: "एच", wordEn: "Hat", wordHi: "टोपी", wordHiPhonetic: "हैट", emoji: "🎩", gradient: "bg-gradient-numbers" },
  { letter: "I", letterHi: "आई", wordEn: "Ice cream", wordHi: "कुल्फी", wordHiPhonetic: "आइसक्रीम", emoji: "🍦", gradient: "bg-gradient-shapes" },
  { letter: "J", letterHi: "जे", wordEn: "Juice", wordHi: "रस", wordHiPhonetic: "जूस", emoji: "🧃", gradient: "bg-gradient-tracing" },
  { letter: "K", letterHi: "के", wordEn: "Kite", wordHi: "पतंग", wordHiPhonetic: "काइट", emoji: "🪁", gradient: "bg-gradient-colors" },
  { letter: "L", letterHi: "एल", wordEn: "Lion", wordHi: "शेर", wordHiPhonetic: "लायन", emoji: "🦁", gradient: "bg-gradient-animals" },
  { letter: "M", letterHi: "एम", wordEn: "Moon", wordHi: "चाँद", wordHiPhonetic: "मून", emoji: "🌙", gradient: "bg-gradient-abc" },
  { letter: "N", letterHi: "एन", wordEn: "Nest", wordHi: "घोंसला", wordHiPhonetic: "नेस्ट", emoji: "🪺", gradient: "bg-gradient-numbers" },
  { letter: "O", letterHi: "ओ", wordEn: "Orange", wordHi: "संतरा", wordHiPhonetic: "ऑरेंज", emoji: "🍊", gradient: "bg-gradient-shapes" },
  { letter: "P", letterHi: "पी", wordEn: "Panda", wordHi: "पांडा", wordHiPhonetic: "पांडा", emoji: "🐼", gradient: "bg-gradient-tracing" },
  { letter: "Q", letterHi: "क्यू", wordEn: "Queen", wordHi: "रानी", wordHiPhonetic: "क्वीन", emoji: "👑", gradient: "bg-gradient-colors" },
  { letter: "R", letterHi: "आर", wordEn: "Rainbow", wordHi: "इंद्रधनुष", wordHiPhonetic: "रेनबो", emoji: "🌈", gradient: "bg-gradient-animals" },
  { letter: "S", letterHi: "एस", wordEn: "Sun", wordHi: "सूरज", wordHiPhonetic: "सन", emoji: "☀️", gradient: "bg-gradient-abc" },
  { letter: "T", letterHi: "टी", wordEn: "Tree", wordHi: "पेड़", wordHiPhonetic: "ट्री", emoji: "🌳", gradient: "bg-gradient-numbers" },
  { letter: "U", letterHi: "यू", wordEn: "Umbrella", wordHi: "छतरी", wordHiPhonetic: "अम्ब्रेला", emoji: "☂️", gradient: "bg-gradient-shapes" },
  { letter: "V", letterHi: "वी", wordEn: "Van", wordHi: "गाड़ी", wordHiPhonetic: "वैन", emoji: "🚐", gradient: "bg-gradient-tracing" },
  { letter: "W", letterHi: "डब्ल्यू", wordEn: "Whale", wordHi: "ह्वेल मछली", wordHiPhonetic: "ह्वेल", emoji: "🐳", gradient: "bg-gradient-colors" },
  { letter: "X", letterHi: "एक्स", wordEn: "Xylophone", wordHi: "जलतरंग", wordHiPhonetic: "जाइलोफोन", emoji: "🎹", gradient: "bg-gradient-animals" },
  { letter: "Y", letterHi: "वाई", wordEn: "Yo-yo", wordHi: "यो-यो", wordHiPhonetic: "यो-यो", emoji: "🪀", gradient: "bg-gradient-abc" },
  { letter: "Z", letterHi: "जेड", wordEn: "Zebra", wordHi: "जेब्रा", wordHiPhonetic: "जेब्रा", emoji: "🦓", gradient: "bg-gradient-numbers" }
];
const EN_LIST = BILINGUAL_LETTERS.map((x) => ({ ...x, isHindi: false }));
const HI_LIST = HINDI_LETTERS.map((x) => ({
  letter: x.letter,
  letterHi: x.letter,
  wordEn: x.wordEn,
  wordHi: x.word,
  wordHiPhonetic: x.word,
  emoji: x.emoji,
  gradient: x.gradient,
  isHindi: true
}));
function ABC() {
  const lang = useLang();
  const LETTERS = lang === "hi" ? HI_LIST : EN_LIST;
  const [idx, setIdx] = reactExports.useState(0);
  const [burst, setBurst] = reactExports.useState(0);
  const safeIdx = idx % LETTERS.length;
  const item = LETTERS[safeIdx];
  const touchStartX = reactExports.useRef(0);
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) setIdx((i) => (i + 1) % LETTERS.length);
    else setIdx((i) => (i - 1 + LETTERS.length) % LETTERS.length);
  }
  const particles = reactExports.useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: `${burst}-${i}`,
    x: Math.cos(i / 14 * Math.PI * 2) * (60 + Math.random() * 40),
    y: Math.sin(i / 14 * Math.PI * 2) * (60 + Math.random() * 40),
    emoji: ["⭐", "✨", "💖", "🌟"][i % 4]
  })), [burst]);
  reactExports.useEffect(() => {
    haptic();
    pop();
    const t2 = setTimeout(() => {
      if (lang === "hi") {
        speak(`${item.letterHi}... ${item.letterHi} से ${item.wordHi}`);
      } else {
        speak(`${item.letter}... ${item.letter} for ${item.wordEn}`);
      }
    }, 200);
    return () => clearTimeout(t2);
  }, [item.letter, item.wordEn, lang]);
  function handleTap() {
    haptic(20);
    chime();
    setBurst((b) => b + 1);
    markLetter(item.letter);
    if (lang === "hi") {
      speak(`${item.letterHi} से ${item.wordHi}!`);
    } else {
      speak(`${item.letter} for ${item.wordEn}!`);
    }
  }
  reactExports.useEffect(() => {
    setIdx(0);
  }, [lang]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "main",
    {
      className: `min-h-screen ${item.gradient} flex flex-col select-none transition-colors duration-500`,
      onTouchStart,
      onTouchEnd,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95", "aria-label": "Home", children: "🏠" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-full bg-white/90 px-4 py-2 shadow-pop text-sm font-extrabold", children: [
            safeIdx + 1,
            " / ",
            LETTERS.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 flex flex-col items-center justify-center px-5 relative w-full max-w-md mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute text-3xl", style: { animation: "pop-in 0.7s cubic-bezier(.34,1.56,.64,1) both", transform: `translate(${p.x}px, ${p.y}px)` }, children: p.emoji }, p.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleTap,
              "aria-label": `${item.letter} for ${item.wordEn}`,
              className: "relative w-full bg-white rounded-[48px] flex flex-col items-center justify-center shadow-pop active:scale-[0.98] transition-transform animate-pop-in p-8 sm:p-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${item.isHindi ? "font-hindi text-[8rem] sm:text-[10rem]" : "text-[9rem] sm:text-[12rem]"} font-black leading-none bg-gradient-hero bg-clip-text text-transparent`, children: item.letter }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-slate-100 rounded-full my-6 opacity-60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[5rem] sm:text-[6rem] animate-wiggle leading-none", children: item.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center leading-tight mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-4xl sm:text-5xl font-extrabold text-slate-800 ${item.isHindi ? "font-hindi" : ""}`, children: lang === "hi" ? item.wordHi : item.wordEn }),
                    lang === "hi" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-slate-400 mt-1", children: item.wordEn })
                  ] })
                ] })
              ]
            },
            `${lang}-${item.letter}`
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center justify-between px-6 pb-8 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIdx((i) => (i - 1 + LETTERS.length) % LETTERS.length), className: "size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90", "aria-label": "Previous", children: "⬅️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIdx((i) => (i + 1) % LETTERS.length), className: "size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90", "aria-label": "Next", children: "➡️" })
        ] })
      ]
    }
  );
}
const mascot = "/assets/mascot-CfmLYqTk.png";
function Mascot({ size = 140, bounce = true, className = "", onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "aria-label": "Panda mascot — tap to hear hello",
      className: `group relative inline-flex items-center justify-center bg-transparent border-0 p-0 ${className}`,
      style: { width: size, height: size },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute inset-0 rounded-full bg-gradient-hero blur-2xl opacity-60",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: mascot,
            alt: "",
            width: size,
            height: size,
            className: `relative drop-shadow-xl select-none pointer-events-none ${bounce ? "animate-float-y" : ""} group-active:scale-95 transition-transform`,
            draggable: false
          }
        )
      ]
    }
  );
}
function ModuleCard({ to, title, emoji, gradient, description, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      className: `group relative block rounded-3xl ${gradient} p-5 shadow-pop overflow-hidden active:scale-[0.97] transition-transform min-h-[140px] ${className || ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-6 -right-6 size-28 rounded-full bg-white/30 blur-2xl", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-2 right-3 text-6xl drop-shadow-md group-active:animate-bounce-big", "aria-hidden": true, children: emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-extrabold text-white drop-shadow-md tracking-tight", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold text-white/90 max-w-[60%]", children: description })
      ]
    }
  );
}
const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiny Genius — Toddler Learning Playground" },
      { name: "description", content: "Magical bilingual (English + हिन्दी) learning app for toddlers 1–3. Letters, numbers, shapes, colors, animals." },
      { name: "theme-color", content: "#FF7AB6" },
      { property: "og:title", content: "Tiny Genius — Toddler Learning Playground" },
      { property: "og:description", content: "Bilingual (English + Hindi) toddler learning playground." },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "icon", href: "/icon-192.png", type: "image/png" }
    ]
  }),
  component: Home
});
function Home() {
  const lang = useLang();
  const [stars, setStars] = reactExports.useState(0);
  const [streak, setStreak] = reactExports.useState(1);
  reactExports.useEffect(() => {
    const p = loadProgress();
    setStars(p.stars);
    setStreak(updateStreak());
    const onFocus = () => {
      const fp = loadProgress();
      setStars(fp.stars);
      setStreak(fp.streak ?? 1);
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background pb-12 select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-2 px-4 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 shadow-pop", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "⭐" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-extrabold tabular-nums", children: stars })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow-pop", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🔥" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-extrabold tabular-nums", children: streak })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LangToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/parent", className: "rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow-pop text-sm font-bold", children: [
        "👨‍👩‍👧 ",
        t("parents", lang)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pt-4 pb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Mascot,
        {
          size: 180,
          onClick: () => {
            haptic();
            pop();
            speak(t("hello", lang));
          },
          className: "mx-auto"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-5xl font-extrabold tracking-tight bg-gradient-hero bg-clip-text text-transparent leading-none", children: "Tiny Genius" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-base font-semibold text-muted-foreground", children: t("appTagline", lang) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/rhymes", title: t("rhymes", lang), emoji: "🎶", gradient: "bg-gradient-rhymes", description: t("rhymesDesc", lang), className: "col-span-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/abc", title: t("abc", lang), emoji: "🅰️", gradient: "bg-gradient-abc", description: t("abcDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/numbers", title: t("numbers", lang), emoji: "🔢", gradient: "bg-gradient-numbers", description: t("numbersDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/tracing", title: t("trace", lang), emoji: "✏️", gradient: "bg-gradient-tracing", description: t("traceDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/shapes", title: t("shapes", lang), emoji: "🔺", gradient: "bg-gradient-shapes", description: t("shapesDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/colors", title: t("colors", lang), emoji: "🎨", gradient: "bg-gradient-colors", description: t("colorsDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/animals", title: t("animals", lang), emoji: "🦁", gradient: "bg-gradient-animals", description: t("animalsDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/fruits", title: t("fruits", lang), emoji: "🍎", gradient: "bg-gradient-shapes", description: t("fruitsDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/body", title: t("body", lang), emoji: "👁️", gradient: "bg-gradient-colors", description: t("bodyDesc", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/quiz", title: t("quiz", lang), emoji: "🧠", gradient: "bg-gradient-rhymes", description: t("quizDesc", lang), className: "col-span-2" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold mb-4 px-1", children: "🎮 Games & Challenges" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/peek-a-buddy", title: t("peekABuddy", lang), emoji: "👋", gradient: "bg-gradient-rhymes", description: t("peekABuddyDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/sound-match", title: t("soundMatch", lang), emoji: "🔊", gradient: "bg-gradient-animals", description: t("soundMatchDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/color-mix", title: t("colorMixLab", lang), emoji: "🎨", gradient: "bg-gradient-colors", description: t("colorMixDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/phonics-farm", title: t("phonicsFarm", lang), emoji: "🌾", gradient: "bg-gradient-abc", description: t("phonicsFarmDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/trace-race", title: t("traceRace", lang), emoji: "⚡", gradient: "bg-gradient-tracing", description: t("traceRaceDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/rhythm-tap", title: t("rhythmTap", lang), emoji: "🎵", gradient: "bg-gradient-rhymes", description: t("rhythmTapDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/puzzle-slide", title: t("puzzleSlide", lang), emoji: "🧩", gradient: "bg-gradient-shapes", description: t("puzzleSlideDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/shape-builder", title: t("shapeBuilder", lang), emoji: "🔨", gradient: "bg-gradient-shapes", description: t("shapeBuilderDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/treasure-map", title: t("treasureMap", lang), emoji: "🗺️", gradient: "bg-gradient-numbers", description: t("treasureMapDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/memory-garden", title: t("memoryGarden", lang), emoji: "🌿", gradient: "bg-gradient-animals", description: t("memoryGardenDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/sticker-studio", title: t("stickerStudio", lang), emoji: "✨", gradient: "bg-gradient-abc", description: t("stickerStudioDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/daily-challenge", title: t("dailyChallenge", lang), emoji: "🌟", gradient: "bg-gradient-hero", description: t("dailyChallengeDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/leaderboard", title: t("leaderboard", lang), emoji: "🏆", gradient: "bg-gradient-colors", description: t("leaderboardDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/story-builder", title: t("storyBuilder", lang), emoji: "📖", gradient: "bg-gradient-rhymes", description: t("storyBuilderDesc", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleCard, { to: "/reward-shop", title: t("rewardShop", lang), emoji: "🛍️", gradient: "bg-gradient-abc", description: t("rewardShopDesc", lang), className: "col-span-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 text-center text-xs font-semibold text-muted-foreground px-6", children: t("footer", lang) })
  ] });
}
const TreasureMapRoute = Route$q.update({
  id: "/treasure-map",
  path: "/treasure-map",
  getParentRoute: () => Route$r
});
const TracingRoute = Route$p.update({
  id: "/tracing",
  path: "/tracing",
  getParentRoute: () => Route$r
});
const TraceRaceRoute = Route$o.update({
  id: "/trace-race",
  path: "/trace-race",
  getParentRoute: () => Route$r
});
const StoryBuilderRoute = Route$n.update({
  id: "/story-builder",
  path: "/story-builder",
  getParentRoute: () => Route$r
});
const StickerStudioRoute = Route$m.update({
  id: "/sticker-studio",
  path: "/sticker-studio",
  getParentRoute: () => Route$r
});
const SoundMatchRoute = Route$l.update({
  id: "/sound-match",
  path: "/sound-match",
  getParentRoute: () => Route$r
});
const ShapesRoute = Route$k.update({
  id: "/shapes",
  path: "/shapes",
  getParentRoute: () => Route$r
});
const ShapeBuilderRoute = Route$j.update({
  id: "/shape-builder",
  path: "/shape-builder",
  getParentRoute: () => Route$r
});
const RhythmTapRoute = Route$i.update({
  id: "/rhythm-tap",
  path: "/rhythm-tap",
  getParentRoute: () => Route$r
});
const RhymesRoute = Route$h.update({
  id: "/rhymes",
  path: "/rhymes",
  getParentRoute: () => Route$r
});
const RewardShopRoute = Route$g.update({
  id: "/reward-shop",
  path: "/reward-shop",
  getParentRoute: () => Route$r
});
const QuizRoute = Route$f.update({
  id: "/quiz",
  path: "/quiz",
  getParentRoute: () => Route$r
});
const PuzzleSlideRoute = Route$e.update({
  id: "/puzzle-slide",
  path: "/puzzle-slide",
  getParentRoute: () => Route$r
});
const PhonicsFarmRoute = Route$d.update({
  id: "/phonics-farm",
  path: "/phonics-farm",
  getParentRoute: () => Route$r
});
const PeekABuddyRoute = Route$c.update({
  id: "/peek-a-buddy",
  path: "/peek-a-buddy",
  getParentRoute: () => Route$r
});
const ParentRoute = Route$b.update({
  id: "/parent",
  path: "/parent",
  getParentRoute: () => Route$r
});
const NumbersRoute = Route$a.update({
  id: "/numbers",
  path: "/numbers",
  getParentRoute: () => Route$r
});
const MemoryGardenRoute = Route$9.update({
  id: "/memory-garden",
  path: "/memory-garden",
  getParentRoute: () => Route$r
});
const LeaderboardRoute = Route$8.update({
  id: "/leaderboard",
  path: "/leaderboard",
  getParentRoute: () => Route$r
});
const FruitsRoute = Route$7.update({
  id: "/fruits",
  path: "/fruits",
  getParentRoute: () => Route$r
});
const DailyChallengeRoute = Route$6.update({
  id: "/daily-challenge",
  path: "/daily-challenge",
  getParentRoute: () => Route$r
});
const ColorsRoute = Route$5.update({
  id: "/colors",
  path: "/colors",
  getParentRoute: () => Route$r
});
const ColorMixRoute = Route$4.update({
  id: "/color-mix",
  path: "/color-mix",
  getParentRoute: () => Route$r
});
const BodyRoute = Route$3.update({
  id: "/body",
  path: "/body",
  getParentRoute: () => Route$r
});
const AnimalsRoute = Route$2.update({
  id: "/animals",
  path: "/animals",
  getParentRoute: () => Route$r
});
const AbcRoute = Route$1.update({
  id: "/abc",
  path: "/abc",
  getParentRoute: () => Route$r
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$r
});
const rootRouteChildren = {
  IndexRoute,
  AbcRoute,
  AnimalsRoute,
  BodyRoute,
  ColorMixRoute,
  ColorsRoute,
  DailyChallengeRoute,
  FruitsRoute,
  LeaderboardRoute,
  MemoryGardenRoute,
  NumbersRoute,
  ParentRoute,
  PeekABuddyRoute,
  PhonicsFarmRoute,
  PuzzleSlideRoute,
  QuizRoute,
  RewardShopRoute,
  RhymesRoute,
  RhythmTapRoute,
  ShapeBuilderRoute,
  ShapesRoute,
  SoundMatchRoute,
  StickerStudioRoute,
  StoryBuilderRoute,
  TraceRaceRoute,
  TracingRoute,
  TreasureMapRoute
};
const routeTree = Route$r._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
