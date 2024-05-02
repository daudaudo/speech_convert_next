"use client";

import React from "react";
import Logo from "@sc-components/utils/Logo";
import SigninButton from "@sc-components/utils/SigninButton";
import NavBar from "@sc-components/utils/NavBar";

const Header = () => {
	return (
		<header className="flex h-16 w-full items-center p-4">
			<Logo />
			<div className="flex flex-1 justify-center items-center">
				<NavBar />
			</div>
			<SigninButton />
		</header>
	);
};

export default Header;
