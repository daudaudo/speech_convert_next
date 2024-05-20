"use client";

import React from "react";
import dynamic from "next/dynamic";
import Logo from "./Logo";
import UserButton from "./UserButton";
import NavBar from "./NavBar";
import DocSearch from "./DocSearch";
const DarkModeButton = dynamic(() => import("./DarkModeButton"), { ssr: false });

const Header = () => {
	return (
		<header className="border-b -mb-px sticky top-0 lg:!border-transparent dark:bg-slate-950/95 z-30 w-full bg-background/60 border-gray-200 dark:border-gray-800">
			<div className="px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center gap-3 h-16">
				<div className="flex flex-1 flex-row items-center gap-1">
					<DocSearch />
					<Logo />
				</div>
				<div className="flex justify-center items-center">
					<NavBar />
				</div>
				<div className="flex flex-1 flex-row items-center gap-1 justify-end">
					<DarkModeButton />
					<UserButton />
				</div>
			</div>
		</header>
	);
};

export default Header;
