import ChatInput from '../components/ChatInput';

export default function CoderPage({ sidebarOpen = true }: { sidebarOpen?: boolean }) {
  function handleSend(msg: string) {
    console.log("CoderPage:", msg);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-32">
      <h1 className="text-3xl font-bold mb-6">AI Coder</h1>
      <p className="text-gray-400 mb-4">Get coding suggestions, generate code, or work with projects.</p>
      <ChatInput onSend={handleSend} sidebarOpen={sidebarOpen} sidebarWidth={340} />
    </div>
  );
}
