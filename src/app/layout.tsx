import React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "~/contexts/themeContext";
import { AuthProvider } from "~/contexts/authContext";
import NoSSR from "~/components/NoSSR";
import "~/styles/global.scss";

export const metadata: Metadata = {
	title: "Speech Convert",
	description: "Speech Convert App",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<NoSSR>
			<ThemeProvider>
				<AuthProvider>
					<html lang="en">
						<body>{children}</body>
					</html>
				</AuthProvider>
			</ThemeProvider>
		</NoSSR>
	);
};

export default RootLayout;
