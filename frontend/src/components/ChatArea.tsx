"use client";
import { useRef, useEffect } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatArea({
  messages,
}: {
  messages: ChatMessage[];
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-2 overflow-y-auto pt-6 pb-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`my-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`rounded-xl px-4 py-2 max-w-[70%] shadow ${
              msg.role === "user"
                ? "bg-blue-700/80 text-white"
                : "bg-gray-800 text-gray-100"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
