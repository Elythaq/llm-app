import ChatInput from '../components/ChatInput';

export default function Image2D3DPage({ sidebarOpen = true }: { sidebarOpen?: boolean }) {
  function handleSend(msg: string) {
    console.log("Image2D3DPage:", msg);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-32">
      <h1 className="text-3xl font-bold mb-6">Image to 3D</h1>
      <p className="text-gray-400 mb-4">Convert images into 3D models or assets.</p>
      <ChatInput onSend={handleSend} sidebarOpen={sidebarOpen} sidebarWidth={340} />
    </div>
  );
}
