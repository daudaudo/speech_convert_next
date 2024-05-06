"use client";

import React, { useState } from "react";
import { SpeakerWaveIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Dialog from "@sc-components/base/Dialog";
import SelectSpeed from "./SelectSpeed";
import { CTSVoiceId, CTSVoices } from "~/types/CTSTypes";
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
const VoiceFormCollapse = (props: Props) => {
	const { HD, toggleHD, voiceId, chooseVoice, speed, onChangeSpeed, submit, validated } = props;

	const [openSelectVoice, setOpenSelectVoice] = useState(false);

	const onToggleSelectVoice = () => {
		setOpenSelectVoice((prev) => !prev);
	};

	const onChooseVoice = (voiceId: CTSVoiceId) => {
		chooseVoice(voiceId);
		setOpenSelectVoice(false);
	};

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		submit();
	};

	const currentVoice = CTSVoices.find((voice) => voice.id === voiceId);

	return (
		<>
			<div className="bg-transparent flex flex-row justify-between space-x-1 w-full">
				<div className="relative w-fit inline-flex flex-1">
					<SelectSpeed value={speed} onChange={onChangeSpeed} />
				</div>
				<div className="border-8 hover:shadow-2xl shadow-md rounded-full border-gray-50 dark:border-gray-950  absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 ">
					<button
						onClick={onSubmit}
						disabled={!validated}
						className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 w-20 h-20 font-medium rounded-full text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center justify-center"
					>
						<SpeakerWaveIcon className="h-4 w-4" />
					</button>
				</div>
				<button
					onClick={onToggleSelectVoice}
					className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full rounded-l-none text-base gap-x-2.5 p-2.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 pl-4 pr-3 inline-flex flex-1 justify-end items-center"
				>
					<div>
						<span className="block text-xs sm:text-base">{currentVoice?.name}</span>
						<span className="text-xs dark:text-gray-400">{HD ? "Chất lượng HD" : "Chất lượng cao"}</span>
					</div>
					{/* voice avatar */}
					<div className="w-4" />
				</button>
			</div>
			<Dialog open={openSelectVoice} handler={onToggleSelectVoice}>
				<Dialog.Body className="relative">
					<SelectVoice HD={HD} toggleHD={toggleHD} voiceId={voiceId} chooseVoice={onChooseVoice} />
					<button onClick={onToggleSelectVoice} className="absolute right-6 top-6">
						<XCircleIcon className="h-5 w-5" />
					</button>
				</Dialog.Body>
			</Dialog>
		</>
	);
};

export default VoiceFormCollapse;