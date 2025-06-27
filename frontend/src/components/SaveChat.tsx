"use client";

import { useState, useEffect, useRef } from "react";

export default function SaveChat({
  chatName = "",
  currentProject,
  projectId,
  messages = [],
  onSaved,
  onCancel,
}: {
  chatName?: string,
  currentProject?: string,
  projectId?: string,
  messages?: any[],
  onSaved?: () => void,
  onCancel?: () => void,
}) {
  const [filename, setFilename] = useState(chatName || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilename(chatName || "");
    setTimeout(() => inputRef.current?.focus(), 200);
  }, [chatName]);

  function handleSave() {
    const safeProject = currentProject
      ? currentProject.replace(/[^a-zA-Z0-9_\-]/g, "_")
      : "";
    const safeFilename =
      filename.replace(/[^a-zA-Z0-9_\-]/g, "_") || "chat";
    let path = "chats/";
    if (safeProject) path += `${safeProject}/`;
    path += `${safeFilename}.json`;

    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = path;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onSaved) onSaved();
  }

  return (
    <div>
      <div className="font-semibold mb-2">Save Chat As</div>
      <input
        ref={inputRef}
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter chat file name"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        spellCheck={false}
      />
      <div className="flex gap-2">
        <button
          className="bg-green-700 hover:bg-green-800 px-5 py-2 rounded font-semibold text-white"
          onClick={handleSave}
          disabled={!filename}
        >
          Save
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded font-semibold text-white"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
