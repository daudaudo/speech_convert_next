"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useMemo, useState, useTransition } from "react";
import convertToSpeech from "~/actions/convertToSpeech";
import { OpenAITTSModel, OpenAIVoiceId } from "~/enums/openAi";
import { PagePath } from "~/enums/path";
import ContextError from "~/errors/context";
import {
	CTSConfig,
	CTSDefaultConfig,
	CTSError,
	CTSInput,
	CTSModel,
	CTSOutput,
	CTSSpeed,
	CTSVoiceId,
} from "~/types/CTSTypes";

type Store = {
	input: CTSInput;
	changeInput: (value: string | File | null) => void;
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
	pending: boolean;
	error?: CTSError;
	clearError?: () => void;
};
const DefaultStore: Store = {
	input: { text: "", file: null },
	changeInput: () => {},
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
	pending: false,
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

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<CTSError>();

	const [input, setInput] = useState<CTSInput>(DefaultStore.input);
	const [voiceId, setVoiceId] = useState<CTSVoiceId>(DefaultStore.voiceId);
	const [speed, setSpeed] = useState<CTSSpeed>(DefaultStore.speed);
	const [model, setModel] = useState<CTSModel>(DefaultStore.model);
	const [output, setOutput] = useState<CTSOutput[]>(DefaultStore.output);
	const [resultShowed, setResultShowed] = useState<boolean>(DefaultStore.resultShowed);

	const changeInput = (value: string | File | null) => {
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

	const clearError = () => setError((prev) => ({ ...prev, [type]: undefined }));

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
		startTransition(async () => {
			if (validate()) {
				const formData = new FormData();
				formData.append("voice", voiceId);
				formData.append("model", model);
				formData.append("speed", speed.toString());
				formData.append("input", requestInput);
				const res = await convertToSpeech(formData);
				if (res.error) {
					setError((prev) => ({ ...prev, [type]: res.error }));
					setOutput([]);
				} else {
					clearError();
					setOutput([res as CTSOutput]);
				}
			}
		});
	};

	const store: Store = {
		input,
		changeInput,
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
		pending,
		error,
		clearError,
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
