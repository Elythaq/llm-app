export type ChatType =
  | "text2d"
  | "text2d3d"
  | "image23d"
  | "text2text"
  | "text2audio"
  | "text2video"
  | "coder";

const chatApiMap: Record<
  ChatType,
  { endpoint: string; responseType: "json" | "blob" }
> = {
  text2d:      { endpoint: "/generate-text",     responseType: "json" },
  text2d3d:    { endpoint: "/text-to-3d",        responseType: "blob" },
  image23d:    { endpoint: "/image-to-3d",       responseType: "blob" },
  text2text:   { endpoint: "/generate-text",     responseType: "json" },
  text2audio:  { endpoint: "/text-to-audio",     responseType: "blob" },
  text2video:  { endpoint: "/text-to-video",     responseType: "blob" },
  coder:       { endpoint: "/generate-code",     responseType: "json" },
};

const API_BASE = "http://localhost:8000";

export async function sendChatMessage(
  type: ChatType,
  msg: string,
  file?: File
): Promise<{ role: "assistant"; content: string | { url: string; type: string } }> {
  // Debug: print type and map keys for troubleshooting
  console.log("Type passed to sendChatMessage:", type);
  console.log("Keys in chatApiMap:", Object.keys(chatApiMap));

  const apiDef = chatApiMap[type];
  if (!apiDef) throw new Error(`Unknown chat type: ${type}. Valid types: ${Object.keys(chatApiMap).join(", ")}`);
  const { endpoint, responseType } = apiDef;
  const url = API_BASE + endpoint;

  if (type === "image23d" && file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(url, {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error("API error");
    const blob = await res.blob();
    const fileUrl = URL.createObjectURL(blob);
    return { role: "assistant", content: { url: fileUrl, type: blob.type } };
  }

  const body = { prompt: msg };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("API error");

  if (responseType === "json") {
    const data = await res.json();
    return { role: "assistant", content: data.response };
  } else {
    const blob = await res.blob();
    const fileUrl = URL.createObjectURL(blob);
    return { role: "assistant", content: { url: fileUrl, type: blob.type } };
  }
}
