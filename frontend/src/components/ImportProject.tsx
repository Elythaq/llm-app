// /src/components/ImportProject.tsx

"use client";

import { useRef } from "react";

export default function ImportProject({
  onImported,
  onCancel,
}: {
  onImported: (data?: any) => void,
  onCancel: () => void,
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        onImported(data);
      } catch {
        alert("Invalid project file!");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Import Project</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Project File</label>
          <input
            ref={fileInputRef}
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white"
            type="file"
            accept="application/json"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold"
            onClick={onCancel}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
}
