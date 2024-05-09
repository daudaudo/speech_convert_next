"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useMemo, useState } from "react";
import convertToSpeech from "~/actions/convertToSpeech";
import { PagePath } from "~/enums/path";
import ContextError from "~/errors/context";
import {
	CTSConfig,
	CTSDefaultConfig,
	CTSInput,
	CTSModel,
	CTSOutput,
	CTSResponse,
	CTSSpeed,
	CTSVoiceId,
	OpenAITTSModel,
	OpenAIVoiceId,
} from "~/types/CTSTypes";

type Store = {
	input: CTSInput;
	onChangeInput: (value: string | File | null) => void;
	voiceId: CTSVoiceId;
	setVoiceId: (voiceId: CTSVoiceId) => void;
	config: CTSConfig;
	speed: CTSSpeed;
	setSpeed: (speed: CTSSpeed) => void;
	model: CTSModel;
	setModel: (model: CTSModel) => void;
	validate: () => boolean;
	output: CTSOutput[];
	resultShowed: boolean;
	toggleShowResult: () => void;
	requestCreateSpeech: () => void;
};
const DefaultStore: Store = {
	input: { text: "", file: null },
	onChangeInput: () => {},
	voiceId: OpenAIVoiceId.Alloy,
	setVoiceId: () => {},
	config: CTSDefaultConfig,
	speed: 1,
	setSpeed: () => {},
	model: OpenAITTSModel.TTS1,
	setModel: () => {},
	validate: () => true,
	output: [],
	resultShowed: false,
	toggleShowResult: () => {},
	requestCreateSpeech: () => {},
};

const Context = createContext<Store>(DefaultStore);

interface Props {
	children: React.ReactNode;
	config?: CTSConfig;
}
const Provider = ({ children, config = CTSDefaultConfig }: Props) => {
	const pathname = usePathname();
	const type = useMemo(() => {
		switch (pathname) {
			case PagePath.textToSpeech:
				return "text";
			case PagePath.documentToSpeech:
				return "document";
			case PagePath.conversationToSpeech:
				return "conversation";
			default:
				return "text";
		}
	}, [pathname]);

	const [input, setInput] = useState<CTSInput>(DefaultStore.input);
	const [voiceId, setVoiceId] = useState<CTSVoiceId>(DefaultStore.voiceId);
	const [speed, setSpeed] = useState<CTSSpeed>(DefaultStore.speed);
	const [model, setModel] = useState<CTSModel>(DefaultStore.model);
	const [output, setOutput] = useState<CTSOutput[]>(DefaultStore.output);
	const [resultShowed, setResultShowed] = useState<boolean>(DefaultStore.resultShowed);

	const onChangeInput = (value: string | File | null) => {
		switch (type) {
			case "text":
				setInput((prev) => ({ ...prev, text: value as string }));
				break;
			case "document":
				setInput((prev) => ({ ...prev, file: value as File }));
				break;
			default:
				break;
		}
	};

	const requestInput = useMemo(() => {
		switch (type) {
			case "document":
				return input.file as File;
			case "text":
			default:
				return input.text;
		}
	}, [input, type]);

	const validate = () => !!requestInput;

	const toggleShowResult = () => {
		setResultShowed((prev) => {
			if (output.length === 0) return false;
			return !prev;
		});
	};

	const requestCreateSpeech = async () => {
		const formData = new FormData();
		formData.append("voice", voiceId);
		formData.append("model", model);
		formData.append("speed", JSON.stringify(speed));
		formData.append("input", requestInput);
		const res: CTSResponse = await convertToSpeech(formData);
		if ("error" in res) {
			setOutput([]);
		} else {
			setOutput([res]);
		}
	};

	const store: Store = {
		input,
		onChangeInput,
		voiceId,
		setVoiceId,
		config,
		speed,
		setSpeed,
		model,
		setModel,
		validate,
		output,
		resultShowed,
		toggleShowResult,
		requestCreateSpeech,
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
