'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  id: number;
  role: 'user' | 'support';
  text: string;
  time: string;
};

const initialMessages: Message[] = [
  { id: 1, role: 'support', text: 'Hi there! Welcome to Alveron Support. How can I help you today?', time: '10:00 AM' },
  { id: 2, role: 'user', text: "I'm having trouble with a transfer. It's been pending for 2 days.", time: '10:02 AM' },
  { id: 3, role: 'support', text: "I understand. Let me look into that for you. Could you share the transaction ID or the item name?", time: '10:03 AM' },
];

const quickReplies = [
  'Track my order',
  'Cancel transfer',
  'Payment issue',
  'Return policy',
  'Contact agent',
];

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setShowQuick(false);

    // Simulate auto-reply
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        role: 'support',
        text: "Thanks for your message. A support agent will get back to you shortly. In the meantime, you can check our FAQ for common solutions.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="flex flex-col h-[100dvh] md:h-screen">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 md:px-8 py-4 border-b border-[#2a2a3a] bg-[#0e0e16] shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#7c5cfc]/20 flex items-center justify-center text-[#7c5cfc] font-bold">
          A
        </div>
        <div>
          <p className="font-semibold text-sm">Alveron Support</p>
          <p className="text-[10px] text-[#34d399] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] inline-block" />
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] px-4 py-2.5 ${
                msg.role === 'user'
                  ? 'chat-bubble-user'
                  : 'chat-bubble-other'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${
                msg.role === 'user' ? 'text-white/50' : 'text-[#8888a0]'
              } text-right`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {/* Quick replies */}
        {showQuick && (
          <div className="pt-2">
            <p className="text-[10px] text-[#8888a0] mb-2 uppercase tracking-wide">Quick replies</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => sendMessage(qr)}
                  className="px-3 py-1.5 rounded-full border border-[#2a2a3a] text-xs text-[#8888a0] hover:text-white hover:border-[#7c5cfc] transition"
                >
                  {qr}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 md:p-4 border-t border-[#2a2a3a] bg-[#0e0e16] shrink-0">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-[#1a1a26] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white placeholder-[#5555] outline-none focus:border-[#7c5cfc] transition"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#7c5cfc] hover:bg-[#6a4ae8] disabled:opacity-30 disabled:cursor-not-allowed transition shrink-0"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
