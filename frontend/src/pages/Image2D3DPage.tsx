import ChatArea, { ChatMessage } from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import Interactive3D from "../components/Interactive3D";
import { Image as ImageIcon } from "lucide-react";

type Image2D3DPageProps = {
  messages: ChatMessage[];
  onSend: (msg: string) => void;
  sidebarOpen?: boolean;
};

export default function Image2D3DPage({
  messages,
  onSend,
  sidebarOpen = true,
}: Image2D3DPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#1a1f2b] via-[#21403a] to-[#26736a] py-10">
      <div className="w-full max-w-3xl min-h-[80vh] bg-white/5 rounded-2xl shadow-2xl glassy-card border-2 border-cyan-300 animate-borderGlow flex flex-col p-6 mx-2 my-6">
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
            <ChatInput
              onSend={onSend}
              isFloating={false}
              sidebarOpen={sidebarOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
