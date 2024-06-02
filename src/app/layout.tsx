import React from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "~/contexts/ThemeContext";
import AuthWrapper from "~/contexts/auth/AuthWrapper";
import ToastWrapper from "~/contexts/toast/ToastWrapper";
import "~/styles/global.scss";
import LanguageWrapper from "~/contexts/language/LanguageWrapper";

const inter = Open_Sans({
	subsets: ["latin", "vietnamese", "latin-ext"],
	display: "auto",
});

export const metadata: Metadata = {
	title: "Speech Convert",
	description: "Speech Convert App",
};

const RootLayout = async ({ children }: React.PropsWithChildren) => {
	return (
		<ThemeProvider>
			<AuthWrapper>
				<html className={inter.className}>
					<head>
						<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
						<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
						<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
						<link rel="manifest" href="/site.webmanifest" />
					</head>
					<body className="bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
						<LanguageWrapper>
							<ToastWrapper>{children}</ToastWrapper>
						</LanguageWrapper>
					</body>
					{process.env.NODE_ENV === "production" && <GoogleAnalytics gaId="G-NW2E273HT2" />}
				</html>
			</AuthWrapper>
		</ThemeProvider>
	);
};

export default RootLayout;
