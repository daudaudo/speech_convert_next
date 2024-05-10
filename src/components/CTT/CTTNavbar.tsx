"use client";

import React from "react";
import { DocumentIcon, LanguageIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PagePath } from "~/enums/path";

const CTTNavbar = () => {
	const pathname = usePathname();

	const navItems = [
		{ path: PagePath.speechToText, label: "Ghi âm", icon: <MicrophoneIcon className="h-4 w-4" /> },
		{ path: PagePath.documentToText, label: "Tài liệu", icon: <DocumentIcon className="h-4 w-4" /> },
		{ path: PagePath.textToText, label: "Dịch thuật", icon: <LanguageIcon className="h-4 w-4" /> },
	];

	const renderNavItem = (item: { path: string; label: string; icon: React.JSX.Element }) => {
		const isActive = pathname === item.path;

		return (
			<li key={item.path} className="min-w-0">
				<Link
					href={item.path}
					key={item.path}
					className={`w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75 ${isActive ? "text-gray-900 dark:text-white rounded-full" : "hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400 !hover:text-gray-600 !dark:hover:text-white"}`}
				>
					{item.icon}
					{item.label}
				</Link>
			</li>
		);
	};

	return (
		<nav className="relative w-full flex items-center justify-between px-2">
			<ul className="flex items-center min-w-0">{navItems.map(renderNavItem)}</ul>
		</nav>
	);
};

export default CTTNavbar;
