"use client";

import React, { createContext, useState } from "react";
import convertToSpeech from "~/actions/convertToSpeech";
import ContextError from "~/errors/context";
import {
	CTSConfig,
	CTSDefaultConfig,
	CTSInput,
	CTSModel,
	CTSResponse,
	CTSSpeed,
	CTSVoiceId,
	OpenAIVoiceId,
} from "~/types/CTSTypes";

type Store = {
	input: CTSInput;
	onChangeInput: (value: CTSInput) => void;
	voiceId: CTSVoiceId;
	chooseVoice: (voiceId: CTSVoiceId) => void;
	config: CTSConfig;
	onChangeSpeed: (speed: CTSSpeed) => void;
	onChangeModel: (model: CTSModel) => void;
	convertToSpeech: () => void;
	response: CTSResponse[];
};
const DefaultStore: Store = {
	input: "",
	onChangeInput: () => {},
	voiceId: OpenAIVoiceId.Alloy,
	chooseVoice: () => {},
	config: CTSDefaultConfig,
	onChangeSpeed: () => {},
	onChangeModel: () => {},
	convertToSpeech: () => {},
	response: [],
};

const Context = createContext<Store>(DefaultStore);

interface Props {
	children: React.ReactNode;
}
const Provider = ({ children }: Props) => {
	const [input, setInput] = useState<CTSInput>(DefaultStore.input);
	const [voiceId, setVoiceId] = useState<CTSVoiceId>(DefaultStore.voiceId);
	const [config, setConfig] = useState<CTSConfig>(DefaultStore.config);
	const [response, setResponse] = useState<CTSResponse[]>(DefaultStore.response);

	const onChangeInput = (value: CTSInput) => {
		setInput(value);
	};

	const chooseVoice = (voiceId: CTSVoiceId) => {
		setVoiceId(voiceId);
	};

	const onChangeSpeed = (speed: CTSSpeed) => {
		setConfig((prev) => ({ ...prev, speed }));
	};

	const onChangeModel = (model: CTSModel) => {
		setConfig((prev) => ({ ...prev, model }));
	};

	const convertToSpeech_ = async () => {
		const res = await convertToSpeech(input, voiceId, config.model, config.speed);
		if (res) {
			setResponse((prev) => [...prev, res]);
		}
	};

	const store: Store = {
		input,
		onChangeInput,
		voiceId,
		chooseVoice,
		config,
		onChangeSpeed,
		onChangeModel,
		convertToSpeech: convertToSpeech_,
		response: response,
	};

	return <Context.Provider value={store}>{children}</Context.Provider>;
};

const useContext = (): Store => {
	const context = React.useContext(Context);
	if (!context) {
		throw new ContextError("useConvertToSpeech");
	}
	return context;
};

export { Provider as ConvertToSpeechProvider, useContext as useConvertToSpeech };
