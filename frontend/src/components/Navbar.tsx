"use client";
import { motion } from 'framer-motion';
import {
  Menu, Bot, Image, Package, FileAudio2, Video, FileText, Settings
} from 'lucide-react';

const useCases = [
  { key: "text2d", label: "Text to 2D", icon: <Image className="w-4 h-4" /> },
  { key: "image23d", label: "Image to 3D", icon: <Package className="w-4 h-4" /> },
  { key: "text2d3d", label: "Text to 3D", icon: <Package className="w-4 h-4" /> },
  { key: "text2text", label: "Text Generator", icon: <FileAudio2 className="w-4 h-4" /> },
  { key: "text2audio", label: "Text to Audio", icon: <FileAudio2 className="w-4 h-4" /> },
  { key: "text2video", label: "Text to Video", icon: <Video className="w-4 h-4" /> },
  { key: "coder", label: "Coder", icon: <FileText className="w-4 h-4" /> }
];

export default function Navbar({
  onSelect,
  onSidebarToggle,
  activeUseCase = "text2d",
  sidebarOpen = false, // default: collapsed
  sidebarWidth = 340,
  inChatContext = false,
}: {
  onSelect?: (usecase: string) => void,
  onSidebarToggle?: () => void,
  activeUseCase?: string,
  sidebarOpen?: boolean,
  sidebarWidth?: number,
}) {
  const navStyle: React.CSSProperties = sidebarOpen
    ? {
        marginLeft: sidebarWidth,
        width: `calc(100vw - ${sidebarWidth}px)`,
        transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1), width 0.3s cubic-bezier(.4,0,.2,1)'
      }
    : {
        marginLeft: 0,
        width: '100vw',
        transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1), width 0.3s cubic-bezier(.4,0,.2,1)'
      };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 10 }}
      className="glassy-navbar fixed top-0 left-0 w-full z-50"
      style={navStyle}
    >
      <div className="flex items-center justify-between w-full px-2 sm:px-6 py-2">
        <div className="flex items-center gap-2">
          <button
            className="mr-1 p-1 rounded hover:bg-blue-950/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onSidebarToggle}
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5 text-cyan-300" />
          </button>
          <img
			  src="/logo.svg"
			  alt="Your Logo"
			  className="w-8 h-8 object-contain drop-shadow"
			  style={{ borderRadius: "8px" }} // optional for rounded look
			/>

          <span className="font-semibold text-base md:text-lg tracking-tight bg-gradient-to-r from-sky-300 to-cyan-400 text-transparent bg-clip-text select-none">
            Elythar LLM Studio
          </span>
        </div>
        <div className="flex gap-1">
          {useCases.map((usecase) => (
            <button
              key={usecase.key}
              className={`nav-cyber-border ${activeUseCase === usecase.key ? "selected" : ""} 
                relative flex items-center gap-1 px-2 py-1 rounded-md text-[0.95rem] font-medium transition-colors
                ${activeUseCase === usecase.key
                  ? "bg-blue-900/60 text-cyan-200"
                  : "bg-transparent text-sky-100 hover:bg-blue-900/40"}
              `}
              style={{ minWidth: 0, minHeight: 0 }}
              onClick={() => onSelect && onSelect(usecase.key)}
            >
              {usecase.icon}
              <span className="hidden sm:inline">{usecase.label}</span>
            </button>
          ))}
        </div>
        <button
          className="p-1.5 rounded hover:bg-blue-900/30 transition"
          title="Settings"
        >
          <Settings className="w-5 h-5 text-cyan-300 hover:text-white transition" />
        </button>
      </div>
    </motion.nav>
  );
}
