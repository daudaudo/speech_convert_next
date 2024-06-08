import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCTSPage, isCTTPage, isHistoryPage, PagePath } from "~/enums/path";

const NavBar = () => {
	const t = useTranslations("header");
	const pathname = usePathname();

	const navItems = [
		{ path: PagePath.textToSpeech, label: t("speech") },
		{ path: PagePath.speechToText, label: t("text") },
		{ path: PagePath.speechHistory, label: t("history") },
	];

	const renderNavItem = (item: { path: string; label: string }) => {
		const { path, label } = item;
		let isActive = false;
		switch (path) {
			case PagePath.textToSpeech:
				isActive = isCTSPage(pathname);
				break;
			case PagePath.speechToText:
				isActive = isCTTPage(pathname);
				break;
			case PagePath.speechHistory:
				isActive = isHistoryPage(pathname);
			default:
				break;
		}

		return (
			<Link
				href={path}
				key={path}
				className={`flex items-center py-2 px-4 font-medium transition-colors border-b-2 ${isActive ? "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400" : "text-gray-500 hover:text-gray-700 border-transparent dark:text-gray-400 dark:hover:text-gray-200"}`}
			>
				{label}
			</Link>
		);
	};

	return (
		<nav className="items-center dark:ring-gray-800 gap-x-0 rounded-full transition-transform duration-200 hidden lg:flex px-4">
			{navItems.map(renderNavItem)}
		</nav>
	);
};

export default NavBar;
