"use client";

import React from "react";
import { ChevronDoubleUpIcon, PlayPauseIcon } from "@heroicons/react/24/solid";
import { Drawer } from "@material-tailwind/react";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import Audio from "./Audio";

const AudioDrawer = () => {
	const { output, resultShowed, toggleShowResult } = useConvertToSpeech();

	if (!output) return null;

	return (
		<>
			<Drawer
				placement="bottom"
				open={resultShowed}
				onClose={toggleShowResult}
				transition={{ type: "tween" }}
				overlayProps={{ className: "backdrop-blur-none" }}
				className="bg-opacity-0"
			>
				<div className="w-full h-full md:w-3/4 mx-auto max-w-4xl flex flex-col items-end">
					<button onClick={toggleShowResult} className="flex-1 w-full cursor-default" />
					<div className="relative w-full overflow-x-hidden bg-white border shadow-xl border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-900">
						<button
							onClick={toggleShowResult}
							className="inline-flex items-center cursor-pointer hover:bg-gray-50 py-2 px-4 dark:hover:bg-gray-800 w-full"
						>
							<span className="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600" />
							<h5 className="inline-flex items-center text-base text-gray-700 dark:text-gray-200 font-medium">
								<PlayPauseIcon className="h-5 w-5 mr-1" />
								Audio Player
							</h5>
						</button>
						<Audio
							key={output.id}
							input={output.input}
							streamUrl={output.streamUrl}
							downloadUrl={output.downloadUrl}
							voiceId={output.voiceId}
							model={output.model}
							speed={output.speed}
						/>
					</div>
				</div>
			</Drawer>
			{!resultShowed && (
				<button
					onClick={toggleShowResult}
					className="hidden md:block fixed z-50 bottom-0 left-1/2 p-3 pt-5 hover:pb-5 dark:bg-gray-800 rounded-t-full border-t border-l border-r dark:border-primary-700 border-primary-200 cursor-pointer transition-all duration-200 text-primary-700 dark:text-primary-200"
				>
					<ChevronDoubleUpIcon className="h-8 w-8 animate-bounce-t-3" />
				</button>
			)}
		</>
	);
};

export default AudioDrawer;
