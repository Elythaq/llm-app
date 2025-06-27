// pages/Image2D3DPage.tsx
import { useState } from "react";
import ChatArea, { ChatMessage } from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import Interactive3D from "../components/Interactive3D";
import { Image as ImageIcon } from "lucide-react";

export default function Image2D3DPage({ sidebarOpen = true }: { sidebarOpen?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "How can I help you with Image to 3D today?" }
  ]);

  function handleSend(msg: string) {
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#362a36] via-[#ffd200] to-[#ff9a00] py-10">
      <div className="
        w-full
        max-w-3xl
        min-h-[80vh]
        bg-white/5
        rounded-2xl
        shadow-2xl
        glassy-card
        border-2
        border-yellow-400
        animate-borderGlow
        flex flex-col
        px-0
        pt-4
        pb-4
        mx-2
        my-6
      ">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="p-3 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-400 to-pink-500 shadow-lg">
            <ImageIcon className="text-white w-8 h-8" />
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-transparent bg-clip-text">
            Image to 3D
          </h1>
        </div>
        <Interactive3D color="#ffd200" />

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
}
