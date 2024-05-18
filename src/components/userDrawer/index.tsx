"use client";

import { UserCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Button, Drawer, IconButton } from "@material-tailwind/react";
import React from "react";
import { useAuth } from "~/contexts/AuthContext";

const UserDrawer = () => {
	const { user, showedUser, toggleShowedUser, signout } = useAuth();

	if (!user) return null;
	const { email } = user;

	return (
		<Drawer
			placement="right"
			open={!!showedUser}
			onClose={toggleShowedUser}
			size={500}
			overlayProps={{ className: "backdrop-blur-none" }}
			className="p-4 bg-white dark:bg-gray-900 rounded-l-sm"
		>
			<div className="relative w-full h-full flex flex-col items-center gap-2">
				<div className="absolute top-1 right-1">
					<IconButton
						variant="text"
						onClick={toggleShowedUser}
						className="p-0 rounded-full text-gray-800 dark:text-gray-200"
					>
						<XCircleIcon className="h-6 w-6" />
					</IconButton>
				</div>
				<div className="p-0 rounded-full text-primary-200 dark:text-primary-800">
					<UserCircleIcon className="h-24 w-24" />
				</div>
				{email && <div className="text-sm text-gray-800 dark:text-gray-200">{email}</div>}
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
			</div>
		</Drawer>
	);
};

export default UserDrawer;
