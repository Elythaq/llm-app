"use client";

import './globals.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const projects = ["Demo Project"];
  const chats = ["Chat 1", "Chat 2"];

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Navbar onSidebarToggle={() => setSidebarOpen((prev) => !prev)} />
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          projects={projects}
          chats={chats}
          currentProject={projects[0]}
        />
        <div
          className="pt-20 transition-all duration-300"
          style={{
            marginLeft: sidebarOpen ? 340 : 0,
            transitionProperty: "margin-left"
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
