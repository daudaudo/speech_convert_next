import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PagePath } from "~/enums/path";

const NavBar = () => {
	const pathname = usePathname();

	const navItems = [
		{ path: PagePath.textToSpeech, label: "Âm thanh" },
		{ path: PagePath.speechToText, label: "Văn bản" },
		{ path: PagePath.history, label: "Lịch sử" },
	];

	const renderNavItem = (item: { path: string; label: string }) => {
		const isActive = pathname === item.path;

		return (
			<Link
				href={item.path}
				key={item.path}
				className={`text-sm/6 flex items-center gap-1 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-primary-600 dark:after:bg-white after:transition-opacity ${isActive ? "text-primary-600 dark:text-white after:opacity-100" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
			>
				{item.label}
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
