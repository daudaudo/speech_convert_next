"use client";

import React from "react";
import Logo from "./Logo";
import SigninButton from "./SigninButton";
import NavBar from "./NavBar";
import DocSearch from "./DocSearch";

const Header = () => {
	return (
		<header className="border-b -mb-px sticky top-0 lg:!border-transparent dark:bg-slate-950/95 z-30 w-full bg-background/60 backdrop-blur border-gray-200 dark:border-gray-800">
			<div className="px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center gap-3 h-16">
				<DocSearch />
				<Logo />
				<div className="flex flex-1 justify-center items-center">
					<NavBar />
				</div>
				<SigninButton />
			</div>
		</header>
	);
};

export default Header;
