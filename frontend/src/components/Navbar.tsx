"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {Menu, Bot, Image, Package, FileAudio2, Video, FileText, Settings } from 'lucide-react';

const useCases = [
  { label: "Text to 2D", icon: <Image className="w-5 h-5" /> },
  { label: "Image to 3D", icon: <Package className="w-5 h-5" /> },
  { label: "Text to 3D", icon: <Package className="w-5 h-5" /> },
  { label: "Text to Speech", icon: <FileAudio2 className="w-5 h-5" /> },
  { label: "Text to Audio", icon: <FileAudio2 className="w-5 h-5" /> },
  { label: "Text to Video", icon: <Video className="w-5 h-5" /> },
  { label: "Coder", icon: <FileText className="w-5 h-5" /> }
];

export default function Navbar({ onSelect, onSidebarToggle }: { onSelect?: (usecase: string) => void, onSidebarToggle?: () => void }) {
  const [active, setActive] = useState<string>(useCases[0].label);

  return (
	<motion.nav
	  initial={{ y: -60, opacity: 0 }}
	  animate={{ y: 0, opacity: 1 }}
	  transition={{ type: "spring", stiffness: 70, damping: 10 }}
	  className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-950 to-gray-900 shadow-lg z-50"
	>
	  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
		<div className="flex items-center space-x-2">
		  <button
			className="mr-3 p-1 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
			onClick={onSidebarToggle}
			title="Toggle Sidebar"
		  >
			<Menu className="w-6 h-6 text-blue-400" />
		  </button>
		  <Bot className="w-7 h-7 text-blue-500 drop-shadow-md animate-spin-slow" />
		  <span className="text-xl font-extrabold text-white tracking-wide select-none">
			Elythar LLM Studio
		  </span>
		</div>
        <div className="flex space-x-1">
          {useCases.map((usecase) => (
            <button
              key={usecase.label}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all 
                ${active === usecase.label
                  ? "bg-blue-700/90 text-white shadow-md scale-105"
                  : "bg-gray-800/70 text-gray-200 hover:bg-blue-900 hover:text-white"}
              `}
              onClick={() => {
                setActive(usecase.label);
                onSelect && onSelect(usecase.label);
              }}
            >
              {usecase.icon}
              <span className="font-semibold">{usecase.label}</span>
            </button>
          ))}
        </div>
        <Settings className="w-6 h-6 text-gray-400 hover:text-white transition cursor-pointer" />
      </div>
    </motion.nav>
  );
}
