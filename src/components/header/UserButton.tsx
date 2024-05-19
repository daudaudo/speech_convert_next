"use client";

import React from "react";
import Link from "next/link";
import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Button, IconButton, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { PagePath } from "~/enums/path";
import { useAuth } from "~/contexts/AuthContext";
import SvgIcon from "~/components/icon/SvgIcon";

const UserButton = () => {
	const { pending, authencated, user, signout } = useAuth();

	return (
		<div className="w-10 h-10">
			<div className={`${pending ? "block" : "hidden"} p-0 rounded-full text-gray-800 dark:text-gray-200`}>
				<ArrowPathIcon className="h-8 w-8 animate-spin" />
			</div>
			{authencated && (
				<Popover placement="bottom" animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0, y: 25 } }}>
					<PopoverHandler>
						<div className="w-full h-full bg-primary-200 dark:bg-primary-800 p-0 rounded-full text-gray-800 dark:text-gray-200 flex justify-center items-center">
							<UserCircleIcon className="h-6 w-6" />
						</div>
					</PopoverHandler>
					<PopoverContent className="bg-gray-100 dark:bg-gray-800 border-none flex flex-col items-center gap-2">
						<div className="p-0 rounded-full text-primary-200 dark:text-primary-800">
							<UserCircleIcon className="h-24 w-24" />
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
								Đăng xuất
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			)}
			<Link href={PagePath.signin} className={`${authencated || pending ? "hidden" : "block"}`}>
				<IconButton
					variant="text"
					className="bg-primary-200 dark:bg-primary-800 p-0 rounded-full text-gray-800 dark:text-gray-200"
				>
					<SvgIcon type="outline" name="arrow-right-to-bracket" width={16} height={16} />
				</IconButton>
			</Link>
		</div>
	);
};

export default UserButton;
