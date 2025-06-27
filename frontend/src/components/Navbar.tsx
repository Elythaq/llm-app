"use client";

import { motion } from 'framer-motion';
import { Menu, Bot, Image, Package, FileAudio2, Video, FileText, Settings } from 'lucide-react';

const useCases = [
  { key: "text2d", label: "Text to 2D", icon: <Image className="w-5 h-5" /> },
  { key: "image23d", label: "Image to 3D", icon: <Package className="w-5 h-5" /> },
  { key: "text23d", label: "Text to 3D", icon: <Package className="w-5 h-5" /> },
  { key: "text2speech", label: "Text to Speech", icon: <FileAudio2 className="w-5 h-5" /> },
  { key: "text2audio", label: "Text to Audio", icon: <FileAudio2 className="w-5 h-5" /> },
  { key: "text2video", label: "Text to Video", icon: <Video className="w-5 h-5" /> },
  { key: "coder", label: "Coder", icon: <FileText className="w-5 h-5" /> }
];

export default function Navbar({
  onSelect,
  onSidebarToggle,
  activeUseCase = "text2d",
}: {
  onSelect?: (usecase: string) => void,
  onSidebarToggle?: () => void,
  activeUseCase?: string,
}) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 10 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-900/70 via-blue-950/80 to-indigo-900/70 backdrop-blur-md border-b border-cyan-400 animate-borderGlow shadow-xl z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <button
            className="mr-3 p-1 rounded hover:bg-blue-800/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onClick={onSidebarToggle}
            title="Toggle Sidebar"
          >
            <Menu className="w-6 h-6 text-cyan-300" />
          </button>
          <Bot className="w-7 h-7 text-cyan-400 drop-shadow-md animate-spin-slow" />
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 text-transparent bg-clip-text tracking-wide select-none">
            Elythar LLM Studio
          </span>
        </div>
        <div className="flex space-x-1">
          {useCases.map((usecase) => (
            <button
              key={usecase.key}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all border border-transparent hover:border-cyan-300
                ${activeUseCase === usecase.key
                  ? "bg-cyan-700/80 text-white shadow-lg scale-105 border-cyan-400 animate-borderFire"
                  : "bg-blue-800/50 text-cyan-100 hover:bg-cyan-800/60 hover:text-white"}
              `}
              onClick={() => onSelect && onSelect(usecase.key)}
            >
              {usecase.icon}
              <span className="font-semibold">{usecase.label}</span>
            </button>
          ))}
        </div>
        <Settings className="w-6 h-6 text-cyan-300 hover:text-white transition cursor-pointer" />
      </div>
    </motion.nav>
  );
}
