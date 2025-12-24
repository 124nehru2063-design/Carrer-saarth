<<<<<<< HEAD
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
=======
import React, { useEffect, useRef, useState } from "react";

const GEMINI_KEY = "AIzaSyC8lD34eA68l0JU8C30WpoMcsz8-23W7Eg";
const OPENAI_KEY = "YOUR_OPENAI_KEY";

type Message = { type: "user" | "bot"; text: string };

const Niko: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatLogRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  // Setup SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const r = new SpeechRecognition();
    r.continuous = false;
    r.interimResults = false;
    r.maxAlternatives = 1;

    r.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleQuery(transcript);
    };

    recognitionRef.current = r;
  }, []);

  const addMessage = (text: string, type: "user" | "bot") => {
    setMessages((prev) => [...prev, { type, text }]);
  };

  const parseMarkdown = (text: string) => {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
    if (html.match(/^\s*[0-9]+\./m)) {
      html = html.replace(/^\s*([0-9]+\.)\s*(.*)/gm, "<li>$2</li>");
      html = `<ol>${html}</ol>`;
    }
    return html.replace(/\n/g, "<br>");
  };

//   const askGemini = async (text: string) => {
//     const systemInstruction = {
//       parts: [
//         {
//           text: `You are an AI Career & Education Advisor named Aura.
//           **RULES:**
//           - Provide personalized, encouraging, practical guidance.
//           - Be friendly, empathetic, knowledgeable.
//           - Ask clarifying questions.
//           - **Always format response in Markdown** (lists, bold, paragraphs).
//           - Add light emojis. 😊`,
//         },
//       ],
//     };
//     const contents = [{ parts: [{ text }] }];

//     const res = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ contents, system_instruction: systemInstruction }),
//       }
//     );
//     const data = await res.json();
//     if (!data.candidates?.length) throw new Error("No reply from Gemini");
//     return data.candidates[0].content.parts[0].text.trim();
//   };

const askGemini = async (text: string) => {
  const systemInstruction = {
    parts: [
      {
        text: `You are an AI Career & Education Advisor named Aura. **RULES:** - Provide personalized, encouraging, practical guidance. - Be friendly, empathetic, knowledgeable. - Ask clarifying questions. - **Always format response in Markdown** (lists, bold, paragraphs). - Add light emojis. 😊`,
      },
    ],
  };
  const contents = [{ parts: [{ text }] }];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents, system_instruction: systemInstruction }),
      }
    );
    
    // Log the response status and body for debugging
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Gemini API error:", res.status, errorData);
      throw new Error(`Gemini API error: ${res.status} - ${errorData.error.message}`);
    }

    const data = await res.json();
    if (!data.candidates?.length) throw new Error("No reply from Gemini");
    return data.candidates[0].content.parts[0].text.trim();
  } catch (err) {
    console.error("Error with Gemini API:", err);
    throw new Error("Failed to fetch from Gemini API.");
  }
};


//   const speakWithOpenAI = async (text: string) => {
//     if (!OPENAI_KEY) return;
//     const res = await fetch("https://api.openai.com/v1/audio/speech", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${OPENAI_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "tts-1",
//         input: text,
//         voice: "nova",
//         response_format: "mp3",
//       }),
//     });
//     if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
//     const blob = await res.blob();
//     if (audioRef.current) {
//       audioRef.current.src = URL.createObjectURL(blob);
//       await audioRef.current.play();
//     }
//   };


const speakWithOpenAI = async (text: string) => {
  if (!OPENAI_KEY) {
    console.error("OpenAI API key is missing.");
    return;
  }
  try {
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
        response_format: "mp3",
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      // If it's a 401 error (Unauthorized), hide it in the chat
      if (res.status === 401) {
        console.error("OpenAI error 401: Unauthorized access", errorData);
        throw new Error("OpenAI error: Unauthorized access. Please check your API key.");
      }
      throw new Error(`OpenAI error: ${res.status} - ${errorData.error.message}`);
    }

    const blob = await res.blob();
    if (audioRef.current) {
      audioRef.current.src = URL.createObjectURL(blob);
      await audioRef.current.play();
    }
  } catch (err) {
    // For user-friendly chat, just show a generic error message.
    // console.error("Error with OpenAI API:", err);
    // addMessage("❌ Something went wrong. Please try again later.", "bot");
  }
};


  const handleQuery = async (query: string) => {
    if (!query.trim()) return;
    addMessage(query, "user");
    setInput("");
    try {
      const reply = await askGemini(query);
      addMessage(reply, "bot");
      await speakWithOpenAI(reply.replace(/\*\*/g, ""));
    } catch (err: any) {
      addMessage(`❌ Error: ${err.message}`, "bot");
    }
  };

  return (
    <div className="w-full max-w-3xl h-[80vh] bg-white rounded-xl shadow-lg flex flex-col">
      <h1 className="text-xl font-bold text-blue-700 p-4 border-b">
        Career Saathi AI
      </h1>

      {/* Chat log */}
      <div
        ref={chatLogRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble max-w-[80%] px-4 py-2 rounded-2xl leading-relaxed ${
              msg.type === "bot"
                ? "self-start bg-gray-100 text-gray-800"
                : "self-end bg-blue-600 text-white"
            }`}
            dangerouslySetInnerHTML={{
              __html: msg.type === "bot" ? parseMarkdown(msg.text) : msg.text,
            }}
          />
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 border-t p-4">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Ask Aura a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleQuery(input)}
        />
        <button
          onClick={() => handleQuery(input)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
        <button
          onClick={() => recognitionRef.current?.start()}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition"
        >
          🎤
        </button>
      </div>

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Niko;
>>>>>>> a1b6373fac3ab871f3e217f60cd1fb2a7a6287a1
