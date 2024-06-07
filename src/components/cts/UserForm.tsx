"use client";

import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import { v4 as uuidv4 } from "uuid";
import type { CTSVoiceId, User } from "~/types/CTSTypes";
import VoiceSelect from "~/components/cts/VoiceSelect";
import { OpenAIVoiceId } from "~/enums/openAi";

interface Props {
	initUser?: User;
	onSave: (user: User) => void;
	onDelete?: () => void;
	editable?: boolean;
}

const UserForm = ({ onSave, onDelete, initUser, editable = true }: Props) => {
	const t = useTranslations("cts.voice");
	const [name, setName] = useState<string>(initUser?.name || "");
	const [voice, setVoice] = useState<CTSVoiceId>(initUser?.voice || OpenAIVoiceId.Alloy);

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeVoice = (value: CTSVoiceId) => {
		setVoice(value);
	};

	const onClickSubmit = () => {
		onSave({ id: initUser?.id ?? uuidv4(), name, voice });
	};

	return (
		<div className="space-y-2">
			<div>
				<span className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{t("name")}</span>
				<input
					value={name}
					disabled={!editable}
					onChange={onNameChange}
					placeholder="Enter name"
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
			</div>
			<div className="flex flex-row items-center justify-between">
				<span className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{t("voice")}</span>
				<VoiceSelect value={voice} onChange={onChangeVoice} />
			</div>
			<div className="inline-flex w-full items-center gap-2 justify-end">
				<Button
					size="sm"
					variant="text"
					onClick={onDelete}
					className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
				>
					{t("delete")}
				</Button>
				<Button
					size="sm"
					variant="text"
					onClick={onClickSubmit}
					className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					{t("save")}
				</Button>
			</div>
		</div>
	);
};

export default UserForm;
