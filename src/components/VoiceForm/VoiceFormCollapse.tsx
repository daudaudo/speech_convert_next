"use client";

import React, { useState } from "react";
import { ChevronDoubleUpIcon, SpeakerWaveIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { CTSVoiceId, CTSVoices } from "~/types/CTSTypes";
import SelectSpeed from "./SelectSpeed";
import SelectVoice from "./SelectVoice";

interface Props {
	HD: boolean;
	toggleHD: (value: boolean) => void;
	voiceId: CTSVoiceId;
	setVoiceId: (voiceId: CTSVoiceId) => void;
	speed: number;
	onChangeSpeed: (speed: number) => void;
	validated?: boolean;
	hasResult?: boolean;
	toggleShowResult?: () => void;
	pending?: boolean;
	onCreateSpeech: () => void;
}
const VoiceFormCollapse = (props: Props) => {
	const {
		HD,
		toggleHD,
		voiceId,
		setVoiceId,
		speed,
		onChangeSpeed,
		validated,
		hasResult,
		toggleShowResult,
		pending,
		onCreateSpeech,
	} = props;

	const [openSelectVoice, setOpenSelectVoice] = useState(false);

	const onToggleSelectVoice = () => {
		setOpenSelectVoice((prev) => !prev);
	};

	const currentVoice = CTSVoices.find((voice) => voice.id === voiceId);

	return (
		<>
			<div className="bg-transparent flex flex-row justify-between w-full">
				<button
					onClick={toggleShowResult}
					className={`${hasResult ? "" : "hidden"} flex px-4 items-center justify-center p-3 dark:bg-gray-800 rounded-l-full border border-gray-300 border-r-0 dark:border-gray-700 hover:bottom-0 cursor-pointer transition-all duration-200`}
				>
					<ChevronDoubleUpIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
				</button>
				<div className="relative w-fit inline-flex flex-1">
					<SelectSpeed value={speed} onChange={onChangeSpeed} />
				</div>
				<div className="border-8 hover:shadow-2xl shadow-md rounded-full border-gray-50 dark:border-gray-950  absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 ">
					<button
						onClick={onCreateSpeech}
						disabled={!validated || pending}
						className={`focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 w-20 h-20 font-medium rounded-full text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center justify-center ${pending ? "animate-spin" : ""}`}
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
			<Dialog open={openSelectVoice} handler={onToggleSelectVoice} className="bg-white dark:bg-gray-900">
				<DialogBody className="relative">
					<SelectVoice HD={HD} toggleHD={toggleHD} voiceId={voiceId} setVoiceId={setVoiceId} />
					<button onClick={onToggleSelectVoice} className="absolute right-6 top-6">
						<XCircleIcon className="h-5 w-5" />
					</button>
				</DialogBody>
				<DialogFooter>
					<button
						onClick={onToggleSelectVoice}
						className="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center w-32 justify-center"
					>
						Lưu
					</button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default VoiceFormCollapse;
