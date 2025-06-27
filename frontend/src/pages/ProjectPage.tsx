// /src/pages/ProjectPage.tsx

"use client";

import { useState } from "react";
import SaveProject from "../components/SaveProject";
import ImportProject from "../components/ImportProject";
import { Plus, UploadCloud, Save, File, FileText } from "lucide-react";

export default function ProjectPage({
  projectName,
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
  projectName: string,
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
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{projectName}</h2>
          {projectId && <p className="text-xs text-gray-400">ID: {projectId}</p>}
        </div>
        <div className="flex gap-2">
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
      </div>
      {/* Project Instructions */}
      <div className="mb-4">
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
      <div className="mb-6">
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
            <span className="text-xs text-gray-500">No files uploaded.</span>
          )}
          {files.map((file, i) => (
            <span key={i} className="flex items-center gap-1 bg-gray-800 rounded px-2 py-1 text-xs">
              <FileText className="w-3 h-3" /> {file.name}
            </span>
          ))}
        </div>
      </div>
      {/* Chat List */}
      <div className="mb-6">
        <div className="font-semibold mb-1">Chats</div>
        <div className="flex flex-col gap-2">
          {chats.length === 0 && (
            <span className="text-xs text-gray-500">No chats in this project yet.</span>
          )}
          {chats.map((chat) => (
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
  );
}
