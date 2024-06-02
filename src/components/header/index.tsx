"use client";

import React from "react";
import dynamic from "next/dynamic";
import UserButton from "~/components/header/UserButton";
import DocSearch from "~/components/header/DocSearch";
import Logo from "~/components/header/Logo";
import NavBar from "~/components/header/NavBar";
import LanguageSwitch from "~/components/header/LanguageSwitch";
const DarkModeButton = dynamic(() => import("~/components/header/DarkModeButton"), { ssr: false });

const Header = () => {
	return (
		<header className="border-b -mb-px sticky top-0 lg:!border-transparent dark:bg-slate-950/95 z-30 w-full bg-background/60 border-gray-200 dark:border-gray-800">
			<div className="w-full inline-flex items-center gap-3 h-16">
				<div className="flex flex-1 flex-row items-center">
					<Logo />
				</div>
				<div className="flex justify-center items-center">
					<NavBar />
				</div>
				<div className="flex flex-1 flex-row items-center gap-2 justify-end">
					<div className="hidden md:block">
						<DarkModeButton />
					</div>
					<LanguageSwitch />
					<UserButton />
					<DocSearch />
				</div>
			</div>
		</header>
	);
};

export default Header;
