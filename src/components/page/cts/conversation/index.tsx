"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { v4 as uuidv4 } from "uuid";
import CreateSpeechButton from "~/components/cts/CreateSpeechButton";
import CTSNavbar from "~/components/cts/Navbar";
import type { CTSPartial, User } from "~/types/CTSTypes";
import ConversationUser from "~/components/page/cts/conversation/ConversationUser";
import { CTSConfig } from "~/constants/configs";
import ConversationInput from "~/components/page/cts/conversation/ConversationInput";
import convertToConversation from "~/actions/convertToConversation";
import SvgIcon from "~/components/icon/SvgIcon";
import { OpenAIVoiceId } from "~/enums/openAi";
import { ConversationResponseData } from "~/types/response/cts";
import AudioPlayer from "~/components/base/AudioPlayer";
import { VoiceProvider } from "~/enums/voice";
import ProviderSelect from "~/components/cts/voiceSelect/ProviderSelect";

const ConversationToSpeechPage = () => {
	const t = useTranslations("cts");

	const { maxUserConversation } = CTSConfig;

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");

	const [provider, setProvider] = useState(VoiceProvider.GOOGLE);
	const [users, setUsers] = useState<User[]>([]);
	const [partials, setPartials] = useState<CTSPartial[]>([]);
	const [output, setOutput] = useState<ConversationResponseData | undefined>(undefined);

	const clearError = useCallback(() => setError(""), []);

	const addUser = useCallback((user: User) => {
		if (users.length < maxUserConversation) {
			setUsers((prev) => [...prev, user]);
		}
	}, []);

	const removeUser = useCallback((id: string) => {
		setUsers((prev) => prev.filter((user) => user.id !== id));
	}, []);

	const clearUsers = useCallback(() => {
		setUsers([]);
	}, []);

	const updateUser = useCallback((user: User) => {
		setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
	}, []);

	const onChangePartial = useCallback((partial: CTSPartial[]) => {
		setPartials(partial);
	}, []);

	const checkValidate = useCallback(() => {
		if (users.find((user) => !user.voice)) {
			return t("conversationError.existUserNoVoice");
		}
		if (partials.length === 0) {
			return t("conversationError.noUser");
		}
		if (partials.length > 10) {
			return t("conversationError.partialMaxLength");
		}
		if (partials.reduce((sum, partial) => sum + partial.text.length, 0) > 2048) {
			return t("conversationError.textMaxLength");
		}
	}, [partials, users]);

	const onCreateSpeech = useCallback(() => {
		startTransition(async () => {
			try {
				setOutput(undefined);
				const err = checkValidate();
				if (err) setError(err);
				else {
					const res = await convertToConversation(provider, partials);
					if ("error" in res) {
						setError(res.error);
					} else {
						setOutput(res);
						clearError();
					}
				}
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}
		});
	}, [startTransition, partials]);

	useEffect(() => {
		if (provider === VoiceProvider.OPEN_AI) {
			setUsers([
				{ id: uuidv4(), name: "John", voice: OpenAIVoiceId.Alloy },
				{ id: uuidv4(), name: "Emma", voice: OpenAIVoiceId.Shimmer },
			]);
		}
		if (provider === VoiceProvider.GOOGLE) {
			setUsers([]);
		}
	}, [provider]);

	return (
		<div className="flex-1 w-full h-full inline-flex flex-col">
			<div className="w-full flex flex-col md:flex-row md:items-center justify-between border-b py-1 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2">
				<CTSNavbar />
				<span className="inline-flex gap-1 mt-2 md:mt-0" />
			</div>
			<div className="w-full p-4 flex flex-col md:flex-row items-center justify-between border-b-2 border-dashed border-gray-300">
				<div className="w-full md:w-48 px-2 md:border-b-0 md:border-r-2 border-gray-500 mb-2 md:mb-0">
					<ProviderSelect provider={provider} changeProvider={setProvider} />
				</div>
				<div className="w-full">
					<ConversationUser
						provider={provider}
						users={users}
						add={addUser}
						update={updateUser}
						remove={removeUser}
						clear={clearUsers}
						maxUser={maxUserConversation}
					/>
				</div>
			</div>

			<div className="flex-1 w-full p-1 flex flex-col">
				{error ? (
					<div className="text-red-500 p-4 text-sm">
						<div className="flex flex-row gap-2 items-center">
							<button
								onClick={clearError}
								className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-xs gap-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
							>
								<SvgIcon name="circle-x" type="outline" width={16} height={16} />
							</button>
							<span>{t("textError", { error })}</span>
						</div>
					</div>
				) : (
					<ConversationInput users={users} onChange={onChangePartial} placeholder={t("conversationPlaceholder")} />
				)}
			</div>
			<div className="w-full flex justify-between items-center h-12 bg-gray-50 dark:bg-gray-900 px-4">
				<span className="text-xs text-primary-500">{t("conversationGuide")}</span>
				<CreateSpeechButton onCreateSpeech={onCreateSpeech} pending={pending} disabled={users.length === 0} />
			</div>
			{output && (
				<div className="w-full flex items-center p-1 bg-gray-50 dark:bg-gray-900 px-4 gap-2 border-t-2 border-dashed border-gray-300 dark:border-gray-700">
					<a href={output.audio_url} className="text-gray-700 dark:text-gray-200">
						<SvgIcon name="arrow-down-to-bracket" type="solid" width={24} height={24} />
					</a>
					<AudioPlayer src={output.audio_url} />
				</div>
			)}
		</div>
	);
};

export default ConversationToSpeechPage;
