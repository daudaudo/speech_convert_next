import React from "react";
import Header from "~/components/header";
import UserDrawer from "~/components/userDrawer";

interface Props {
	children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
	return (
		<div className="h-full w-full">
			<div className="flex flex-col h-full w-full md:max-w-screen-xl">
				<div className="shrink-0 ">
					<Header />
				</div>
				<div className="flex-1">{children}</div>
				<div className="footer shrink-0 p-4 h-5" />
			</div>
			<UserDrawer />
		</div>
	);
};

export default UserLayout;
