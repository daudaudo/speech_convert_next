import React from "react";
import type { Metadata } from "next";
import "~/styles/global.scss";

export const metadata: Metadata = {
	title: "Speech Convert",
	description: "Speech Convert App",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<html lang="en">
			<body>
				<div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900">{children}</div>
			</body>
		</html>
	);
};

export default RootLayout;
