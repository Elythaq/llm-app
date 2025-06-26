import ChatInput from '../components/ChatInput';

export default function Text2D3DPage({ sidebarOpen = true }: { sidebarOpen?: boolean }) {
  function handleSend(msg: string) {
    console.log("Text2D3DPage:", msg);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-32">
      <h1 className="text-3xl font-bold mb-6">Text to 3D</h1>
      <p className="text-gray-400 mb-4">Generate 3D models from text prompts.</p>
      <ChatInput onSend={handleSend} sidebarOpen={sidebarOpen} sidebarWidth={340} />
    </div>
  );
}
