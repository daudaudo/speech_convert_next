import React from "react";
import type { Metadata } from "next";
import { AuthProvider } from "~/contexts/authContext";
import "~/styles/global.scss";

export const metadata: Metadata = {
	title: "Speech Convert",
	description: "Speech Convert App",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<AuthProvider>
			<html lang="en">
				<body>{children}</body>
			</html>
		</AuthProvider>
	);
};

export default RootLayout;
