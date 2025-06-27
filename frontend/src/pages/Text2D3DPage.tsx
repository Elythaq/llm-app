import { useState } from "react";
import ChatArea, { ChatMessage } from "../components/ChatArea";
import ChatInput from "../components/ChatInput";

export default function Text2D3DPage({ sidebarOpen = true }: { sidebarOpen?: boolean }) {

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "How can I help you with code today?" }
  ]);

  function handleSend(msg: string) {
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    // (You can add AI assistant response here if needed)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-32">
      <h1 className="text-3xl font-bold mb-6">Text to 3D</h1>
      <div className="flex-1 w-full flex flex-col" style={{ minHeight: 360 }}>
        <ChatArea messages={messages} />
      </div>
      <ChatInput onSend={handleSend} sidebarOpen={sidebarOpen} sidebarWidth={340} />
    </div>
  );
}
