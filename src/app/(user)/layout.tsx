import React from "react";
import Header from "@sc-components/Header";

interface Props {
	children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<div className="flex-1 flex pt-4 justify-center overlay w-full">{children}</div>
		</>
	);
};

export default UserLayout;
