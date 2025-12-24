import React, { useEffect, useRef, useState } from "react";

const GEMINI_KEY = "AIzaSyCkmjfFrcQ98sTSF7wxE24h5t1k7_hsbWg"; // ⚠️ apni key daalo
const OPENAI_KEY = ""; // optional (empty chhod sakte ho)

type Message = { type: "user" | "bot"; text: string };

const Niko: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatLogRef = useRef<HTMLDivElement | null>(null);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    chatLogRef.current?.scrollTo(0, chatLogRef.current.scrollHeight);
  }, [messages]);

  /* ================= SPEECH RECOGNITION ================= */
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const recog = new SR();
    recog.lang = "hi-IN";
    recog.interimResults = false;

    recog.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      handleQuery(text);
    };

    recognitionRef.current = recog;
  }, []);

  /* ================= HELPERS ================= */
  const addMessage = (text: string, type: "user" | "bot") => {
    setMessages((prev) => [...prev, { type, text }]);
  };

  const parseMarkdown = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");

  /* ================= GEMINI ================= */
  const askGemini = async (text: string) => {
    const prompt = `
You are Aura, an AI Career & Education Advisor.
Rules:
- Friendly and encouraging
- Ask clarifying questions
- Reply in Markdown
- Use light emojis 😊

User: ${text}
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const raw = await res.text();
    console.log("Gemini RAW:", raw);

    if (!res.ok) throw new Error(raw);

    const data = JSON.parse(raw);
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) throw new Error("No reply from Gemini");
    return reply.trim();
  };

  /* ================= OPTIONAL SPEECH ================= */
  const speak = async (text: string) => {
    if (!OPENAI_KEY) return;

    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: "nova",
      }),
    });

    if (!res.ok) return;
    const blob = await res.blob();
    if (audioRef.current) {
      audioRef.current.src = URL.createObjectURL(blob);
      audioRef.current.play();
    }
  };

  /* ================= QUERY HANDLER ================= */
  const handleQuery = async (text: string) => {
    if (!text.trim()) return;
    addMessage(text, "user");
    setInput("");

    try {
      const reply = await askGemini(text);
      addMessage(reply, "bot");
      speak(reply.replace(/\*/g, ""));
    } catch (e: any) {
      addMessage("❌ AI error, thoda baad try karo", "bot");
      console.error(e);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="w-full max-w-3xl h-[80vh] bg-white rounded-xl shadow-lg flex flex-col">
      <h1 className="text-xl font-bold text-blue-700 p-4 border-b">
        Career Saathi AI
      </h1>

      <div
        ref={chatLogRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-2xl ${
              m.type === "bot"
                ? "bg-gray-100 text-gray-800 self-start"
                : "bg-blue-600 text-white self-end"
            }`}
            dangerouslySetInnerHTML={{
              __html: m.type === "bot" ? parseMarkdown(m.text) : m.text,
            }}
          />
        ))}
      </div>

      <div className="flex gap-2 p-4 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleQuery(input)}
          placeholder="Ask Aura anything..."
          className="flex-1 border px-4 py-2 rounded-full"
        />
        <button
          onClick={() => handleQuery(input)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
        <button
          onClick={() => recognitionRef.current?.start()}
          className="bg-gray-200 px-4 py-2 rounded-full"
        >
          🎤
        </button>
      </div>

      <audio ref={audioRef} hidden />
    </div>
  );
};

export default Niko;
