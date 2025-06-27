"use client";

import './globals.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProjectPage from '../pages/ProjectPage';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Text2DPage from '../pages/Text2DPage';
import Image2D3DPage from '../pages/Image2D3DPage';
import Text2D3DPage from '../pages/Text2D3DPage';
import Text2SpeechPage from '../pages/Text2SpeechPage';
import Text2AudioPage from '../pages/Text2AudioPage';
import Text2VideoPage from '../pages/Text2VideoPage';
import CoderPage from '../pages/CoderPage';

type Chat = { name: string; messages: any[] };
type Project = {
  id: string;
  name: string;
  instructions: string;
  files: { name: string; content: any }[];
  chats: Chat[];
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: uuidv4(),
      name: "Demo Project",
      instructions: "",
      files: [],
      chats: [
        { name: "Chat 1", messages: [] },
        { name: "Chat 2", messages: [] },
      ],
    },
  ]);
  const [standaloneChats, setStandaloneChats] = useState<Chat[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string>(projects[0]?.id || "");
  const [currentChatName, setCurrentChatName] = useState<string>(projects[0]?.chats[0]?.name || "");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeUseCase, setActiveUseCase] = useState<"project" | "text2d" | "image23d" | "text23d" | "text2speech" | "text2audio" | "text2video" | "coder">("text2d");

  const currentProject = projects.find((p) => p.id === currentProjectId);
  const currentChat =
    currentProject?.chats.find((c) => c.name === currentChatName)
    || standaloneChats.find((c) => c.name === currentChatName);

  // --- Project management
  function handleProjectCreate() {
    const newName = window.prompt("Enter new project name:");
    if (!newName) return;
    const newProject: Project = {
      id: uuidv4(),
      name: newName,
      instructions: "",
      files: [],
      chats: [],
    };
    setProjects((prev) => [...prev, newProject]);
    setCurrentProjectId(newProject.id);
    setCurrentChatName("");
    setActiveUseCase("project");
  }
  function handleProjectSelect(projectId: string) {
    setCurrentProjectId(projectId);
    setActiveUseCase("project");
    const proj = projects.find(p => p.id === projectId);
    if (proj?.chats.length) setCurrentChatName(proj.chats[0].name);
    else setCurrentChatName("");
  }
  function handleProjectRename(id: string, newName: string) {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, name: newName } : p));
  }
  function handleProjectDelete(id: string) {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (currentProjectId === id) {
      setCurrentProjectId("");
      setCurrentChatName("");
    }
  }
  function handleProjectSave(id: string) {
    alert("Save project: " + id);
  }
  function handleProjectAddChat(id: string) {
    const chatName = window.prompt("Enter chat name:");
    if (!chatName) return;
    setProjects(prev => prev.map(p =>
      p.id === id
        ? { ...p, chats: [...p.chats, { name: chatName, messages: [] }] }
        : p
    ));
    setCurrentProjectId(id);
    setCurrentChatName(chatName);
    setActiveUseCase("project");
  }
  function handleChatSelect(chatName: string, projectId?: string) {
    if (projectId) {
      setCurrentProjectId(projectId);
      setActiveUseCase("project");
    }
    setCurrentChatName(chatName);
    setActiveUseCase(projectId ? "project" : activeUseCase);
  }
  function handleChatDelete(chatName: string, projectId?: string) {
    if (projectId) {
      setProjects(prev =>
        prev.map(p =>
          p.id === projectId
            ? { ...p, chats: p.chats.filter(c => c.name !== chatName) }
            : p
        )
      );
      setCurrentChatName("");
    } else {
      setStandaloneChats(prev => prev.filter(c => c.name !== chatName));
    }
  }
  function handleStandaloneChatCreate() {
    const chatName = window.prompt("Enter new chat name:");
    if (!chatName) return;
    setStandaloneChats(prev => [...prev, { name: chatName, messages: [] }]);
    setCurrentProjectId(""); // Deselect project so chat section is active
    setCurrentChatName(chatName);
    setActiveUseCase("text2d"); // Or whatever non-project use case you want to default to
  }

  // --- File handling per project
  function handleFileAdd() { /* ...omitted for brevity... */ }
  function handleExport() { alert("Export not implemented."); }
  function handleArchive() { alert("Archive not implemented."); }
  function handleSettingsClick() { alert("Settings not implemented."); }
  function handleChatSaved() { alert("Chat saved!"); }

  function renderPage() {
    if (activeUseCase === "project" && currentProject) {
      return (
        <ProjectPage
          project={currentProject}
          currentChatName={currentChatName}
          setInstructions={instr =>
            setProjects(prev =>
              prev.map(p => p.id === currentProjectId ? { ...p, instructions: instr } : p)
            )
          }
        />
      );
    }
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
          currentProjectId={currentProjectId}
          chats={standaloneChats}
          currentChat={currentChatName}
          messages={currentChat ? currentChat.messages : []}
          onProjectCreate={handleProjectCreate}
          onProjectSelect={handleProjectSelect}
          onProjectRename={handleProjectRename}
          onProjectDelete={handleProjectDelete}
          onProjectSave={handleProjectSave}
          onProjectAddChat={handleProjectAddChat}
          onChatSelect={handleChatSelect}
          onChatDelete={handleChatDelete}
          onStandaloneChatCreate={handleStandaloneChatCreate}
          onStandaloneChatImport={() => {}} // Implement if you want
          onChatSaved={handleChatSaved}
          onFileAdd={handleFileAdd}
          onExport={handleExport}
          onArchive={handleArchive}
          onSettingsClick={handleSettingsClick}
        />
		<div
		  className="transition-all duration-300"
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
