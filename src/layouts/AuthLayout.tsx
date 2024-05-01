import Link from "next/link";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { PagePath } from "~/enums/path";

interface Props {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
	return (
		<>
			<header className="flex justify-between h-16">
				<Link
					href={PagePath.home}
					className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 px-3 py-2 text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 flex items-center flex-row absolute top-5 left-10"
				>
					<span className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
						<ArrowLeftIcon className="h-4 w-4" />
						Quay về trang chủ
					</span>
				</Link>
				<div />
			</header>
			<div className="flex pt-4 justify-center overlay w-full">{children}</div>
		</>
	);
};

export default AuthLayout;
