import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { useLocation } from 'react-router';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export function AIChatPanel() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hey there, how can I help you with your portfolio analysis?',
      sender: 'ai',
    },
  ]);
  const location = useLocation();

  // Get current page context
  const getPageContext = () => {
    const path = location.pathname;
    if (path === '/') {
      return 'Portfolio Assessment';
    } else if (path === '/stock-analysis') {
      return 'Stock Analysis History';
    } else if (path.startsWith('/stock-analysis/')) {
      const symbol = path.split('/').pop();
      return `Stock Analysis: ${symbol}`;
    } else if (path.startsWith('/stock/')) {
      const symbol = path.split('/').pop();
      return `Stock Detail: ${symbol}`;
    }
    return 'Portfolio Management';
  };

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "I understand you're asking about that. Let me analyze the data and get back to you with insights.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="h-full bg-white dark:bg-[#1e1e1e] border-l border-slate-200 dark:border-[#2d2d2d] flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-[#2d2d2d] flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-sm text-slate-800 dark:text-slate-200">AI Assistant</h2>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {/* Messages */}
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg p-3 ${
                msg.sender === 'ai'
                  ? 'bg-slate-50 dark:bg-[#2d2d2d]'
                  : 'bg-indigo-50 dark:bg-indigo-900/20 ml-8'
              }`}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300">{msg.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-[#2d2d2d]">
        {/* Current Page Context - Moved to top of input */}
        <div className="mb-3 pb-3 border-b border-slate-200 dark:border-[#2d2d2d]">
          <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">Currently viewing:</div>
          <div className="text-base font-semibold text-slate-900 dark:text-slate-100">{getPageContext()}</div>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 text-sm border border-slate-300 dark:border-[#3d3d3d] dark:bg-[#2d2d2d] dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}