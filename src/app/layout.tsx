import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Speech Convert",
	description: "Speech Convert App",
};

interface Props {
	children?: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
};

export default RootLayout;
