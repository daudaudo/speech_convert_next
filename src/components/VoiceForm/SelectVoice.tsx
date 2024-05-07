import React from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { CTSVoice, CTSVoiceId, CTSVoices } from "~/types/CTSTypes";

interface Props {
	HD: boolean;
	toggleHD: (value: boolean) => void;
	voiceId: CTSVoiceId;
	chooseVoice: (voiceId: CTSVoiceId) => void;
}
const SelectVoice = (props: Props) => {
	const { voiceId, chooseVoice, HD, toggleHD } = props;

	const onToggleHD = (e: React.ChangeEvent<HTMLInputElement>) => {
		toggleHD(e.target.checked);
	};

	const renderVoice = (voice: CTSVoice) => {
		const { id, name, description } = voice;
		const selected = id === voiceId;
		return (
			<button
				key={id}
				onClick={() => chooseVoice(id)}
				className={`inline-flex items-center cursor-pointer pr-6 pl-4 py-2 border-t dark:border-t-gray-800 dark:hover:bg-gray-800 ${selected ? "bg-gray-100/80 hover:bg-gray-100 dark:bg-gray-800 border-l-2 border-l-primary-600 rounded-l-lg" : ""}`}
			>
				<div className="flex items-start gap-2.5 w-full">
					<div className="flex flex-col items-start gap-1 flex-1">
						<span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
						<span className="text-xs font-normal text-gray-500 dark:text-gray-400">{description}</span>
					</div>
					{/* <div className="relative inline-flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-125">
						Avatar
					</div> */}
				</div>
			</button>
		);
	};

	return (
		<>
			<nav className="w-full flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
				<button className="flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75 hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400 !hover:text-gray-600 !dark:hover:text-white">
					<SpeakerWaveIcon className="h-4 w-4" />
					Cài đặt âm thanh
				</button>
			</nav>
			<div className="py-4 pb-10 h-full overflow-y-auto max-h-[calc(100vh-250px)] flex flex-col space-y-4 scrollbar-thin">
				<div className="flex px-4">
					<label className="inline-flex items-center cursor-pointer">
						<input type="checkbox" value="" className="sr-only peer" onChange={onToggleHD} />
						<div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
						<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
							{HD ? "Chất lượng HD" : "Chất lượng cao"}
						</span>
					</label>
				</div>
				<div className="flex flex-col py-2">
					<div className="flex content-center items-center justify-between px-4 text-sm">
						<label className="block font-medium text-gray-700 dark:text-gray-200 after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400">
							Giọng nói
						</label>
					</div>
					{CTSVoices.map(renderVoice)}
				</div>
			</div>
		</>
	);
};

export default SelectVoice;
