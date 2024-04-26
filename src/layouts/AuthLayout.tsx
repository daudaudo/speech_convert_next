import Link from "next/link";
import React from "react";
import { PagePath } from "~/enums/path";

interface Props {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
	return (
		<div className="w-full">
			<header className="flex justify-between h-16">
				<Link
					href={PagePath.home}
					className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 px-3 py-2 text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 flex items-center flex-row absolute top-5 left-10"
				>
					{/* <SCIcon name="arrow-left" /> */}
					<span className=" font-semibold text-gray-800">Quay về trang chủ</span>
				</Link>
				<div />
			</header>
			<div className="h-screen flex pt-20 justify-center overlay w-full">{children}</div>
		</div>
	);
};

export default AuthLayout;
