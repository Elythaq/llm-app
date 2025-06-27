"use client";
import { useRef, useState } from "react";

export default function ImportChat({
  projectName = "",
  projectId = "",
  onImported,
}: {
  projectName?: string;
  projectId?: string;
  onImported?: (info: { success: boolean; error?: string }) => void;
}) {
  const [importing, setImporting] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleImport(e: React.FormEvent) {
    e.preventDefault();
    if (!fileInput.current?.files?.[0]) {
      setError("Select a JSON file.");
      return;
    }
    setImporting(true);
    setError(null);

    const file = fileInput.current.files[0];
    const chatName = file.name.replace(/\.json$/, "");

    const form = new FormData();
    form.append("file", file);
    form.append("project_name", projectName);
    form.append("project_id", projectId);
    form.append("chat_name", chatName);

    try {
      const res = await fetch("/api/chat/import", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      setImporting(false);
      if (data.success) {
        if (onImported) onImported({ success: true });
        fileInput.current.value = "";
      } else {
        setError(data.error || "Import failed");
        if (onImported) onImported({ success: false, error: data.error });
      }
    } catch (err) {
      setImporting(false);
      setError("Network or server error");
      if (onImported) onImported({ success: false, error: "Network or server error" });
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleImport}>
      <label className="font-semibold text-sm">Import Chat JSON</label>
      <input
        type="file"
        accept=".json,application/json"
        ref={fileInput}
        className="bg-gray-800 text-white rounded px-2 py-1"
        disabled={importing}
      />
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-600 rounded px-3 py-1 text-white disabled:opacity-50"
        disabled={importing}
      >
        {importing ? "Importing..." : "Import"}
      </button>
      {error && <div className="text-red-500 text-xs">{error}</div>}
    </form>
  );
}
