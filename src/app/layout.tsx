import React from "react";
import type { Metadata } from "next";
import "~/styles/global.scss";
import { ThemeProvider } from "~/contexts/ThemeContext";

export const metadata: Metadata = {
	title: "Speech Convert",
	description: "Speech Convert App",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<ThemeProvider>
			<html lang="vi">
				<body className="bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
					<div className="h-screen md:max-w-screen-xl mx-auto">{children}</div>
				</body>
			</html>
		</ThemeProvider>
	);
};

export default RootLayout;
