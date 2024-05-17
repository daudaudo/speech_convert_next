import React from "react";
import type { Metadata } from "next";
import "~/styles/global.scss";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "~/contexts/ThemeContext";

export const metadata: Metadata = {
	title: "Speech Convert",
	description: "Speech Convert App",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<ThemeProvider>
			<html lang="vi">
				<head>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="manifest" href="/site.webmanifest" />
				</head>
				<body className="bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
					<div className="h-screen md:max-w-screen-xl mx-auto">{children}</div>
				</body>
				<GoogleAnalytics gaId="G-NW2E273HT2" />
			</html>
		</ThemeProvider>
	);
};

export default RootLayout;
