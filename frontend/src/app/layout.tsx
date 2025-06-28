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

type UseCase =
  | "text2d"
  | "image23d"
  | "text2d3d"
  | "text2speech"
  | "text2audio"
  | "text2video"
  | "coder";

type Chat = { name: string; messages: any[]; type: UseCase };
type Project = {
  id: string;
  name: string;
  instructions: string;
  files: { name: string; content: any }[];
  chats: Chat[];
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // --- State
  const [projects, setProjects] = useState<Project[]>([
    {
      id: uuidv4(),
      name: "Demo Project",
      instructions: "",
      files: [],
      chats: [
        { name: "Chat 1", messages: [], type: "text2d" },
        { name: "Chat 2", messages: [], type: "coder" },
      ],
    },
  ]);
  const [standaloneChats, setStandaloneChats] = useState<Chat[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string>(projects[0]?.id || "");
  const [currentChatName, setCurrentChatName] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeUseCase, setActiveUseCase] = useState<UseCase>("text2d");

  // --- Get current project/chat
  const currentProject = projects.find((p) => p.id === currentProjectId);
  const currentChat: Chat | undefined =
    currentProject?.chats.find((c) => c.name === currentChatName) ||
    standaloneChats.find((c) => c.name === currentChatName);

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
    setActiveUseCase("text2d");
  }

  function handleProjectSelect(projectId: string) {
    setCurrentProjectId(projectId);
    setActiveUseCase("text2d");
    setCurrentChatName(""); // clear any chat selection
  }

	function handleChatRename(oldName: string, newName: string, projectId?: string) {
	  if (projectId) {
		// Project chat rename
		setProjects(prev =>
		  prev.map(p =>
			p.id === projectId
			  ? {
				  ...p,
				  chats: p.chats.map(c =>
					c.name === oldName ? { ...c, name: newName } : c
				  ),
				}
			  : p
		  )
		);
		// If renaming the current chat, update selected chat name
		if (currentChatName === oldName && currentProjectId === projectId) {
		  setCurrentChatName(newName);
		}
	  } else {
		// Standalone chat rename
		setStandaloneChats(prev =>
		  prev.map(c =>
			c.name === oldName ? { ...c, name: newName } : c
		  )
		);
		// If renaming the current chat, update selected chat name
		if (currentChatName === oldName && !currentProjectId) {
		  setCurrentChatName(newName);
		}
	  }
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
        ? {
            ...p,
            chats: [
              ...p.chats,
              { name: chatName, messages: [], type: activeUseCase }
            ]
          }
        : p
    ));
    setCurrentProjectId(id);
    setCurrentChatName(chatName);
    setActiveUseCase(activeUseCase);
  }

  function handleChatSelect(chatName: string, projectId?: string) {
    let type: UseCase = "text2d";
    if (projectId) {
      setCurrentProjectId(projectId);
      const proj = projects.find(p => p.id === projectId);
      const chat = proj?.chats.find(c => c.name === chatName);
      if (chat) type = chat.type as UseCase;
    } else {
      const chat = standaloneChats.find(c => c.name === chatName);
      if (chat) type = chat.type as UseCase;
    }
    setCurrentChatName(chatName);
    setActiveUseCase(type);
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
    setStandaloneChats(prev => [
      ...prev,
      { name: chatName, messages: [], type: activeUseCase }
    ]);
    setCurrentProjectId(""); // Deselect project so chat section is active
    setCurrentChatName(chatName);
    setActiveUseCase(activeUseCase); // Use whatever was active
  }

  // --- File handling per project
  function handleFileAdd() { /* ...omitted for brevity... */ }
  function handleExport() { alert("Export not implemented."); }
  function handleArchive() { alert("Archive not implemented."); }
  function handleSettingsClick() { alert("Settings not implemented."); }
  function handleChatSaved() { alert("Chat saved!"); }

	// --- Navbar: Change type of the current chat
	function handleNavbarTypeChange(newType: UseCase) {
	  setActiveUseCase(newType);

	  // Check if we're in a project chat (current chat name is in current project's chats)
	  if (
		currentProject &&
		currentChatName &&
		currentProject.chats.some(c => c.name === currentChatName)
	  ) {
		setProjects(prev =>
		  prev.map(p =>
			p.id === currentProjectId
			  ? {
				  ...p,
				  chats: p.chats.map(c =>
					c.name === currentChatName ? { ...c, type: newType } : c
				  ),
				}
			  : p
		  )
		);
	  }
	  // Otherwise, if we're in a standalone chat (chat exists in standaloneChats)
	  else if (
		currentChatName &&
		standaloneChats.some(c => c.name === currentChatName)
	  ) {
		setStandaloneChats(prev =>
		  prev.map(c =>
			c.name === currentChatName ? { ...c, type: newType } : c
		  )
		);
	  }
	}

  // --- Render Logic
	function renderPage() {
	  // If a chat is open (project or standalone)
	  if (currentChatName && currentChat) {
		const onSend = (msg: string) => {
		  if (currentProject && currentChatName && currentProject.chats.some(c => c.name === currentChatName)) {
			// Project chat
			setProjects(prev =>
			  prev.map(p =>
				p.id === currentProjectId
				  ? {
					  ...p,
					  chats: p.chats.map(c =>
						c.name === currentChatName
						  ? { ...c, messages: [...c.messages, { role: "user", content: msg }] }
						  : c
					  )
					}
				  : p
			  )
			);
		  } else if (currentChatName) {
			// Standalone chat
			setStandaloneChats(prev =>
			  prev.map(c =>
				c.name === currentChatName
				  ? { ...c, messages: [...c.messages, { role: "user", content: msg }] }
				  : c
			  )
			);
		  }
		};

		switch (currentChat.type) {
		  case "text2d":
			return (
			  <Text2DPage
				messages={currentChat.messages}
				onSend={onSend}
				sidebarOpen={sidebarOpen}
			  />
			);
		  case "text2d3d":
			return (
			  <Text2D3DPage
				messages={currentChat.messages}
				onSend={onSend}
				sidebarOpen={sidebarOpen}
			  />
			);
		  case "image23d":
			return (
			  <Image2D3DPage
				messages={currentChat.messages}
				onSend={onSend}
				sidebarOpen={sidebarOpen}
			  />
			);
		  case "text2audio":
			return (
			  <Text2AudioPage
				messages={currentChat.messages}
				onSend={onSend}
				sidebarOpen={sidebarOpen}
			  />
			);
		  case "text2speech":
			return (
			  <Text2SpeechPage
				messages={currentChat.messages}
				onSend={onSend}
				sidebarOpen={sidebarOpen}
			  />
			);
		  case "text2video":
			return (
			  <Text2VideoPage
				messages={currentChat.messages}
				onSend={onSend}
				sidebarOpen={sidebarOpen}
			  />
			);
		  case "coder":
			return (
			  <CoderPage
				messages={currentChat.messages}
				onSend={onSend}
				sidebarOpen={sidebarOpen}
			  />
			);
		  default:
			return (
			  <Text2DPage
				messages={currentChat.messages}
				onSend={onSend}
				sidebarOpen={sidebarOpen}
			  />
			);
		}
	  }

	  // Project overview (no chat selected)
	  if (currentProjectId && !currentChatName) {
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

	  // Otherwise, show a default page or dashboard
	  switch (activeUseCase) {
		case "text2d":
		  return <Text2DPage sidebarOpen={sidebarOpen} messages={[]} onSend={() => {}} />;
		case "image23d":
		  return <Image2D3DPage sidebarOpen={sidebarOpen} messages={[]} onSend={() => {}} />;
		case "text2d3d":
		  return <Text2D3DPage sidebarOpen={sidebarOpen} messages={[]} onSend={() => {}} />;
		case "text2speech":
		  return <Text2SpeechPage sidebarOpen={sidebarOpen} messages={[]} onSend={() => {}} />;
		case "text2audio":
		  return <Text2AudioPage sidebarOpen={sidebarOpen} messages={[]} onSend={() => {}} />;
		case "text2video":
		  return <Text2VideoPage sidebarOpen={sidebarOpen} messages={[]} onSend={() => {}} />;
		case "coder":
		  return <CoderPage sidebarOpen={sidebarOpen} messages={[]} onSend={() => {}} />;
		default:
		  return <Text2DPage sidebarOpen={sidebarOpen} messages={[]} onSend={() => {}} />;
	  }
	}

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        {/* Show navbar ONLY when a chat is open */}
		<Navbar
		  onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
		  onSelect={handleNavbarTypeChange}
		  activeUseCase={activeUseCase}
		  inChatContext={!!currentChatName}
		/>
        )}
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
		  onChatRename={handleChatRename}
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
