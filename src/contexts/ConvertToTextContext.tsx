"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useMemo, useState, useTransition } from "react";
import convertToText from "~/actions/convertToText";
import { LanguageCode } from "~/enums/language";
import { OpenAITranscriptionModel } from "~/enums/openAi";
import { PagePath } from "~/enums/path";
import ContextError from "~/errors/context";
import { CTTConfig, CTTDefaultConfig, CTTError, CTTInput, CTTLanguage, CTTOutput } from "~/types/CTTTypes";

type Store = {
	input: CTTInput;
	changeInput: (value: string | File | null) => void;
	config: CTTConfig;
	language: CTTLanguage;
	setLanguage: (language: CTTLanguage) => void;
	validate: () => boolean;
	output: CTTOutput[];
	requestCreateText: () => void;
	pending?: boolean;
	error?: string;
	clearError?: () => void;
};

const DefaultStore: Store = {
	input: { text: "", file: null },
	changeInput: () => {},
	config: CTTDefaultConfig,
	language: LanguageCode.Vietnamese,
	setLanguage: () => {},
	validate: () => true,
	output: [],
	requestCreateText: () => {},
};

const Context = createContext<Store>(DefaultStore);

interface Props {
	children: React.ReactNode;
	config?: CTTConfig;
}
const Provider = ({ children, config = CTTDefaultConfig }: Props) => {
	const pathname = usePathname();
	const type = useMemo(() => {
		switch (pathname) {
			case PagePath.speechToText:
				return "speech";
			case PagePath.documentToText:
				return "document";
			case PagePath.textToText:
				return "text";
			default:
				return "text";
		}
	}, [pathname]);

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<CTTError>();

	const [input, setInput] = useState<CTTInput>(DefaultStore.input);
	const [language, setLanguage] = useState<CTTLanguage>(DefaultStore.language);
	const [output, setOutput] = useState<CTTOutput[]>(DefaultStore.output);

	const changeInput = (value: string | File | null) => {
		switch (type) {
			case "text":
				setInput((prev) => ({ ...prev, text: value as string }));
				break;
			case "speech":
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
			case "speech":
			case "document":
				return input.file as File;
			case "text":
			default:
				return input.text;
		}
	}, [input, type]);

	const validate = () => !!requestInput;

	const requestCreateText = () => {
		startTransition(async () => {
			if (validate()) {
				const formData = new FormData();
				formData.append("language_code", language);
				formData.append("model", OpenAITranscriptionModel.Whisper1);
				formData.append("file", input.file as File);
				const res = await convertToText(formData);
				if (res.error) {
					setError((prev) => ({ ...prev, [type]: res.error }));
					setOutput([]);
				} else {
					clearError();
					setOutput([res as CTTOutput]);
				}
			}
		});
	};

	const store: Store = {
		input,
		changeInput,
		config,
		language,
		setLanguage,
		validate,
		output,
		requestCreateText,
		pending,
		error: error?.[type],
		clearError,
	};

	return <Context.Provider value={store}>{children}</Context.Provider>;
};

const useContext = (): Store => {
	const context = React.useContext(Context);
	if (!context) {
		throw new ContextError("useConvertToText");
	}
	return context;
};

export { Provider as ConvertToTextProvider, useContext as useConvertToText };
