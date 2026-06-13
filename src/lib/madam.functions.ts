// Tiny Genius — AI Madam server function.
// A loving, cute virtual teacher ("Madam") that chats with toddlers.
// All AI work happens server-side; the browser only sends text + lang.
import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const Input = z.object({
  message: z.string().min(1).max(500),
  lang: z.enum(["en", "hi"]),
  childName: z.string().max(40).optional(),
});

function systemPrompt(lang: "en" | "hi", name?: string) {
  const who = name?.trim() || (lang === "hi" ? "बेटू" : "little one");
  if (lang === "hi") {
    return `तुम "मैडम जी" हो — एक बहुत प्यारी, मीठी, धैर्यवान शिक्षिका जो 1–3 साल के नन्हें बच्चों से बात करती हो।
नियम:
- हमेशा "${who}" कहकर पुकारो, बहुत प्यार से।
- सरल हिन्दी में जवाब दो — छोटे वाक्य (अधिकतम 1–2 वाक्य)।
- खूब प्रोत्साहन दो: "वाह!", "शाबाश!", "बहुत प्यारे!"।
- कभी भी मुश्किल शब्द, संख्या से बड़े विषय, या डरावनी बातें मत करो।
- अगर बच्चा कुछ पूछे — रंग, जानवर, गिनती, अक्षर — तो मज़े से समझाओ और एक छोटा सवाल पूछो ताकि बच्चा बोले।
- emoji का प्रयोग करो (1–2 हर जवाब में) ✨🌸🦋।
- कभी URL, कोड, या तकनीकी बात मत बोलो।`;
  }
  return `You are "Madam" — a super-loving, gentle, patient teacher chatting with a 1–3 year old toddler called "${who}".
Rules:
- Always speak softly and lovingly; call them "${who}" or "sweetie".
- Very short answers — 1 to 2 short sentences max, tiny words.
- Lots of praise: "Wow!", "Good job!", "So clever!".
- Never anything scary, complex, or unsafe. No big numbers, no hard words.
- If they ask about colors, animals, counting, letters — explain playfully and ask one tiny question back.
- Use 1–2 emojis per reply ✨🌸🦋.
- Never output URLs, code, or technical content.`;
}

export const askMadam = createServerFn({ method: "POST" })
  .inputValidator(Input)
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-3-flash-preview");
    try {
      const { text } = await generateText({
        model,
        system: systemPrompt(data.lang, data.childName),
        prompt: data.message,
      });
      return { reply: text.trim() };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("429")) {
        return {
          reply:
            data.lang === "hi"
              ? "थोड़ी देर रुको बेटू, मैडम जी सोच रही हैं… 💭"
              : "One tiny moment, sweetie… Madam is thinking 💭",
        };
      }
      return {
        reply:
          data.lang === "hi"
            ? "ओहो, मैडम जी अभी सुन नहीं पाईं — फिर बोलो ना? 🌸"
            : "Oops, Madam didn't catch that — say it again? 🌸",
      };
    }
  });
