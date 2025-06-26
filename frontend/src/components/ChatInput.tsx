"use client";
import { useState, useRef } from 'react';
import { Plus, SlidersHorizontal, Mic, ArrowUp } from 'lucide-react';

export default function ChatInput({
  onSend,
  sidebarOpen = true,
  sidebarWidth = 340,
}: {
  onSend: (msg: string) => void,
  sidebarOpen?: boolean,
  sidebarWidth?: number,
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  }

  return (
    <div
      className="fixed bottom-4 flex justify-center z-40 transition-all"
      style={{
        left: sidebarOpen ? sidebarWidth : 0,
        width: sidebarOpen ? `calc(100vw - ${sidebarWidth}px)` : '100vw',
        transition: 'left 0.3s cubic-bezier(.4,0,.2,1), width 0.3s cubic-bezier(.4,0,.2,1)'
      }}
    >
      <div className="flex items-center gap-2 rounded-full bg-gray-800/90 px-4 py-3 w-full max-w-3xl mx-auto shadow-xl border border-gray-700" style={{ minHeight: 54 }}>
        {/* Plus Button */}
        <button className="hover:bg-gray-700 p-1 rounded-full" title="Add" tabIndex={-1}>
          <Plus className="w-5 h-5 text-gray-300" />
        </button>

        {/* Tools Button */}
        <button className="flex items-center hover:bg-gray-700 px-2 py-1 rounded-full text-gray-300" title="Tools" tabIndex={-1}>
          <SlidersHorizontal className="w-5 h-5 mr-1" />
          <span className="text-sm">Tools</span>
        </button>

        {/* Textarea */}
        <textarea
          ref={inputRef}
          className="flex-1 resize-none bg-transparent outline-none text-white px-2 py-1 min-h-[28px] max-h-[120px]"
          placeholder="Type your message..."
          value={input}
          rows={1}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {/* Mic Button */}
        <button className="hover:bg-gray-700 p-1 rounded-full" title="Voice input" tabIndex={-1}>
          <Mic className="w-5 h-5 text-gray-300" />
        </button>

        {/* Send Button */}
        <button
          className="ml-1 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-500 transition"
          onClick={handleSend}
          title="Send"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
