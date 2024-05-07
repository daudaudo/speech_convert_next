"use client";

import React, { createContext, useState } from "react";
import convertToSpeech from "~/actions/convertToSpeech";
import ContextError from "~/errors/context";
import {
	CTSConfig,
	CTSDefaultConfig,
	CTSInput,
	CTSModel,
	CTSOutput,
	CTSSpeed,
	CTSVoiceId,
	OpenAITTSModel,
	OpenAIVoiceId,
} from "~/types/CTSTypes";

type Store = {
	input: CTSInput;
	onChangeInput: (value: CTSInput) => void;
	voiceId: CTSVoiceId;
	chooseVoice: (voiceId: CTSVoiceId) => void;
	config: CTSConfig;
	speed: CTSSpeed;
	onChangeSpeed: (speed: CTSSpeed) => void;
	model: CTSModel;
	onChangeModel: (model: CTSModel) => void;
	convertToSpeech: () => void;
	validate: () => boolean;
	output: CTSOutput[];
	resultShowed: boolean;
	toggleShowResult: () => void;
};
const DefaultStore: Store = {
	input: "",
	onChangeInput: () => {},
	voiceId: OpenAIVoiceId.Alloy,
	chooseVoice: () => {},
	config: CTSDefaultConfig,
	speed: 1,
	onChangeSpeed: () => {},
	model: OpenAITTSModel.TTS1,
	onChangeModel: () => {},
	convertToSpeech: () => {},
	validate: () => true,
	output: [
		{
			id: "1",
			streamUrl: "",
			downloadUrl: "",
		},
	],
	resultShowed: false,
	toggleShowResult: () => {},
};

const Context = createContext<Store>(DefaultStore);

interface Props {
	children: React.ReactNode;
	config?: CTSConfig;
}
const Provider = ({ children, config = CTSDefaultConfig }: Props) => {
	const [input, setInput] = useState<CTSInput>(DefaultStore.input);
	const [voiceId, setVoiceId] = useState<CTSVoiceId>(DefaultStore.voiceId);
	const [speed, setSpeed] = useState<CTSSpeed>(DefaultStore.speed);
	const [model, setModel] = useState<CTSModel>(DefaultStore.model);
	const [output, setOutput] = useState<CTSOutput[]>(DefaultStore.output);
	const [resultShowed, setResultShowed] = useState<boolean>(DefaultStore.resultShowed);

	const onChangeInput = (value: CTSInput) => {
		setInput(value);
	};

	const chooseVoice = (voiceId: CTSVoiceId) => {
		setVoiceId(voiceId);
	};

	const onChangeSpeed = (speed: CTSSpeed) => {
		setSpeed(speed);
	};

	const onChangeModel = (model: CTSModel) => {
		setModel(model);
	};

	const validate = () => {
		if (input === "") {
			return false;
		}
		return true;
	};

	const toggleShowResult = () => {
		setResultShowed((prev) => {
			if (output.length === 0) return false;
			return !prev;
		});
	};

	const convertToSpeech_ = async () => {
		const res = await convertToSpeech(input, voiceId, model, speed);
		if (res) {
			setOutput((prev) => [...prev, res]);
		}
	};

	const store: Store = {
		input,
		onChangeInput,
		voiceId,
		chooseVoice,
		config,
		speed,
		onChangeSpeed,
		model,
		onChangeModel,
		convertToSpeech: convertToSpeech_,
		validate,
		output,
		resultShowed,
		toggleShowResult,
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
