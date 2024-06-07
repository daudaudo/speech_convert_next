"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";

interface Props {
	pending?: boolean;
	onCreateSpeech: () => void;
	disabled?: boolean;
}

const CreateSpeechButton = ({ pending, onCreateSpeech, disabled }: Props) => {
	const t = useTranslations("cts.voice");

	return (
		<button
			onClick={onCreateSpeech}
			disabled={disabled || pending}
			className="flex items-center gap-2.5 px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 disabled:cursor-not-allowed disabled:opacity-50"
		>
			<div className="truncate">{t("create")}</div>
			{pending ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : <SpeakerWaveIcon className="h-6 w-6" />}
		</button>
	);
};

export default CreateSpeechButton;
