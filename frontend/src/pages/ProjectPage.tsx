// pages/ProjectPage.tsx
"use client";
import { useState } from "react";
import SaveProject from "../components/SaveProject";
import ImportProject from "../components/ImportProject";
import { Plus, UploadCloud, Save, File, FileText, Folder } from "lucide-react";
import Interactive3D from "../components/Interactive3D";

export default function ProjectPage({
  projectName = "Untitled Project",
  projectId,
  instructions: initialInstructions = "",
  files: initialFiles = [],
  chats = [],
  onChatSelect,
  onFileUpload,
  onInstructionsChange,
  onSaveProject,
  onImportProject,
}: {
  projectName?: string,
  projectId?: string,
  instructions?: string,
  files?: File[],
  chats?: string[],
  onChatSelect?: (chat: string) => void,
  onFileUpload?: (files: File[]) => void,
  onInstructionsChange?: (value: string) => void,
  onSaveProject?: () => void,
  onImportProject?: () => void,
}) {
  const [showSave, setShowSave] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [instructions, setInstructions] = useState(initialInstructions);
  const [files, setFiles] = useState<File[]>(initialFiles);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...newFiles]);
    onFileUpload && onFileUpload(newFiles);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-tr from-[#2b2d3a] via-[#295a77] to-[#13a38c] py-10">
      <div className="flex flex-col items-center w-full max-w-3xl p-6 rounded-2xl shadow-xl glassy-card border border-[#47c6b8]/30 mb-2">
        {/* Header with Icon */}
        <div className="flex items-center gap-4 mb-4">
          <span className="p-3 rounded-full bg-gradient-to-tr from-green-400 via-cyan-500 to-blue-500 shadow-lg">
            <Folder className="text-white w-8 h-8" />
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-400 text-transparent bg-clip-text">
            {projectName}
          </h2>
        </div>
        {projectId && <p className="text-xs text-gray-300 mb-2">ID: {projectId}</p>}
        <Interactive3D color="#13a38c" />
        {/* Project Instructions */}
        <div className="mb-4 w-full">
          <h3 className="font-semibold mb-2">Instructions</h3>
          <textarea
            className="w-full bg-gray-800 text-white rounded p-2 border border-gray-700"
            value={instructions}
            rows={4}
            onChange={(e) => {
              setInstructions(e.target.value);
              onInstructionsChange && onInstructionsChange(e.target.value);
            }}
          />
        </div>
        {/* File Upload */}
        <div className="mb-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Files</span>
            <label className="bg-blue-700 hover:bg-blue-600 p-1 rounded text-white cursor-pointer">
              <Plus className="inline w-4 h-4" />
              <input
                type="file"
                multiple
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {files.length === 0 && (
              <span className="text-xs text-gray-400">No files uploaded.</span>
            )}
            {files.map((file, i) => (
              <span key={i} className="flex items-center gap-1 bg-gray-800 rounded px-2 py-1 text-xs">
                <FileText className="w-3 h-3" /> {file.name}
              </span>
            ))}
          </div>
        </div>
        {/* Chat List */}
        <div className="mb-6 w-full">
          <div className="font-semibold mb-1">Chats</div>
          <div className="flex flex-col gap-2">
            {(!chats || chats.length === 0) && (
              <span className="text-xs text-gray-400">No chats in this project yet.</span>
            )}
            {chats && chats.map((chat) => (
              <button
                key={chat}
                className="flex items-center gap-2 px-2 py-1 rounded bg-gray-800 hover:bg-blue-900 text-left"
                onClick={() => onChatSelect && onChatSelect(chat)}
              >
                <File className="w-4 h-4" /> {chat}
              </button>
            ))}
          </div>
        </div>
        {/* Save / Import Buttons */}
        <div className="flex gap-2 mb-2">
          <button
            className="bg-yellow-700 hover:bg-yellow-600 p-2 rounded text-white"
            onClick={() => setShowSave(true)}
            title="Save Project"
          >
            <Save className="w-5 h-5" />
          </button>
          <button
            className="bg-green-700 hover:bg-green-600 p-2 rounded text-white"
            onClick={() => setShowImport(true)}
            title="Import Project"
          >
            <UploadCloud className="w-5 h-5" />
          </button>
        </div>
        {/* Save/Import Modals */}
        {showSave && (
          <SaveProject
            projectName={projectName}
            projectId={projectId}
            instructions={instructions}
            files={files}
            chats={chats}
            onSaved={() => setShowSave(false)}
            onCancel={() => setShowSave(false)}
          />
        )}
        {showImport && (
          <ImportProject
            onImported={() => setShowImport(false)}
            onCancel={() => setShowImport(false)}
          />
        )}
      </div>
    </div>
  );
}
