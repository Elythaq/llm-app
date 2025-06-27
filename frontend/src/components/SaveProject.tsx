// /src/components/SaveProject.tsx

"use client";

import { useState } from "react";

export default function SaveProject({
  projectName,
  projectId,
  instructions,
  files,
  chats,
  onSaved,
  onCancel,
}: {
  projectName: string,
  projectId?: string,
  instructions?: string,
  files?: File[],
  chats?: string[],
  onSaved: () => void,
  onCancel: () => void,
}) {
  const [fileName, setFileName] = useState(`${projectName || "project"}.json`);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    // Prepare JSON for export
    const data = {
      projectName,
      projectId,
      instructions,
      files: files?.map((f) => ({ name: f.name, type: f.type, size: f.size })),
      chats,
      savedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Simulate download (since local file write not allowed in browser)
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.endsWith(".json") ? fileName : `${fileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setSaving(false);
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Save Project</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Project File Name</label>
          <input
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            placeholder="project.json"
            disabled={saving}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
            onClick={handleSave}
            disabled={saving}
          >{saving ? "Saving..." : "Save"}</button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
            onClick={onCancel}
            disabled={saving}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
}
