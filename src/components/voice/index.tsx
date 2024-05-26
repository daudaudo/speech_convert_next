"use client";

import React from "react";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";
import { CTSSpeed } from "~/types/CTSTypes";
import { OpenAITTSModel } from "~/enums/openAi";
import VoiceFormDetail from "~/components/voice/VoiceFormDetail";
import VoiceFormCollapse from "~/components/voice/VoiceFormCollapse";

const VoiceForm = () => {
	const {
		setModel,
		voiceId,
		setVoiceId,
		speed,
		setSpeed,
		model,
		validate,
		output,
		toggleShowResult,
		requestCreateSpeech,
		pending,
	} = useConvertToSpeech();

	const onChangeSpeed = (speed: number) => {
		setSpeed(speed as CTSSpeed);
	};

	const validated = validate();

	return (
		<>
			<div className="hidden md:flex h-full max-h-full pb-0.5 space-y-6">
				<VoiceFormDetail
					HD={model === OpenAITTSModel.TTS1HD}
					setModel={setModel}
					voiceId={voiceId}
					setVoiceId={setVoiceId}
					speed={speed}
					onChangeSpeed={onChangeSpeed}
					validated={validated}
					pending={pending}
					onCreateSpeech={requestCreateSpeech}
				/>
			</div>
			<div className="flex md:hidden flex-1 flex-col h-full max-h-full pb-0.5 space-y-6">
				<div className="md:relative z-30 md:z-10 md:px-0 md:bottom-0 md:py-0 md:bg-transparent flex-row justify-between md:space-x-1 space-x-0 fixed bottom-1 w-full left-0 px-4 py-4">
					<VoiceFormCollapse
						HD={model === OpenAITTSModel.TTS1HD}
						setModel={setModel}
						voiceId={voiceId}
						setVoiceId={setVoiceId}
						speed={speed}
						onChangeSpeed={onChangeSpeed}
						validated={validated}
						hasResult={!!output}
						toggleShowResult={toggleShowResult}
						pending={pending}
						onCreateSpeech={requestCreateSpeech}
					/>
				</div>
			</div>
		</>
	);
};

export default VoiceForm;
