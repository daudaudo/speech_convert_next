"use client";

import React from "react";
import VoiceFormDetail from "./VoiceFormDetail";
import VoiceFormCollapse from "./VoiceFormCollapse";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import { CTSSpeed, OpenAITTSModel } from "~/types/CTSTypes";

const VoiceForm = () => {
	const { onChangeModel, voiceId, chooseVoice, config, onChangeSpeed, convertToSpeech } = useConvertToSpeech();

	const toggleHD = (value: boolean) => {
		onChangeModel(value ? OpenAITTSModel.TTS1HD : OpenAITTSModel.TTS1);
	};

	const _onChangeSpeed = (speed: number) => {
		onChangeSpeed(speed as CTSSpeed);
	};

	return (
		<>
			<div className="hidden md:flex h-full max-h-full pb-0.5 space-y-6">
				<VoiceFormDetail
					HD={config.model === OpenAITTSModel.TTS1HD}
					toggleHD={toggleHD}
					voiceId={voiceId}
					chooseVoice={chooseVoice}
					speed={config.speed}
					onChangeSpeed={_onChangeSpeed}
					submit={convertToSpeech}
				/>
			</div>
			<div className="flex md:hidden flex-1 flex-col h-full max-h-full pb-0.5 space-y-6">
				<div className="md:relative z-30 md:z-10 md:px-0 md:bottom-0 md:py-0 md:bg-transparent flex-row justify-between md:space-x-1 space-x-0 fixed bottom-1 w-full left-0 px-4 py-4">
					<VoiceFormCollapse />
				</div>
			</div>
		</>
	);
};

export default VoiceForm;
