"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Don't render admin sidebar on the login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-neutral-950 text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col lg:flex-row font-sans">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-neutral-950 text-white border-b border-neutral-800">
          <span className="font-extrabold tracking-tight text-base">
            ZUNO<span className="text-neutral-400 font-mono text-xs ml-1">ADMIN</span>
          </span>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 text-neutral-400 hover:text-white"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

