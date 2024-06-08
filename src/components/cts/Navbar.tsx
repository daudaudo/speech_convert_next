"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { PagePath } from "~/enums/path";
import SvgIcon from "~/components/icon/SvgIcon";
import { NavbarItem } from "~/types/navbar";

const Navbar = () => {
	const t = useTranslations("cts");
	const pathname = usePathname();

	const navItems: NavbarItem[] = [
		{ path: PagePath.textToSpeech, label: t("text"), iconName: "text" },
		{ path: PagePath.documentToSpeech, label: t("document"), iconName: "file" },
		{
			path: PagePath.conversationToSpeech,
			label: t("conversation"),
			iconName: "messages",
		},
	];

	const renderNavItem = (item: NavbarItem) => {
		const { path, label, iconName } = item;
		const isActive = pathname === path;
		return (
			<li key={path} className="min-w-0">
				<Link href={path} key={path}>
					<div
						className={`w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75 ${isActive ? "text-gray-900 dark:text-white rounded-full" : "hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400 !hover:text-gray-600 !dark:hover:text-white"}`}
					>
						{iconName && <SvgIcon name={iconName} type="outline" width={20} height={20} />}
						<span className="">{label}</span>
					</div>
				</Link>
			</li>
		);
	};

	return <ul className="flex items-center min-w-0">{navItems.map(renderNavItem)}</ul>;
};

export default Navbar;
