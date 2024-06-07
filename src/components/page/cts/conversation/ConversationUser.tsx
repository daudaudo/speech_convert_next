"use client";

import React, { useState } from "react";
import { Button, IconButton, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import UserForm from "~/components/cts/UserForm";
import SvgIcon from "~/components/icon/SvgIcon";
import { OpenAIVoiceId } from "~/enums/openAi";
import type { User } from "~/types/CTSTypes";
import { generateUniqueName } from "~/utils/conversation";

interface UserProps {
	user: User;
	update: (user: User) => void;
	remove: (name: string) => void;
}

const User = ({ user, update, remove }: UserProps) => {
	const [open, setOpen] = useState<boolean>(true);

	const updateUser = (newUser: User) => {
		setOpen(false);
		update({ ...newUser, id: user.id });
	};

	const deleteUser = () => {
		setOpen(false);
		remove(user.id);
	};

	return (
		<Popover open={open} handler={setOpen} placement="bottom-start">
			<PopoverHandler>
				<Button
					variant="text"
					className="h-full flex flex-row items-center gap-2 border border-gray-500 px-4 py-2 rounded-full"
				>
					<span className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</span>
				</Button>
			</PopoverHandler>
			<PopoverContent className="z-50 bg-gray-200 dark:bg-gray-800 border-gray-100 dark:border-gray-900 flex flex-col items-center gap-2">
				<UserForm onSave={updateUser} onDelete={deleteUser} initUser={user} />
			</PopoverContent>
		</Popover>
	);
};

interface Props {
	users: User[];
	add: (user: User) => void;
	update: (user: User) => void;
	remove: (id: string) => void;
	clear: () => void;
}

const ConversationUser = (props: Props) => {
	const { users, add, update, remove, clear } = props;

	const onClickAddUser = () => {
		add({
			id: uuidv4(),
			name: generateUniqueName(users),
			voice: OpenAIVoiceId.Alloy,
		});
	};

	return (
		<div className="w-full flex flex-row gap-2 border-b-2 border-dashed border-gray-300 dark:border-gray-700 p-4">
			<div className="flex-1 flex flex-row items-center gap-2">
				{users.map((user) => (
					<User key={user.id} user={user} update={update} remove={remove} />
				))}
				<IconButton
					onClick={onClickAddUser}
					variant="outlined"
					className="rounded-full border-gray-600 dark:border-gray-400"
				>
					<SvgIcon name="user-plus" type="solid" width={24} height={24} className="text-gray-600 dark:text-gray-400" />
				</IconButton>
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
