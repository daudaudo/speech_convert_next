"use client";

import React from "react";
import { ChatBubbleLeftRightIcon, DocumentIcon, LanguageIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PagePath } from "~/enums/path";

const ConvertToSpeechNavbar = () => {
	const pathname = usePathname();

	const navItems = [
		{ path: PagePath.textToSpeech, label: "Văn bản nhập vào", icon: <LanguageIcon className="h-4 w-4" /> },
		{ path: PagePath.documentToSpeech, label: "Tài liệu", icon: <DocumentIcon className="h-4 w-4" /> },
		{ path: PagePath.conversationToSpeech, label: "Hội thoại", icon: <ChatBubbleLeftRightIcon className="h-4 w-4" /> },
	];

	const renderNavItem = (item: { path: string; label: string; icon: React.JSX.Element }) => {
		const isActive = pathname === item.path;

		return (
			<li className="min-w-0">
				<Link
					href={item.path}
					key={item.path}
					className={`relative w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75 ${isActive ? "text-gray-900 dark:text-white rounded-full" : "hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400 !hover:text-gray-600 !dark:hover:text-white"}`}
				>
					{item.icon}
					{item.label}
				</Link>
			</li>
		);
	};

	return (
		<nav className="relative w-full flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-2">
			<ul className="flex items-center min-w-0">{navItems.map(renderNavItem)}</ul>
		</nav>
	);
};

export default ConvertToSpeechNavbar;
