import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { PagePath } from "~/enums/path";
const DarkModeButton = dynamic(() => import("~/components/header/DarkModeButton"), { ssr: false });

interface Props {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
	const t = useTranslations("auth");
	return (
		<div className="h-screen bg-gradient-primary">
			<div className="h-full md:max-w-screen-xl mx-auto">
				<header className="flex justify-between h-16 items-center">
					<Link
						href={PagePath.home}
						className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 px-3 py-2 text-gray-900 dark:text-gray-100  underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 flex items-center flex-row"
					>
						<span className="flex items-center gap-1">
							<ArrowLeftIcon className="h-4 w-4" />
							{t("backToHome")}
						</span>
					</Link>
					<DarkModeButton />
				</header>
				<div className="flex pt-4 justify-center overlay w-full">{children}</div>
			</div>
		</div>
	);
};

export default AuthLayout;
