"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { v4 as uuidv4 } from "uuid";
import type { CTSVoiceId, CTSVoiceProvider, User } from "~/types/CTSTypes";
import VoiceSelect from "~/components/cts/voiceSelect";

interface Props {
	provider: CTSVoiceProvider;
	initUser?: User;
	onSave: (user: User) => void;
	editable?: boolean;
}

const UserForm = ({ provider, onSave, initUser, editable = true }: Props) => {
	const t = useTranslations("cts.voice");
	const [name, setName] = useState<string>(initUser?.name || "");
	const [voice, setVoice] = useState<CTSVoiceId>(initUser?.voice || "");

	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		onSave({ id: initUser?.id ?? uuidv4(), name: e.target.value, voice });
	};

	const onChangeVoice = (value: CTSVoiceId) => {
		setVoice(value);
		onSave({ id: initUser?.id ?? uuidv4(), name, voice: value });
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
			<div className="flex flex-row items-center justify-between gap-2">
				<span className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{t("voice")}</span>
				<VoiceSelect value={voice} onChange={onChangeVoice} providers={[provider]} />
			</div>
		</div>
	);
};

export default UserForm;
