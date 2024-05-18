"use client";

import React from "react";
import { IconButton } from "@material-tailwind/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "~/contexts/ThemeContext";

const DarkModeButton = () => {
	const { themeMode, toggleDarkMode } = useTheme();

	return (
		<IconButton onClick={toggleDarkMode} variant="text" className="p-0 rounded-full text-gray-800 dark:text-gray-200">
			{themeMode === "dark" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
		</IconButton>
	);
};

export default DarkModeButton;
