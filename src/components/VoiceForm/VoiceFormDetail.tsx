"use client";

import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import React from "react";
import { CTSVoiceId } from "~/types/CTSTypes";
import SelectSpeed from "./SelectSpeed";
import SelectVoice from "./SelectVoice";

interface Props {
	HD: boolean;
	toggleHD: (value: boolean) => void;
	voiceId: CTSVoiceId;
	chooseVoice: (voiceId: CTSVoiceId) => void;
	speed: number;
	onChangeSpeed: (speed: number) => void;
	submit: () => void;
	validated?: boolean;
}
const VoiceFormDetail = (props: Props) => {
	const { HD, toggleHD, voiceId, chooseVoice, speed, onChangeSpeed, submit, validated } = props;

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		submit();
	};

	return (
		<div className="flex w-full h-full flex-col space-y-6">
			<div className="flex-1 rounded-lg divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900">
				<SelectVoice HD={HD} toggleHD={toggleHD} voiceId={voiceId} chooseVoice={chooseVoice} />
			</div>
			<div className="bg-transparent flex flex-row justify-between space-x-1 w-full">
				<div className="relative w-fit inline-flex flex-none">
					<SelectSpeed value={speed} onChange={onChangeSpeed} />
				</div>
				<div className="border-8 hover:shadow-2xl shadow-md rounded-full border-gray-50 dark:border-gray-950 border-none flex-1">
					<button
						onClick={onSubmit}
						disabled={!validated}
						className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 w-full h-full font-medium rounded-full rounded-l-none text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center justify-between"
					>
						<div className="truncate">Tạo tiếng nói</div>
						<SpeakerWaveIcon className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default VoiceFormDetail;