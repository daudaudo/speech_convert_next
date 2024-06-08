"use client";

import React, { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import withSuspense from "~/hocs/withSuspense";
import { PagePath } from "~/enums/path";

const NavBar = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const t = useTranslations("history");

	const navItems = [
		{ path: PagePath.speechHistory, label: t("convertToSpeech") },
		{ path: PagePath.textHistory, label: t("convertToText") },
		{ path: PagePath.conversationHistory, label: t("convertToConversation") },
	];

	const renderNavItem = useCallback(
		(item: { path: string; label: string }) => {
			const { path, label } = item;
			const isActive = pathname === path;
			return (
				<li key={item.path} className="min-w-0">
					<Link
						href={path}
						key={path}
						className={`w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75 ${isActive ? "text-gray-900 dark:text-white rounded-full" : "hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400 !hover:text-gray-600 !dark:hover:text-white"}`}
					>
						<span className="hidden md:block">{label}</span>
					</Link>
				</li>
			);
		},
		[searchParams],
	);

	return (
		<div className="w-full px-4 border-b-2">
			<div className="relative w-full flex items-center justify-between py-2">
				<ul className="flex items-center min-w-0">{navItems.map(renderNavItem)}</ul>
			</div>
		</div>
	);
};

const HistoryNavBar = withSuspense(NavBar);

export default HistoryNavBar;
