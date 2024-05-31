"use client";

import React from "react";
import { ChatBubbleLeftRightIcon, DocumentIcon, LanguageIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { PagePath } from "~/enums/path";
import { SpeechConvertIcon } from "~/types/icon";

const CTSNavbar = () => {
	const t = useTranslations("cts");
	const pathname = usePathname();

	const navItems = [
		{ path: PagePath.textToSpeech, label: t("text"), icon: LanguageIcon },
		{ path: PagePath.documentToSpeech, label: t("document"), icon: DocumentIcon },
		{ path: PagePath.conversationToSpeech, label: t("conversation"), icon: ChatBubbleLeftRightIcon },
	];

	const renderNavItem = (item: { path: string; label: string; icon: SpeechConvertIcon }) => {
		const isActive = pathname === item.path;
		const Icon = item.icon;
		return (
			<li key={item.path} className="min-w-0">
				<Link href={item.path} key={item.path}>
					<div
						className={`w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75 ${isActive ? "text-gray-900 dark:text-white rounded-full" : "hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400 !hover:text-gray-600 !dark:hover:text-white"}`}
					>
						<Icon className="h-6 w-6 md:h-6 md:w-4" title={item.label} />
						<span className=" hidden md:block">{item.label}</span>
					</div>
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

export default CTSNavbar;
