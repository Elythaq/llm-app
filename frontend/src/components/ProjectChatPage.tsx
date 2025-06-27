import ChatArea, { ChatMessage } from "./ChatArea";
import ChatInput from "./ChatInput";
import Interactive3D from "./Interactive3D";

export default function ProjectChatPage({
  project,
  chatName,
  chatData,
  onSend,
  sidebarOpen = true,
  sidebarWidth = 340,
}: {
  project?: any;
  chatName: string;
  chatData: ChatMessage[];
  onSend: (msg: string) => void;
  sidebarOpen?: boolean;
  sidebarWidth?: number;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-[#1a2980] via-[#26d0ce] to-[#67c8ff] py-10 px-2">
      {/* Glowing Card */}
      <div className="
        w-full
        max-w-3xl
        flex flex-col
        min-h-[70vh]
        max-h-[90vh]
        rounded-2xl
        shadow-2xl
        glassy-card
        border-2
        border-cyan-300
        animate-borderGlow
        p-6
        mx-auto
        ">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 text-2xl font-bold select-none">
          {project ? (
            <>
              <span className="opacity-70">{project.name}</span>
              <span className="mx-2 opacity-40">/</span>
              <span className="text-white">{chatName}</span>
            </>
          ) : (
            <span className="text-white">{chatName}</span>
          )}
        </div>
        <Interactive3D color="#26d0ce" />
        {/* Chat area & input */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <ChatArea messages={chatData} />
          </div>
          <div className="w-full mt-2">
            <ChatInput
              onSend={onSend}
              sidebarOpen={sidebarOpen}
              sidebarWidth={sidebarWidth}
              isFloating={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
