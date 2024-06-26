"use client";

import React, { createContext, useEffect, useState } from "react";
import { ConversationResponseData, SpeechResponseData } from "~/types/response/cts";

type Store = {
	output?: SpeechResponseData | ConversationResponseData;
	setOutput: (output?: SpeechResponseData | ConversationResponseData) => void;
	resultShowed: boolean;
	toggleShowResult: () => void;
};

const DefaultStore: Store = {
	output: undefined,
	setOutput: () => {},
	resultShowed: true,
	toggleShowResult: () => {},
};

const Context = createContext<Store>(DefaultStore);

interface Props {
	children: React.ReactNode;
}

const Provider = ({ children }: Props) => {
	const [output, setOutput] = useState<SpeechResponseData | ConversationResponseData | undefined>(undefined);
	const [resultShowed, setResultShowed] = useState<boolean>(DefaultStore.resultShowed);

	useEffect(() => {
		if (!!output) {
			setResultShowed(true);
		}
	}, [output]);

	const toggleShowResult = () => {
		setResultShowed((prev) => {
			if (!output) return false;
			return !prev;
		});
	};

	const store: Store = {
		output,
		setOutput,
		resultShowed,
		toggleShowResult,
	};

	return <Context.Provider value={store}>{children}</Context.Provider>;
};

const useContext = (): Store => React.useContext(Context);

export { Provider as ConvertToSpeechProvider, useContext as useConvertToSpeech };
