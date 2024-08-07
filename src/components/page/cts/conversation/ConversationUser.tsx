"use client";

import React, { useState } from "react";
import { Button, IconButton, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import UserForm from "~/components/cts/UserForm";
import SvgIcon from "~/components/icon/SvgIcon";
import { OpenAIVoiceId } from "~/enums/openAi";
import type { CTSVoiceProvider, User } from "~/types/CTSTypes";
import { generateUniqueName } from "~/utils/conversation";
import { VoiceProvider } from "~/enums/voice";

interface UserProps {
	provider: CTSVoiceProvider;
	user: User;
	update: (user: User) => void;
	remove: (id: string) => void; // Changed to use `id` for consistency
}

const User = ({ provider, user, update, remove }: UserProps) => {
	const [open, setOpen] = useState<boolean>(false); // Start with the popover closed

	const updateUser = (newUser: User) => {
		update({ ...newUser, id: user.id });
	};

	const deleteUser = () => {
		remove(user.id);
	};

	return (
		<Popover open={open} handler={setOpen} placement="bottom-start">
			<PopoverHandler>
				<div className="relative group">
					<Button
						variant="text"
						className="h-10 flex flex-row items-center gap-2 border border-gray-500 px-4 py-2 rounded-full"
					>
						<span className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</span>
						{!open && (
							<div
								role="presentation"
								onClick={deleteUser}
								className="p-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 rounded-full inline-flex items-center justify-center bg-gray-300 dark:bg-gray-700"
							>
								<SvgIcon
									name="circle-x"
									type="outline"
									width={12}
									height={12}
									className="text-gray-700 dark:text-gray-300"
								/>
							</div>
						)}
					</Button>
				</div>
			</PopoverHandler>
			<PopoverContent className="z-50 bg-gray-200 dark:bg-gray-800 border-gray-100 dark:border-gray-900 flex flex-col items-center gap-2">
				<UserForm provider={provider} onSave={updateUser} initUser={user} />
			</PopoverContent>
		</Popover>
	);
};

interface Props {
	provider: CTSVoiceProvider;
	users: User[];
	add: (user: User) => void;
	update: (user: User) => void;
	remove: (id: string) => void;
	clear: () => void;
	maxUser?: number;
}

const ConversationUser = (props: Props) => {
	const { provider, users, add, update, remove, clear, maxUser } = props;

	const onClickAddUser = () => {
		add({
			id: uuidv4(),
			name: generateUniqueName(users),
			voice: provider === VoiceProvider.OPEN_AI ? OpenAIVoiceId.Alloy : "",
		});
	};

	return (
		<div className="w-full flex flex-row gap-2 dark:border-gray-700 px-2">
			<div className="flex-1 flex flex-wrap items-center gap-2">
				{users.map((user) => (
					<User key={user.id} provider={provider} user={user} update={update} remove={remove} />
				))}
				{(!maxUser || users.length < maxUser) && (
					<IconButton
						onClick={onClickAddUser}
						variant="outlined"
						className="rounded-full border-gray-600 dark:border-gray-400"
					>
						<SvgIcon
							name="user-plus"
							type="solid"
							width={24}
							height={24}
							className="text-gray-600 dark:text-gray-400"
						/>
					</IconButton>
				)}
			</div>
			<div className="flex flex-row gap-2">
				<IconButton variant="text" onClick={clear} className="rounded-full">
					<SvgIcon name="trash-can" type="outline" width={24} height={24} className="text-red-700 dark:text-red-300" />
				</IconButton>
			</div>
		</div>
	);
};

export default ConversationUser;
