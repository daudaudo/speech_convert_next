import React from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import { CTSModel, CTSVoiceId } from "~/types/CTSTypes";
import { OpenAITTSModel, OpenAIVoiceId } from "~/enums/openAi";

interface Props {
	HD: boolean;
	setModel: (value: CTSModel) => void;
	voiceId: CTSVoiceId;
	setVoiceId: (voiceId: CTSVoiceId) => void;
}
const SelectVoice = (props: Props) => {
	const t = useTranslations("cts.voice");
	const { voiceId, setVoiceId, HD, setModel } = props;

	const setHDModel = () => {
		setModel(OpenAITTSModel.TTS1HD);
	};

	const setHighModel = () => {
		setModel(OpenAITTSModel.TTS1);
	};

	const renderVoice = (id: CTSVoiceId) => {
		const name = t(`openAIVoice.${id}.name`);
		const description = t(`openAIVoice.${id}.description`);
		const selected = id === voiceId;
		return (
			<button
				key={id}
				onClick={() => setVoiceId(id)}
				className={`inline-flex items-center cursor-pointer pr-6 pl-4 py-2 border-t dark:border-t-gray-800 dark:hover:bg-gray-800 ${selected ? "bg-gray-100/80 hover:bg-gray-100 dark:bg-gray-800 border-l-2 border-l-primary-600 rounded-l-lg" : ""}`}
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
			<nav className="w-full flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
				<button className="flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75 hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400 !hover:text-gray-600 !dark:hover:text-white">
					<SpeakerWaveIcon className="h-4 w-4" />
					{t("selectVoice")}
				</button>
			</nav>
			<div className="py-4 pb-10 h-full overflow-y-auto max-h-[calc(100vh-250px)] flex flex-col space-y-4">
				<div className="flex px-4">
					<ButtonGroup fullWidth variant="text" size="sm" className="rounded-lg p-1 divide-x-0">
						<Button
							className={`${!HD ? "bg-primary-500" : "bg-gray-200 dark:bg-gray-800"} text-gray-800 dark:text-gray-100`}
							onClick={setHighModel}
						>
							{t("highQuality")}
						</Button>
						<Button
							className={`${HD ? "bg-primary-500" : "bg-gray-200 dark:bg-gray-800"} text-gray-800 dark:text-gray-100`}
							onClick={setHDModel}
						>
							{t("HDQuality")}
						</Button>
					</ButtonGroup>
				</div>
				<div className="flex flex-col py-2">
					<div className="flex content-center items-center justify-between px-4 text-sm">
						<label className="block font-medium text-gray-700 dark:text-gray-200 after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400">
							{t("voice")}
						</label>
					</div>
					{renderVoice(OpenAIVoiceId.Alloy)}
					{renderVoice(OpenAIVoiceId.Echo)}
					{renderVoice(OpenAIVoiceId.Fable)}
					{renderVoice(OpenAIVoiceId.Onyx)}
					{renderVoice(OpenAIVoiceId.Nova)}
					{renderVoice(OpenAIVoiceId.Shimmer)}
				</div>
			</div>
		</>
	);
};

export default SelectVoice;
