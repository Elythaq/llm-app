import ChatInput from '../components/ChatInput';

export default function Text2DPage({ sidebarOpen = true }: { sidebarOpen?: boolean }) {
  function handleSend(msg: string) {
    console.log("Text2DPage:", msg);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-32">
      <h1 className="text-3xl font-bold mb-6">Text to 2D</h1>
      <p className="text-gray-400 mb-4">Generate 2D images from text prompts.</p>
      <ChatInput onSend={handleSend} sidebarOpen={sidebarOpen} sidebarWidth={340} />
    </div>
  );
}
