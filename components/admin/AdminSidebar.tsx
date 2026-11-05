"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  PlusCircle,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "All Posts",
      href: "/admin/posts",
      icon: FileText,
      exact: false,
    },
    {
      name: "New Post",
      href: "/admin/posts/new",
      icon: PlusCircle,
      exact: true,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: FolderTree,
      exact: true,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-neutral-950 text-white w-64 border-r border-neutral-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">
            ZUNO<span className="text-xs uppercase font-mono tracking-widest text-neutral-400 ml-1.5 px-1.5 py-0.5 bg-neutral-800 rounded">CMS</span>
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-neutral-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-3 mb-2">
          Management
        </div>

        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs uppercase font-mono tracking-wider transition-colors ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <div className="pt-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-3 mb-2">
            Live Preview
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Visit Blog
            </span>
            <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">
              New Tab
            </span>
          </Link>
        </div>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-neutral-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs uppercase font-mono tracking-wider text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}

