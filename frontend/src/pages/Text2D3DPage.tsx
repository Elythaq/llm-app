import ChatArea, { ChatMessage } from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import Interactive3D from "../components/Interactive3D";
import { Box } from "lucide-react";

export default function Text2D3DPage({
  messages,
  onSend,
  sidebarOpen = true,
}: {
  messages: ChatMessage[];
  onSend: (msg: string) => void;
  sidebarOpen?: boolean;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#14131a] via-[#35346b] to-[#2b335f] py-10">
      <div className="w-full max-w-3xl min-h-[80vh] bg-white/5 rounded-2xl shadow-2xl glassy-card border-2 border-cyan-300 animate-borderGlow flex flex-col p-6 mx-2 my-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="p-3 rounded-full bg-gradient-to-tr from-green-400 via-cyan-400 to-blue-500 shadow-lg">
            <Box className="text-white w-8 h-8" />
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-300 via-cyan-400 to-blue-400 text-transparent bg-clip-text">
            Text to 3D
          </h1>
        </div>
        <Interactive3D color="#65c8c8" />

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
