import React from "react";
import Header from "~/components/header";

interface Props {
	children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
	return (
		<div className="h-screen flex flex-col">
			<div className="flex flex-col flex-1">
				<div className="sticky top-0 w-full h-16 bg-gray-100 dark:bg-gray-800 z-50 border-b-[1px] border-gray-300 dark:border-gray-700">
					<div className="w-full md:max-w-screen-xl mx-auto px-2 md:px-0">
						<Header />
					</div>
				</div>
				<div className="flex-1 w-full md:max-w-screen-xl mx-auto py-1">{children}</div>
				<div className="footer shrink-0 p-4 h-5" />
			</div>
		</div>
	);
};

export default UserLayout;
