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
			<body className="bg-gray-50 dark:bg-slate-950 overflow-x-hidden">
				<div className="h-screen md:max-w-screen-xl mx-auto">{children}</div>
			</body>
		</html>
	);
};

export default RootLayout;
