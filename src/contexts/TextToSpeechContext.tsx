"use client";

import React, { createContext, useState } from "react";
import ContextError from "~/errors/context";
import { VoiceType } from "~/types/voices";

type TextToSpeechContextType = {
	text: string;
	onChangeText: (text: string) => void;
	voice: VoiceType | undefined;
	onChooseVoice: (voice: VoiceType) => void;
};

const TextToSpeechContext = createContext<TextToSpeechContextType>({
	text: "",
	onChangeText: () => {},
	voice: undefined,
	onChooseVoice: () => {},
});

const TextToSpeechProvider = ({ children }: React.PropsWithChildren) => {
	const [text, setText] = useState("");
	const [voice, setVoice] = useState<VoiceType | undefined>(undefined);

	const onChangeText = (text: string) => {
		setText(text);
	};

	const onChooseVoice = (voice: VoiceType) => {
		setVoice(voice);
	};

	const value = { text, onChangeText, voice, onChooseVoice };

	return <TextToSpeechContext.Provider value={value}>{children}</TextToSpeechContext.Provider>;
};

const useTextToSpeech = () => {
	const context = React.useContext(TextToSpeechContext);
	if (!context) {
		throw new ContextError("useTextToSpeech");
	}
	return {
		text: context.text,
		onChangeText: context.onChangeText,
		voice: context.voice,
		onChooseVoice: context.onChooseVoice,
	};
};

export { TextToSpeechProvider, useTextToSpeech };
