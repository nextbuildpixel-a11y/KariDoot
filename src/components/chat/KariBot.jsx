import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Volume2,
  HelpCircle,
  Coins,
  Camera,
  Layers
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const SUGGESTIONS = [
  {
    icon: Camera,
    text: "How do I list my craft?"
  },
  {
    icon: Coins,
    text: "What are the platform commission fees?"
  },
  {
    icon: Layers,
    text: "How does ONDC buyer routing work?"
  },
  {
    icon: Sparkles,
    text: "How does the studio lighting work?"
  }
];

const KNOWLEDGE_RESPONSES = {
  listing: `To list your handmade craft on KariDoot, follow our simple 5-stage pipeline:
1. 📸 **Guided Photo Scanner**: Capture high-resolution craft images in natural daylight.
2. ✨ **AI Photo Studio**: Automatically isolate contours and stage your craft on warm travertine stone with realistic contact shadows in 4:5 catalog ratio.
3. 🎙️ **Voice Catalog AI**: Speak in Hindi, Telugu, Tamil, Bengali, or English to generate bilingual titles, heritage narratives, and verified GI tags.
4. ⚖️ **Fair Pricing Calibrator**: Enter your direct materials, labor hours, and packaging costs. Choose a 15%–50% artisan pride margin with zero platform cut.
5. 🌐 **ONDC Export**: Broadcast your catalog live to Paytm, Pincode, Mystore, and Magicpin across India!`,

  fees: `**0% Platform Commission — You keep 100% of your craft earnings!**

Traditional commercial aggregators like Amazon Karigar or Flipkart charge 25%–35% in platform commissions, distributor markups, and listing fees.

On KariDoot and the open ONDC network:
• **KariDoot Commission**: ₹0 (0%)
• **Direct Artisan Take-Home**: 100% of labor and craft profit
• **Customer Savings**: Conscious buyers save ~47% compared to commercial luxury boutique prices because there are no middlemen.`,

  ondc: `**How ONDC Buyer Routing Works:**

KariDoot is built on the decentralized **Beckn Open Protocol**. Once your craft is published:
• **Universal Discovery**: Your product is broadcasted simultaneously to all Beckn-enabled buyer apps across India, including **Paytm ONDC, Pincode (PhonePe), Mystore, and Magicpin**.
• **Direct Order Notifications**: When a customer orders on any buyer app, you receive an audio alert with spoken customer details.
• **Integrated Logistics**: ONDC logistics partners like **Delhivery, Shiprocket, and Shadowfax** handle doorstep pickup directly from your craft village.`,

  studio: `**AI Studio Staging & Lighting Engine:**

Our Studio Engine transforms raw workshop snapshots into buyer-ready editorial flatlays:
• **AI Background Isolation**: Automatically clips craft contours and removes cluttered workshop backgrounds.
• **Pure Travertine Stone**: Places your craft on a clean, luxury travertine stone surface with soft morning daylight.
• **Grounding Contact Shadow**: Renders a realistic radial contact shadow directly underneath the item to anchor it naturally.
• **Strict 4:5 Aspect Ratio**: Exported at 1200 × 1500 px, matching luxury e-commerce catalog standards with zero letterboxing.`
};

