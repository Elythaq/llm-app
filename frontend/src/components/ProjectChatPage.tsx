// components/ProjectChatPage.tsx
import ChatArea, { ChatMessage } from "./ChatArea";
import ChatInput from "./ChatInput";

export default function ProjectChatPage({
  project,
  chatName,
  chatData,
  onSend,
  sidebarOpen = true,
  sidebarWidth = 340,
}: {
  project?: any; // <-- Make project optional!
  chatName: string;
  chatData: ChatMessage[];
  onSend: (msg: string) => void;
  sidebarOpen?: boolean;
  sidebarWidth?: number;
}) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b text-lg font-bold flex-shrink-0">
        {project ? (
          <>
            <span className="opacity-60">{project.name} /</span>
            <span className="ml-1">{chatName}</span>
          </>
        ) : (
          <span>{chatName}</span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <ChatArea messages={chatData} />
        <ChatInput onSend={onSend} sidebarOpen={sidebarOpen} sidebarWidth={sidebarWidth} />
      </div>
    </div>
  );
}
