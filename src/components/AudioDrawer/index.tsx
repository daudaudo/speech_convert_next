"use client";

import React, { useState } from "react";
import DrawerBase from "@sc-components/base/Drawer";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import { CTSResponse } from "~/types/CTSTypes";

const AudioDrawer = () => {
	const { response } = useConvertToSpeech();
	const [open, setOpen] = useState(true);

	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const renderAudio = (audio: CTSResponse, index: number) => {
		const { id, input, stream, download } = audio;
		return (
			<audio key={id} controls className="w-full">
				<source src={stream} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		);
	};

	return (
		<DrawerBase
			size={300}
			placement="bottom"
			open={response.length > 0}
			onClose={toggleOpen}
			transition={{ type: "tween" }}
		>
			<button onClick={toggleOpen} className="cursor-pointer hover:bg-gray-50 py-2 px-4 dark:hover:bg-gray-800">
				<span className="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600" />
				<h5 className="inline-flex items-center text-base text-gray-500 dark:text-gray-400 font-medium">
					Audio Player
				</h5>
			</button>
			{response.map(renderAudio)}
		</DrawerBase>
	);
};

export default AudioDrawer;
