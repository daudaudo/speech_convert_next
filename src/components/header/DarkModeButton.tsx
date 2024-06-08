"use client";

import React from "react";
import { IconButton } from "@material-tailwind/react";
import { useTheme } from "~/contexts/ThemeContext";
import SvgIcon from "../icon/SvgIcon";

const DarkModeButton = () => {
	const { themeMode, toggleDarkMode } = useTheme();

	return (
		<IconButton onClick={toggleDarkMode} variant="text" className="p-0 rounded-full text-gray-800 dark:text-gray-200">
			{themeMode === "dark" ? (
				<SvgIcon name="moon" type="solid" width={20} height={20} />
			) : (
				<SvgIcon name="sun" type="solid" width={20} height={20} />
			)}
		</IconButton>
	);
};

export default DarkModeButton;
