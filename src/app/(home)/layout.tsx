import React from "react";
import Header from "@sc-components/Header";

interface Props {
	children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
	return (
		<div className="h-screen w-screen">
			<div className="flex flex-col h-full w-full md:max-w-screen-xl">
				<div className="shrink-0 ">
					<Header />
				</div>
				<div className="flex-1">{children}</div>
				<div className="footer shrink-0 p-4 h-5" />
			</div>
		</div>
	);
};

export default UserLayout;
