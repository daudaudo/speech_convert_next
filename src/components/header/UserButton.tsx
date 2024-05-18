"use client";

import React from "react";
import Link from "next/link";
import { ArrowPathIcon, PowerIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { PagePath } from "~/enums/path";
import { useAuth } from "~/contexts/AuthContext";

const UserButton = () => {
	const { pending, authencated, toggleShowedUser } = useAuth();

	return (
		<>
			{authencated || pending ? (
				<IconButton
					variant="text"
					onClick={toggleShowedUser}
					className={`${pending ? "" : "bg-primary-200 dark:bg-primary-800"} p-0 rounded-full text-gray-800 dark:text-gray-200`}
				>
					{pending ? <ArrowPathIcon className="h-8 w-8 animate-spin" /> : <UserCircleIcon className="h-6 w-6" />}
				</IconButton>
			) : (
				<Link href={PagePath.signin}>
					<IconButton
						variant="text"
						className="bg-primary-200 dark:bg-primary-800 p-0 rounded-full text-gray-800 dark:text-gray-200"
					>
						<PowerIcon className="h-4 w-4" />
					</IconButton>
				</Link>
			)}
		</>
	);
};

export default UserButton;
