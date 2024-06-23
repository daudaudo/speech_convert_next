"use client";

import React, { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import withSuspense from "~/hocs/withSuspense";
import { PagePath } from "~/enums/path";
import { NavbarItem } from "~/types/navbar";
import SvgIcon from "~/components/icon/SvgIcon";

const NavBar = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const t = useTranslations("history");

	const navItems: NavbarItem[] = [
		{ path: PagePath.speechHistory, label: t("convertToSpeech"), iconName: "volume-high" },
		{ path: PagePath.textHistory, label: t("convertToText"), iconName: "text" },
		{ path: PagePath.conversationHistory, label: t("convertToConversation"), iconName: "messages" },
	];

	const renderNavItem = useCallback(
		(item: NavbarItem) => {
			const { path, label, iconName } = item;
			const isActive = pathname === path;
			return (
				<li key={item.path} className="min-w-0">
					<Link
						href={path}
						key={path}
						className={`w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75 ${isActive ? "text-gray-900 dark:text-white rounded-full" : "hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400 !hover:text-gray-600 !dark:hover:text-white"}`}
					>
						{iconName && <SvgIcon name={iconName} type="solid" width={16} height={16} />}
						<span>{label}</span>
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