export default function KariBot() {
  const { speakText } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Namaste! I'm KariDoot Assistant, powered by Catalog AI. I can guide you through AI studio staging, voice cataloging in regional languages, fair wage pricing, or how ONDC connects you with buyers across India.",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  // Auto scroll chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Speech to text toggle
  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsRecording(false);
    }
  };

  const getKnowledgeAnswer = (query) => {
    const q = query.toLowerCase();
    if (q.includes('list') || q.includes('how do i') || q.includes('upload') || q.includes('start')) {
      return KNOWLEDGE_RESPONSES.listing;
    }
    if (q.includes('fee') || q.includes('commission') || q.includes('cost') || q.includes('pricing') || q.includes('charge') || q.includes('cut')) {
      return KNOWLEDGE_RESPONSES.fees;
    }
    if (q.includes('ondc') || q.includes('routing') || q.includes('buyer') || q.includes('beckn') || q.includes('order') || q.includes('delivery')) {
      return KNOWLEDGE_RESPONSES.ondc;
    }
    if (q.includes('studio') || q.includes('light') || q.includes('background') || q.includes('travertine') || q.includes('photo')) {
      return KNOWLEDGE_RESPONSES.studio;
    }
    return `KariDoot is an AI-powered onboarding and enablement engine connecting rural Indian artisans with the ONDC open network.

• **Studio AI**: Generates 4:5 luxury flatlays on travertine stone with contact shadows.
• **Voice Cataloger**: Supports voice-to-text in Hindi, Telugu, Tamil, Bengali, and English.
• **Fair Pricing**: Guarantees living wages with 0% platform commission.
• **ONDC**: Distributes products directly to Paytm, Pincode (PhonePe), Mystore, and Magicpin.

Feel free to ask specific questions about any of these features!`;
  };

  const handleSendMessage = async (textToSend) => {
    const userText = textToSend || inputValue;
    if (!userText.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // If live Gemini API key is configured, query Gemini with KariDoot knowledge context
    if (apiKey) {
      try {
        const prompt = `You are KariDoot Assistant, an expert AI helper for the KariDoot platform.
KariDoot is a direct-to-ONDC platform empowering Indian rural artisans, handloom weavers, and craftspeople with 0% commission.
Core features:
1. Guided Camera Scanner with natural light weave inspection.
2. AI Photo Studio with background isolation, warm travertine stone staging, contact shadows, and 4:5 catalog aspect ratio.
3. Multimodal Voice Cataloger supporting Hindi, Telugu, Tamil, Bengali, and English with GI tag authenticity.
4. Fair Pricing Calibrator (materials + labor + packaging + 15%-50% artisan margin vs 1.9x commercial retail).
5. ONDC Beckn Protocol distribution across Paytm, Pincode by PhonePe, Mystore, Magicpin, and logistics via Delhivery/Shiprocket.

User question: "${userText}"
Respond in a warm, respectful, concise, and helpful artisan-friendly tone. Format with clean bullet points.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (botReply) {
            setMessages((prev) => [
              ...prev,
              {
                id: `bot-${Date.now()}`,
                sender: 'bot',
                text: botReply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
            setIsTyping(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Live API response fallback to platform knowledge:', err);
      }
    }

    // Fallback to built-in platform knowledge base
    setTimeout(() => {
      const answer = getKnowledgeAnswer(userText);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Circular Trigger Button (Bottom-Right) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open KariDoot AI Assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#C85A32] hover:bg-[#B34B25] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ring-4 ring-[#C85A32]/25 group cursor-pointer"
        id="karibot-trigger-btn"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-7 h-7 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#C85A32]" />
          </div>
        )}
      </button>

      {/* Slide-out/Popup Chat Drawer */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[640px] h-[82vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fade-in"
          style={{ boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)' }}
        >
          {/* Header */}
          <div className="bg-[#1C1917] text-white px-5 py-4 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C85A32] flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight">KariDoot Assistant</h3>
                  <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                    Catalog AI
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONDC Beckn Protocol Active</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-[#C85A32] text-white flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C85A32] text-white rounded-br-xs shadow-sm font-medium'
                      : 'bg-white text-stone-800 rounded-bl-xs border border-stone-200 shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  
                  {msg.sender === 'bot' && (
                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                      <span>{msg.timestamp}</span>
                      <button
                        type="button"
                        onClick={() => speakText(msg.text)}
                        className="text-stone-500 hover:text-[#C85A32] inline-flex items-center gap-1 font-semibold"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-stone-800 text-white flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-stone-500 bg-white p-3 rounded-2xl border border-stone-200 w-fit">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-[#C85A32] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#C85A32] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#C85A32] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[11px] font-medium text-stone-600">Catalog AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-3 bg-white border-t border-stone-100 overflow-x-auto">
            <div className="text-[10px] font-mono uppercase font-bold text-stone-400 mb-1.5 px-1 flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>Suggested Inquiries:</span>
            </div>
            <div className="flex gap-2 pb-1">
              {SUGGESTIONS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(item.text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 hover:border-amber-300 transition-all whitespace-nowrap flex-shrink-0"
                  >
                    <Icon className="w-3 h-3 text-[#C85A32]" />
                    <span>{item.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-stone-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about KariDoot, ONDC, or craft listing..."
                  className="w-full bg-stone-100 text-stone-900 text-xs sm:text-sm pl-3.5 pr-10 py-2.5 rounded-xl border border-stone-200 focus:bg-white focus:border-[#C85A32] focus:outline-none transition-colors"
                />
                
                {/* Speech to Text Mic */}
                <button
                  type="button"
                  onClick={toggleRecording}
                  title={isRecording ? 'Listening...' : 'Speak via microphone'}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-emerald-500 text-white animate-pulse'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  {isRecording ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-[#C85A32] hover:bg-[#B34B25] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
