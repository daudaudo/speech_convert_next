"use client";

import React, { useCallback, useMemo, useState, useTransition } from "react";
import CreateSpeechButton from "~/components/cts/CreateSpeechButton";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import { OpenAITTSModel } from "~/enums/openAi";
import { CTSPartial } from "~/types/CTSTypes";

const ConversationToSpeechPage = () => {
	const [model, setModel] = useState(OpenAITTSModel.TTS1);

	const [pending, startTransition] = useTransition();
	// const [error, setError] = useState<string>("");

	const [partial, setPartial] = useState<CTSPartial[]>([]);

	const validated = useMemo(() => {
		return partial.length > 0;
	}, [partial]);

	const onCreateSpeech = useCallback(() => {
		if (validated) {
			startTransition(async () => {
				//
			});
		}
	}, [validated, startTransition]);

	return (
		<div className="w-full h-full inline-flex flex-col">
			<div className="w-full flex flex-col md:flex-row md:items-center justify-between border-b py-1 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2">
				<CTSNavbar />
				<span className="inline-flex gap-1 mt-2 md:mt-0">
					<ModelSelect value={model} onChange={setModel} />
				</span>
			</div>
			<div className="flex-1 w-full">{/* Content */}</div>
			<div className="w-full flex justify-end items-center h-12 bg-gray-50 dark:bg-gray-900 px-4">
				<CreateSpeechButton onCreateSpeech={onCreateSpeech} pending={pending} disabled={!validated} />
			</div>
		</div>
	);
};

export default ConversationToSpeechPage;
