"use client";

import React from "react";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import { CTSSpeed, OpenAITTSModel } from "~/types/CTSTypes";
import VoiceFormDetail from "./VoiceFormDetail";
import VoiceFormCollapse from "./VoiceFormCollapse";

const VoiceForm = () => {
	const {
		onChangeModel,
		voiceId,
		chooseVoice,
		speed,
		onChangeSpeed,
		model,
		convertToSpeech,
		validate,
		output,
		toggleShowResult,
	} = useConvertToSpeech();

	const toggleHD = (value: boolean) => {
		onChangeModel(value ? OpenAITTSModel.TTS1HD : OpenAITTSModel.TTS1);
	};

	const _onChangeSpeed = (speed: number) => {
		onChangeSpeed(speed as CTSSpeed);
	};

	const validated = validate();

	return (
		<>
			<div className="hidden md:flex h-full max-h-full pb-0.5 space-y-6">
				<VoiceFormDetail
					HD={model === OpenAITTSModel.TTS1HD}
					toggleHD={toggleHD}
					voiceId={voiceId}
					chooseVoice={chooseVoice}
					speed={speed}
					onChangeSpeed={_onChangeSpeed}
					submit={convertToSpeech}
					validated={validated}
				/>
			</div>
			<div className="flex md:hidden flex-1 flex-col h-full max-h-full pb-0.5 space-y-6">
				<div className="md:relative z-30 md:z-10 md:px-0 md:bottom-0 md:py-0 md:bg-transparent flex-row justify-between md:space-x-1 space-x-0 fixed bottom-1 w-full left-0 px-4 py-4">
					<VoiceFormCollapse
						HD={model === OpenAITTSModel.TTS1HD}
						toggleHD={toggleHD}
						voiceId={voiceId}
						chooseVoice={chooseVoice}
						speed={speed}
						onChangeSpeed={_onChangeSpeed}
						submit={convertToSpeech}
						validated={validated}
						hasResult={output.length > 0}
						toggleShowResult={toggleShowResult}
					/>
				</div>
			</div>
		</>
	);
};

export default VoiceForm;
