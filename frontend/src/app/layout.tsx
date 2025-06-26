"use client";

import './globals.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import Text2DPage from '../pages/Text2DPage'
import Image2D3DPage from '../pages/Image2D3DPage'
import Text2D3DPage from '../pages/Text2D3DPage'
import Text2SpeechPage from '../pages/Text2SpeechPage'
import Text2AudioPage from '../pages/Text2AudioPage'
import Text2VideoPage from '../pages/Text2VideoPage'
import CoderPage from '../pages/CoderPage'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeUseCase, setActiveUseCase] = useState("text2d");

  const projects = ["Demo Project"];
  const chats = ["Chat 1", "Chat 2"];

  // Only show one page at a time based on use case
  function renderPage() {
    switch (activeUseCase) {
      case "text2d":        return <Text2DPage sidebarOpen={sidebarOpen} />;
      case "image23d":      return <Image2D3DPage sidebarOpen={sidebarOpen} />;
      case "text23d":       return <Text2D3DPage sidebarOpen={sidebarOpen} />;
      case "text2speech":   return <Text2SpeechPage sidebarOpen={sidebarOpen} />;
      case "text2audio":    return <Text2AudioPage sidebarOpen={sidebarOpen} />;
      case "text2video":    return <Text2VideoPage sidebarOpen={sidebarOpen} />;
      case "coder":         return <CoderPage sidebarOpen={sidebarOpen} />;
      default:              return <Text2DPage sidebarOpen={sidebarOpen} />;
    }
  }

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Navbar
          onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
          onSelect={setActiveUseCase}
          activeUseCase={activeUseCase}
        />
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          projects={projects}
          chats={chats}
          currentProject={projects[0]}
        />
        <div
          className="pt-20 transition-all duration-300"
          style={{
            marginLeft: sidebarOpen ? 340 : 0,
            transitionProperty: "margin-left"
          }}
        >
          {renderPage()}
        </div>
      </body>
    </html>
  );
}
