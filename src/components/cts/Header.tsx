"use client";

import React, { useCallback } from "react";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import SpeedSelect from "~/components/cts/SpeedSelect";
import VoiceSelect from "~/components/cts/VoiceSelect";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import { CTSSpeed } from "~/types/CTSTypes";

const Header = () => {
	const { speed, setSpeed, model, setModel, voiceId, setVoiceId } = useConvertToSpeech();

	const onChangeSpeed = useCallback(
		(speed: number) => {
			setSpeed(speed as CTSSpeed);
		},
		[setSpeed],
	);

	return (
		<nav className="w-full flex flex-col md:flex-row md:items-center justify-between border-b py-1 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2">
			<CTSNavbar />
			<span className="inline-flex gap-1 mt-2 md:mt-0">
				<SpeedSelect value={speed} onChange={onChangeSpeed} />
				<ModelSelect value={model} onChange={setModel} />
				<VoiceSelect value={voiceId} onChange={setVoiceId} />
			</span>
		</nav>
	);
};

export default Header;
