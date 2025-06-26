"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FolderPlus, FolderOpen, FilePlus2, FileText, History, Cog, Download, Archive,
  UploadCloud, Plus, Layers, Settings, ArrowLeft, BookOpenText
} from "lucide-react";

export default function Sidebar({
  isOpen,
  onClose,
  onProjectCreate,
  onFileAdd,
  onExport,
  onArchive,
  projects = [],
  currentProject = "",
  chats = [],
  onProjectSelect,
  onChatSelect,
  onSettingsClick,
}: {
  isOpen: boolean,
  onClose: () => void,
  onProjectCreate?: () => void,
  onFileAdd?: () => void,
  onExport?: () => void,
  onArchive?: () => void,
  projects?: string[],
  currentProject?: string,
  chats?: string[],
  onProjectSelect?: (project: string) => void,
  onChatSelect?: (chat: string) => void,
  onSettingsClick?: () => void,
}) {
  // Sidebar panel width
  const sidebarWidth = 340;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -sidebarWidth, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -sidebarWidth, opacity: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="fixed top-0 left-0 z-50 h-full bg-gray-950 border-r border-gray-800 shadow-2xl w-[340px] flex flex-col"
          style={{ width: sidebarWidth }}
        >
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
            <section>
              <div className="flex items-center gap-2 mb-2 text-gray-300 font-semibold uppercase text-xs tracking-wider">
                <FolderOpen className="w-4 h-4" /> Projects
                <button
                  className="ml-auto bg-blue-700 hover:bg-blue-600 rounded p-1 text-white"
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
                  <button
                    key={proj}
                    onClick={() => onProjectSelect && onProjectSelect(proj)}
                    className={`w-full text-left flex items-center gap-2 p-2 rounded 
                    ${currentProject === proj
                      ? "bg-blue-900/60 text-blue-200 font-bold"
                      : "hover:bg-gray-800/90 text-gray-200"}`}
                  >
                    <FolderPlus className="w-4 h-4" /> {proj}
                  </button>
                ))}
              </div>
            </section>
            <section>
              <div className="flex items-center gap-2 mb-2 text-gray-300 font-semibold uppercase text-xs tracking-wider">
                <BookOpenText className="w-4 h-4" /> Chats
                <button
                  className="ml-auto bg-blue-700 hover:bg-blue-600 rounded p-1 text-white"
                  onClick={onChatSelect && (() => onChatSelect("new"))}
                  title="New Chat"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {chats.length === 0 && (
                  <div className="text-gray-600 pl-6 text-xs">No chats yet</div>
                )}
                {chats.map((chat) => (
                  <button
                    key={chat}
                    onClick={() => onChatSelect && onChatSelect(chat)}
                    className="w-full text-left flex items-center gap-2 p-2 rounded hover:bg-gray-800/90 text-gray-200"
                  >
                    <History className="w-4 h-4" /> {chat}
                  </button>
                ))}
              </div>
            </section>
            <section>
              <div className="flex items-center gap-2 mb-2 text-gray-300 font-semibold uppercase text-xs tracking-wider">
                <FilePlus2 className="w-4 h-4" /> Files
                <button
                  className="ml-auto bg-green-700 hover:bg-green-600 rounded p-1 text-white"
                  onClick={onFileAdd}
                  title="Add File"
                >
                  <UploadCloud className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-gray-600 pl-6">Unlimited file types supported</div>
            </section>
            <section>
              <div className="flex items-center gap-2 mb-2 text-gray-300 font-semibold uppercase text-xs tracking-wider">
                <Cog className="w-4 h-4" /> Model Settings
                <button
                  className="ml-auto bg-gray-700 hover:bg-gray-600 rounded p-1 text-white"
                  onClick={onSettingsClick}
                  title="Open Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </section>
            <section>
              <div className="flex items-center gap-2 mb-2 text-gray-300 font-semibold uppercase text-xs tracking-wider">
                <Download className="w-4 h-4" /> Export & Archive
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-purple-700 hover:bg-purple-600 rounded px-2 py-1 text-xs text-white flex items-center gap-1"
                  onClick={onExport}
                  title="Export All"
                >
                  <Download className="w-4 h-4" /> Export
                </button>
                <button
                  className="bg-yellow-700 hover:bg-yellow-600 rounded px-2 py-1 text-xs text-white flex items-center gap-1"
                  onClick={onArchive}
                  title="Archive All"
                >
                  <Archive className="w-4 h-4" /> Archive
                </button>
              </div>
            </section>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
