"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { OpenAIVoiceId } from "~/enums/openAi";
import { CTSVoiceId } from "~/types/CTSTypes";

interface Props {
	value: CTSVoiceId;
	onChange: (value: CTSVoiceId) => void;
}

const VoiceSelect = ({ value, onChange }: Props) => {
	const t = useTranslations("cts.voice");
	const [open, setOpen] = useState<boolean>(false);

	const [voice, setVoice] = useState(value);

	const onToggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const onClickSave = () => {
		onChange(voice);
		setOpen(false);
	};

	const renderVoice = (id: CTSVoiceId) => {
		const name = t(`openAIVoice.${id}.name`);
		const description = t(`openAIVoice.${id}.description`);
		const selected = id === voice;
		return (
			<button
				key={id}
				onClick={() => setVoice(id)}
				className={`inline-flex items-center cursor-pointer pr-6 pl-4 py-2 border-b dark:border-t-gray-800 dark:hover:bg-gray-800 ${selected ? "bg-gray-100/80 hover:bg-gray-100 dark:bg-gray-800 border-l-2 border-l-primary-600 rounded-l-lg" : ""}`}
			>
				<div className="flex items-start gap-2.5 w-full">
					<div className="flex flex-col items-start gap-1 flex-1">
						<span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
						<span className="text-xs font-normal text-gray-500 dark:text-gray-400">{description}</span>
					</div>
				</div>
			</button>
		);
	};

	return (
		<>
			<Button
				variant="text"
				onClick={onToggleOpen}
				className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 flex items-center gap-2"
			>
				<SpeakerWaveIcon className="h-6 w-6" />
				{t(`openAIVoice.${value}.name`)}
			</Button>
			<Dialog open={open} handler={onToggleOpen} className="bg-white dark:bg-gray-900">
				<DialogBody className="relative px-6 py-4 flex flex-col">
					<button
						onClick={onToggleOpen}
						className="absolute rounded-full right-6 top-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
					>
						<XCircleIcon className="h-6 w-6" />
					</button>
					<div className="text-gray-700 dark:text-gray-300 py-4">{t("selectVoice")}</div>
					{renderVoice(OpenAIVoiceId.Alloy)}
					{renderVoice(OpenAIVoiceId.Echo)}
					{renderVoice(OpenAIVoiceId.Fable)}
					{renderVoice(OpenAIVoiceId.Onyx)}
					{renderVoice(OpenAIVoiceId.Nova)}
					{renderVoice(OpenAIVoiceId.Shimmer)}
				</DialogBody>
				<DialogFooter className="flex justify-end px-6 py-4">
					<button
						onClick={onClickSave}
						className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-4 py-2 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center justify-center"
					>
						{t("save")}
					</button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default VoiceSelect;
