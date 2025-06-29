"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen, Layers, ArrowLeft, Plus, Save as SaveIcon, MoreVertical,
  UploadCloud, BookOpenText, History, Trash2, Edit, ChevronDown, ChevronRight
} from "lucide-react";
import SaveChat from "./SaveChat";
import ImportChat from "./ImportChat";
import SaveProject from "./SaveProject";
import ImportProject from "./ImportProject";

// --- Types ---
type Chat = { name: string; messages: any[] };
type Project = {
  name: string;
  id: string;
  chats: Chat[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projects?: Project[];
  currentProjectId?: string;
  chats?: Chat[]; // Standalone chats
  currentChat?: string;
  messages?: any[];
  onProjectCreate?: () => void;
  onProjectImport?: () => void;
  onProjectSelect?: (id: string) => void;
  onProjectRename?: (id: string, newName: string) => void;
  onProjectDelete?: (id: string) => void;
  onProjectSave?: (id: string) => void;
  onProjectAddChat?: (id: string) => void;
  onChatSelect?: (chatName: string, projectId?: string) => void;
  onChatSaved?: () => void;
  onChatDelete?: (chatName: string, projectId?: string) => void;
  onChatRename?: (oldName: string, newName: string, projectId?: string) => void; // <-- ADD THIS
  onStandaloneChatCreate?: () => void;
  onStandaloneChatImport?: () => void;
};

export default function Sidebar({
  isOpen,
  onClose,
  projects = [],
  currentProjectId = "",
  chats = [],
  currentChat = "",
  messages = [],
  onProjectCreate,
  onProjectImport,
  onProjectSelect,
  onProjectRename,
  onProjectDelete,
  onProjectSave,
  onProjectAddChat,
  onChatSelect,
  onChatSaved,
  onChatDelete,
  onChatRename, // <-- HERE
  onStandaloneChatCreate,
  onStandaloneChatImport,
}: Props) {
  const sidebarWidth = 340;

  // Modal states
  const [showSaveChat, setShowSaveChat] = useState(false);
  const [showSaveProject, setShowSaveProject] = useState(false);
  const [showImportChat, setShowImportChat] = useState(false);
  const [showImportProject, setShowImportProject] = useState(false);
  const [renamingProjectId, setRenamingProjectId] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [projectChatsExpanded, setProjectChatsExpanded] = useState<{ [id: string]: boolean }>({});
  const [menuOpenProjectId, setMenuOpenProjectId] = useState<string | null>(null);


  // --- For Chat menus and renaming ---
  const [chatMenu, setChatMenu] = useState<{ projectId?: string, chatName?: string } | null>(null);
  const [renamingChat, setRenamingChat] = useState<{ projectId?: string, chatName?: string } | null>(null);
  const [newChatName, setNewChatName] = useState("");

  // Toggle only the clicked project
  const toggleProjectChats = (id: string) =>
    setProjectChatsExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  // MAIN RENDER
  return (
    <>
      <AnimatePresence>
        {isOpen && (
			<motion.aside
			  initial={{ x: -sidebarWidth, opacity: 0 }}
			  animate={{ x: 0, opacity: 1 }}
			  exit={{ x: -sidebarWidth, opacity: 0 }}
			  transition={{ type: "spring", stiffness: 70, damping: 15 }}
			  className="fixed top-0 left-0 z-50 h-full w-[340px] flex flex-col border-r border-cyan-900
				bg-[rgba(17,24,38,0.50)] backdrop-blur-lg"
			  style={{ width: sidebarWidth, boxShadow: "none" }}
			>

            {/* Sidebar header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gradient-to-r from-gray-950 to-gray-900">
              <span className="text-lg font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" /> Workspace
              </span>
              <button
                className="rounded hover:bg-gray-800 p-1"
                onClick={onClose}
                title="Close Sidebar"
              >
                <ArrowLeft className="w-5 h-5 text-gray-300" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {/* --- Projects Section --- */}
              <section>
                <div className="flex items-center gap-2 mb-2 text-gray-300 font-semibold uppercase text-xs tracking-wider">
                  <FolderOpen className="w-4 h-4" /> Projects
                  <button
                    className="ml-auto bg-green-700 hover:bg-green-600 rounded p-1 text-white"
                    onClick={() => setShowImportProject(true)}
                    title="Import Project"
                    type="button"
                  >
                    <UploadCloud className="w-4 h-4" />
                  </button>
                  <button
                    className="ml-2 bg-blue-700 hover:bg-blue-600 rounded p-1 text-white"
                    onClick={onProjectCreate}
                    title="Create Project"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  {projects.length === 0 && (
                    <div className="text-gray-600 pl-6 text-xs">No projects yet</div>
                  )}
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className={`flex flex-col rounded
                        ${currentProjectId === proj.id ? "bg-blue-900/40 font-bold text-blue-200" : "hover:bg-gray-800/80 text-gray-200"}`}
                    >
                      {/* Project Row */}
                      <div className="flex items-center px-2 py-2 group">
                        {/* Expand/Collapse */}
                        <button
                          type="button"
                          onClick={() => toggleProjectChats(proj.id)}
                          className="flex items-center gap-1 focus:outline-none"
                          tabIndex={-1}
                        >
                          {(projectChatsExpanded[proj.id] || currentProjectId === proj.id)
                            ? <ChevronDown className="w-4 h-4" />
                            : <ChevronRight className="w-4 h-4" />}
                        </button>
                        {/* Select Project */}
                        <button
                          type="button"
                          onClick={() => onProjectSelect?.(proj.id)}
                          className="flex-1 flex items-center gap-2 text-left px-1"
                        >
                          {renamingProjectId === proj.id ? (
                            <input
                              value={newProjectName}
                              onChange={e => setNewProjectName(e.target.value)}
                              onBlur={() => {
                                setRenamingProjectId(null);
                                if (newProjectName.trim() && newProjectName !== proj.name)
                                  onProjectRename?.(proj.id, newProjectName);
                              }}
                              onKeyDown={e => {
                                if (e.key === "Enter") {
                                  setRenamingProjectId(null);
                                  if (newProjectName.trim() && newProjectName !== proj.name)
                                    onProjectRename?.(proj.id, newProjectName);
                                }
                              }}
                              className="bg-gray-800 px-2 py-1 rounded w-24 text-sm"
                              autoFocus
                            />
                          ) : (
                            <span className="flex items-center gap-2">
                              <FolderOpen className="w-4 h-4" />
                              {proj.name}
                            </span>
                          )}
                        </button>
                        {/* Project Action Buttons */}
                        {currentProjectId === proj.id && (
                          <>
                            <button
                              className="bg-yellow-700 hover:bg-yellow-600 rounded p-1 text-white ml-1"
                              onClick={() => setShowSaveProject(true)}
                              title="Save Project"
                              type="button"
                            >
                              <SaveIcon className="w-4 h-4" />
                            </button>
                            <button
                              className="bg-blue-800 hover:bg-blue-700 rounded p-1 text-white ml-1"
                              onClick={() => onProjectAddChat?.(proj.id)}
                              title="Add Chat to Project"
                              type="button"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            {/* 3-dots menu */}
                            <div className="relative group">
							  <button
								className="bg-gray-800 hover:bg-gray-700 rounded p-1 text-white ml-1"
								title="Project Options"
								onClick={() => setMenuOpenProjectId(menuOpenProjectId === proj.id ? null : proj.id)}
							  >
								<MoreVertical className="w-4 h-4" />
							  </button>
							  {menuOpenProjectId === proj.id && (
								<div className="absolute top-8 right-0 bg-gray-900 rounded border border-gray-700 z-10">
								  <button
									className="block w-full px-4 py-2 hover:bg-gray-800 text-left"
									onClick={() => {
									  setMenuOpenProjectId(null);
									  setNewProjectName(proj.name);
									  setRenamingProjectId(proj.id);
									}}
								  >
									<Edit className="inline w-4 h-4 mr-2" /> Rename
								  </button>
								  <button
									className="block w-full px-4 py-2 hover:bg-red-800 text-left text-red-400"
									onClick={() => {
									  setMenuOpenProjectId(null);
									  onProjectDelete?.(proj.id);
									}}
								  >
									<Trash2 className="inline w-4 h-4 mr-2" /> Delete
								  </button>
								</div>
							  )}
							</div>

                          </>
                        )}
                      </div>
                      {/* Project Chats, collapsible */}
                      {(projectChatsExpanded[proj.id] || currentProjectId === proj.id) && (
                        <div className="ml-7 space-y-1 pb-2">
                          {(!proj.chats || proj.chats.length === 0) && (
                            <div className="text-xs text-gray-500 pl-2">No chats yet</div>
                          )}
                          {(proj.chats || []).map((chat) => (
                            <div
                              key={chat.name}
                              className={`flex items-center group rounded ${
                                currentProjectId === proj.id && currentChat === chat.name
                                  ? "bg-blue-800/80 font-bold text-white"
                                  : "hover:bg-gray-800/80 text-gray-200"
                              }`}
                            >
                              {/* Chat Name or Rename Input */}
                              {renamingChat?.projectId === proj.id && renamingChat.chatName === chat.name ? (
                                <input
                                  className="bg-gray-800 px-2 py-1 rounded w-24 text-sm"
                                  value={newChatName}
                                  onChange={e => setNewChatName(e.target.value)}
                                  onBlur={() => {
                                    setRenamingChat(null);
                                    if (newChatName.trim() && newChatName !== chat.name)
                                      onChatRename?.(chat.name, newChatName, proj.id);
                                  }}
                                  onKeyDown={e => {
                                    if (e.key === "Enter") {
                                      setRenamingChat(null);
                                      if (newChatName.trim() && newChatName !== chat.name)
                                        onChatRename?.(chat.name, newChatName, proj.id);
                                    }
                                  }}
                                  autoFocus
                                />
                              ) : (
                                <button
                                  className="flex-1 flex items-center gap-2 px-2 py-1 text-left"
                                  onClick={() => onChatSelect?.(chat.name, proj.id)}
                                >
                                  <History className="w-4 h-4" /> {chat.name}
                                </button>
                              )}
                              {/* Save Chat button */}
                              {currentProjectId === proj.id && currentChat === chat.name && (
                                <button
                                  className="bg-yellow-700 hover:bg-yellow-600 rounded p-1 text-white ml-1"
                                  onClick={() => setShowSaveChat(true)}
                                  title="Save Chat"
                                >
                                  <SaveIcon className="w-4 h-4" />
                                </button>
                              )}
                              {/* Three dots menu for chats */}
                              <div className="relative">
                                <button
                                  className="bg-gray-800 hover:bg-gray-700 rounded p-1 text-white ml-1"
                                  onClick={() => setChatMenu(chatMenu && chatMenu.projectId === proj.id && chatMenu.chatName === chat.name ? null : { projectId: proj.id, chatName: chat.name })}
                                  title="Chat Options"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                                {chatMenu && chatMenu.projectId === proj.id && chatMenu.chatName === chat.name && (
                                  <div className="absolute top-8 right-0 bg-gray-900 rounded shadow-lg border border-gray-700 z-10">
                                    <button
                                      className="block w-full px-4 py-2 hover:bg-gray-800 text-left"
                                      onClick={() => {
                                        setRenamingChat({ projectId: proj.id, chatName: chat.name });
                                        setNewChatName(chat.name);
                                        setChatMenu(null);
                                      }}
                                    >
                                      <Edit className="inline w-4 h-4 mr-2" /> Rename
                                    </button>
                                    <button
                                      className="block w-full px-4 py-2 hover:bg-red-800 text-left text-red-400"
                                      onClick={() => {
                                        onChatDelete?.(chat.name, proj.id);
                                        setChatMenu(null);
                                      }}
                                    >
                                      <Trash2 className="inline w-4 h-4 mr-2" /> Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
              {/* --- Standalone Chats Section --- */}
              <section>
                <div className="flex items-center gap-2 mb-2 text-gray-300 font-semibold uppercase text-xs tracking-wider">
                  <BookOpenText className="w-4 h-4" /> Chats
                  <button
                    className="ml-auto bg-blue-700 hover:bg-blue-600 rounded p-1 text-white"
                    onClick={onStandaloneChatCreate}
                    title="New Chat"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    className="ml-2 bg-green-700 hover:bg-green-600 rounded p-1 text-white"
                    onClick={() => setShowImportChat(true)}
                    title="Import Chat"
                    type="button"
                  >
                    <UploadCloud className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  {chats.length === 0 && (
                    <div className="text-gray-600 pl-6 text-xs">No chats yet</div>
                  )}
                  {chats.map((chat) => (
                    <div
                      key={chat.name}
                      className={`flex items-center group rounded 
                        ${!currentProjectId && currentChat === chat.name ? "bg-blue-900/70 font-bold text-blue-300" : "hover:bg-gray-800/90 text-gray-200"}`}
                    >
                      {/* Chat Name or Rename Input */}
                      {renamingChat?.chatName === chat.name && !renamingChat.projectId ? (
                        <input
                          className="bg-gray-800 px-2 py-1 rounded w-24 text-sm"
                          value={newChatName}
                          onChange={e => setNewChatName(e.target.value)}
                          onBlur={() => {
                            setRenamingChat(null);
                            if (newChatName.trim() && newChatName !== chat.name)
                              onChatRename?.(chat.name, newChatName);
                          }}
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              setRenamingChat(null);
                              if (newChatName.trim() && newChatName !== chat.name)
                                onChatRename?.(chat.name, newChatName);
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <button
                          onClick={() => onChatSelect?.(chat.name)}
                          className="flex-1 flex items-center gap-2 px-2 py-2 text-left"
                        >
                          <History className="w-4 h-4" /> {chat.name}
                        </button>
                      )}
                      {/* Only show save on the selected standalone chat */}
                      {!currentProjectId && currentChat === chat.name && (
                        <button
                          className="bg-yellow-700 hover:bg-yellow-600 rounded p-1 text-white ml-1"
                          onClick={() => setShowSaveChat(true)}
                          title="Save Chat"
                          type="button"
                        >
                          <SaveIcon className="w-4 h-4" />
                        </button>
                      )}
                      {/* Three dots menu for standalone chats */}
                      <div className="relative">
                        <button
                          className="bg-gray-800 hover:bg-gray-700 rounded p-1 text-white ml-1"
                          onClick={() => setChatMenu(chatMenu && !chatMenu.projectId && chatMenu.chatName === chat.name ? null : { chatName: chat.name })}
                          title="Chat Options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {chatMenu && !chatMenu.projectId && chatMenu.chatName === chat.name && (
                          <div className="absolute top-8 right-0 bg-gray-900 rounded border border-gray-700 z-10">
                            <button
                              className="block w-full px-4 py-2 hover:bg-gray-800 text-left"
                              onClick={() => {
                                setRenamingChat({ chatName: chat.name });
                                setNewChatName(chat.name);
                                setChatMenu(null);
                              }}
                            >
                              <Edit className="inline w-4 h-4 mr-2" /> Rename
                            </button>
                            <button
                              className="block w-full px-4 py-2 hover:bg-red-800 text-left text-red-400"
                              onClick={() => {
                                onChatDelete?.(chat.name);
                                setChatMenu(null);
                              }}
                            >
                              <Trash2 className="inline w-4 h-4 mr-2" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* Save Chat Modal */}
      {showSaveChat && (
        <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-lg">Save Chat</span>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowSaveChat(false)}
                title="Close"
              >✕</button>
            </div>
            <SaveChat
              currentProject={currentProjectId ? projects.find(p => p.id === currentProjectId)?.name : undefined}
              projectId={currentProjectId}
              chatName={currentChat}
              messages={messages}
              onSaved={() => setShowSaveChat(false)}
              onCancel={() => setShowSaveChat(false)}
            />
          </div>
        </div>
      )}
      {/* Save Project Modal */}
      {showSaveProject && (
        <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-lg">Save Project</span>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowSaveProject(false)}
                title="Close"
              >✕</button>
            </div>
            <SaveProject
              projectName={projects.find(p => p.id === currentProjectId)?.name || ""}
              projectId={currentProjectId}
              onSaved={() => setShowSaveProject(false)}
              onCancel={() => setShowSaveProject(false)}
            />
          </div>
        </div>
      )}
      {/* Import Chat Modal */}
      {showImportChat && (
        <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-lg">Import Chat</span>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowImportChat(false)}
                title="Close"
              >✕</button>
            </div>
            <ImportChat
              onImported={() => setShowImportChat(false)}
            />
          </div>
        </div>
      )}
      {/* Import Project Modal */}
      {showImportProject && (
        <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-lg">Import Project</span>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowImportProject(false)}
                title="Close"
              >✕</button>
            </div>
            <ImportProject
              onImported={() => setShowImportProject(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
