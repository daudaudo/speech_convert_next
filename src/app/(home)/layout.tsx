import React from "react";
import Header from "@sc-components/Header";

interface Props {
	children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
	return (
		<div className="flex flex-col h-screen w-screen">
			<div className="shrink-0">
				<Header />
			</div>
			<div className="flex-1 w-full md:max-w-screen-xl">{children}</div>
			<div className="footer p-4 h-5" />
		</div>
	);
};

export default UserLayout;
