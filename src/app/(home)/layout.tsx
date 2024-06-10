import React from "react";
import Footer from "~/components/footer";
import Header from "~/components/header";

interface Props {
	children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
	return (
		<div className="min-h-screen w-screen flex flex-col">
			<div className="sticky top-0 w-full h-16 bg-gray-100 dark:bg-gray-800 z-50 border-b-[1px] border-gray-300 dark:border-gray-700">
				<header className="w-full md:max-w-screen-xl mx-auto px-2 md:px-0">
					<Header />
				</header>
			</div>
			<div className="flex-1 w-full md:max-w-screen-xl mx-auto py-1">{children}</div>
			<footer className="w-full bg-gray-100 dark:bg-gray-800 border-t-[1px] border-gray-300 dark:border-gray-700">
				<Footer />
			</footer>
		</div>
	);
};

export default UserLayout;
