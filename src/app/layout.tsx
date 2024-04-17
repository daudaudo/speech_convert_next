import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/global.scss";
import { ThemeProvider } from "~/contexts/themeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Speech Convert",
	description: "Speech Convert App",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
