"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Menu, User, Settings, LayoutDashboard } from "lucide-react";

export default function DashSidebar() {
    const [open, setOpen] = useState(true);

    const toggleSidebar = () => setOpen(!open);

    return (
        // Sidebar
        <aside
            className={`bg-gray-900 text-gray-100 h-screen p-4 flex flex-col transition-all duration-300 ${open ? "w-64" : "w-16"
                }`}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="text-gray-100 mb-6 focus:outline-none self-end"
            >
                <Menu size={20} />
            </button>

            {/* Menu */}
            <nav className="flex flex-col gap-4">
                <MenuItem href="/dashboard" icon={<LayoutDashboard size={25} />} label="Panoramica" open={open} />
                <MenuItem href="/dashboard/appuntamenti" icon={<Calendar size={25} />} label="Appuntamenti" open={open} />
                <MenuItem href="/dashboard/clienti" icon={<User size={25} />} label="Clienti" open={open} />
                <MenuItem href="/dashboard/impostazioni" icon={<Settings size={25} />} label="Impostazioni" open={open} />
            </nav>
        </aside>
    );
}

interface MenuItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    open: boolean;
}

function MenuItem({ href, icon, label, open }: MenuItemProps) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors`}
        >
            <div>{icon}</div>
            {open && <span>{label}</span>}
        </Link>
    );
}
