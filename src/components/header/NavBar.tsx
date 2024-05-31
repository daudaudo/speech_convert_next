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
		{ path: PagePath.history, label: t("history") },
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
			case PagePath.history:
				isActive = isHistoryPage(pathname);
			default:
				break;
		}

		return (
			<Link
				href={path}
				key={path}
				className={`text-sm/6 flex items-center gap-1 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-primary-600 dark:after:bg-white after:transition-opacity ${isActive ? "text-primary-600 dark:text-white after:opacity-100" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
			>
				{label}
			</Link>
		);
	};

	return (
		<nav className="items-center ring-1 ring-gray-200 dark:ring-gray-800 gap-x-0 rounded-full bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-transform duration-200 hidden lg:flex px-4">
			{navItems.map(renderNavItem)}
		</nav>
	);
};

export default NavBar;
