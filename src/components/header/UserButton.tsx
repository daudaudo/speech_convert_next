"use client";

import React from "react";
import Link from "next/link";
import { Button, IconButton, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import { PagePath } from "~/enums/path";
import { useAuth } from "~/contexts/auth/AuthContext";
import SvgIcon from "~/components/icon/SvgIcon";

const UserButton = () => {
	const t = useTranslations("header");
	const { user, signout } = useAuth();

	return (
		<div className="w-10 h-10">
			{!!user && (
				<Popover placement="bottom">
					<PopoverHandler>
						<div className="w-full h-full bg-primary-200 dark:bg-primary-800 p-0 rounded-full text-gray-800 dark:text-gray-200 flex justify-center items-center">
							<SvgIcon name="circle-user" type="solid" width={24} height={24} />
						</div>
					</PopoverHandler>
					<PopoverContent className="z-50 bg-gray-100 dark:bg-gray-800 border-none flex flex-col items-center gap-2">
						<div className="p-0 rounded-full text-primary-200 dark:text-primary-800">
							<SvgIcon name="circle-user" type="solid" width={96} height={96} />
						</div>
						{user?.email && <div className="text-sm text-gray-800 dark:text-gray-200">{user.email}</div>}
						<div className="w-full flex-1 flex flex-col">
							<div className="flex-1" />
							<Button
								variant="outlined"
								onClick={signout}
								size="lg"
								className="w-full p-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200"
							>
								{t("signout")}
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			)}
			<Link href={PagePath.signin} aria-label={PagePath.signin} className={`${!!user ? "hidden" : "block"}`}>
				<IconButton
					variant="text"
					aria-label="Navigate login"
					className="bg-primary-200 dark:bg-primary-800 p-0 rounded-full text-gray-800 dark:text-gray-200"
				>
					<SvgIcon type="outline" name="arrow-right-to-bracket" width={16} height={16} />
				</IconButton>
			</Link>
		</div>
	);
};

export default UserButton;
