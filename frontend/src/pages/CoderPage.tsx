// pages/CoderPage.tsx
import { useState } from "react";
import ChatArea, { ChatMessage } from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import Interactive3D from "../components/Interactive3D";
import { Code2 } from "lucide-react";

export default function CoderPage({ sidebarOpen = true }: { sidebarOpen?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "How can I help you with code today?" }
  ]);

  function handleSend(msg: string) {
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
  }
  
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#1a2980] via-[#26d0ce] to-[#67c8ff] py-10">
    <div className="w-full max-w-3xl min-h-[80vh] bg-white/5 rounded-2xl shadow-2xl glassy-card border-2 border-cyan-300 animate-borderGlow flex flex-col p-6 mx-2 my-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <span className="p-3 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-pink-400 shadow-lg">
          <Code2 className="text-white w-8 h-8" />
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-pink-400 text-transparent bg-clip-text">
          AI Coder
        </h1>
      </div>
      <Interactive3D color="#26d0ce" />

      {/* Chat + Input */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="flex-1 overflow-y-auto">
          <ChatArea messages={messages} />
        </div>
        <div className="w-full mt-2">
          <ChatInput onSend={handleSend} isFloating={false} />
        </div>
      </div>
    </div>
  </div>
);
