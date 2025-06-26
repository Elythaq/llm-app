import ChatInput from '../components/ChatInput';

export default function Text2SpeechPage({ sidebarOpen = true }: { sidebarOpen?: boolean }) {
  function handleSend(msg: string) {
    console.log("Text2SpeechPage:", msg);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-32">
      <h1 className="text-3xl font-bold mb-6">Text to Speech</h1>
      <p className="text-gray-400 mb-4">Convert text into speech with customizable voices.</p>
      <ChatInput onSend={handleSend} sidebarOpen={sidebarOpen} sidebarWidth={340} />
    </div>
  );
}
