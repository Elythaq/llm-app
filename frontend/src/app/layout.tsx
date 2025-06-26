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
  const [projects, setProjects] = useState<string[]>(["Demo Project"]);
  const [currentProject, setCurrentProject] = useState<string>("Demo Project");
  const [chats, setChats] = useState<string[]>(["Chat 1", "Chat 2"]);
  const [files, setFiles] = useState<File[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // 1. Project handlers
  function handleProjectCreate() {
    const newName = window.prompt("Enter new project name:");
    if (!newName) return;
    setProjects(prev => [...prev, newName]);
    setCurrentProject(newName);
    alert(`Project "${newName}" created and selected!`);
  }
  function handleProjectSelect(project: string) {
    setCurrentProject(project);
    alert(`Project "${project}" selected!`);
  }

  // 2. Chat handlers
  function handleChatSelect(chat: string) {
    if (chat === "new") {
      const chatName = window.prompt("Enter new chat name:");
      if (!chatName) return;
      setChats(prev => [...prev, chatName]);
      alert(`Chat "${chatName}" created!`);
    } else {
      alert(`Switched to chat: "${chat}"`);
    }
  }

  // 3. File add (shows file picker)
  function handleFileAdd() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e: any) => {
      const newFiles = Array.from(e.target.files) as File[];
      setFiles(prev => [...prev, ...newFiles]);
      alert(`${newFiles.length} file(s) added!`);
    };
    input.click();
  }

  // 4. Export (simulate download)
  function handleExport() {
    alert("Export feature is not implemented yet!");
  }

  // 5. Archive (simulate archive)
  function handleArchive() {
    alert("Archive feature is not implemented yet!");
  }

  // 6. Settings
  function handleSettingsClick() {
    setSettingsOpen(true);
    alert("Settings panel/modal would open here.");
  }

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
          currentProject={currentProject}
          onProjectCreate={handleProjectCreate}
          onProjectSelect={handleProjectSelect}
          chats={chats}
          onChatSelect={handleChatSelect}
          onFileAdd={handleFileAdd}
          onExport={handleExport}
          onArchive={handleArchive}
          onSettingsClick={handleSettingsClick}
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
