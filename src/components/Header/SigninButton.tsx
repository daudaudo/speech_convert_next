import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { PagePath } from "~/enums/path";

const SigninButton = () => {
	return (
		<Link
			href={PagePath.signin}
			className="h-8 bg-primary-600 focus:ring-4 focus:ring-primary-300 rounded-lg dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-primary-700 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium text-sm gap-x-2 px-3 py-2 text-gray-100 dark:text-gray-900 underline-offset-4 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 flex items-center flex-row"
		>
			<span className="flex items-center gap-1">
				Đăng nhập
				<ArrowRightIcon className="h-4 w-4" />
			</span>
		</Link>
	);
};

export default SigninButton;
