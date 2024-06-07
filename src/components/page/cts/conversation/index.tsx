"use client";

import React, { useCallback, useMemo, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { XCircleIcon } from "@heroicons/react/24/outline";
import CreateSpeechButton from "~/components/cts/CreateSpeechButton";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import { OpenAITTSModel } from "~/enums/openAi";
import type { CTSPartial, User } from "~/types/CTSTypes";
import ConversationUser from "~/components/page/cts/conversation/ConversationUser";
import CTSConfig from "~/constants/configs";
import ConversationInput from "~/components/page/cts/conversation/ConversationInput";
import convertToConversation from "~/actions/convertToConversation";
import { useConvertToSpeech } from "~/contexts/ConvertToSpeechContext";

const ConversationToSpeechPage = () => {
	const t = useTranslations("cts");

	const { setOutput } = useConvertToSpeech();

	const [model, setModel] = useState(OpenAITTSModel.TTS1);

	const { maxUserConversation } = CTSConfig;

	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");

	const [users, setUsers] = useState<User[]>([]);
	const [partials, setPartials] = useState<CTSPartial[]>([]);

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

	const validated = useMemo(() => {
		return users.length > 0;
	}, [users]);

	const onCreateSpeech = useCallback(() => {
		if (validated) {
			startTransition(async () => {
				try {
					const res = await convertToConversation(partials);
					if ("error" in res) {
						setError(res.error);
					} else {
						setOutput(res);
						clearError();
					}
				} catch (error) {
					if (error instanceof Error) {
						setError(error.message);
					}
				}
			});
		}
	}, [validated, startTransition, partials]);

	return (
		<div className="w-full h-full inline-flex flex-col">
			<div className="w-full flex flex-col md:flex-row md:items-center justify-between border-b py-1 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-2">
				<CTSNavbar />
				<span className="inline-flex gap-1 mt-2 md:mt-0">
					<ModelSelect value={model} onChange={setModel} />
				</span>
			</div>
			<ConversationUser
				users={users}
				add={addUser}
				update={updateUser}
				remove={removeUser}
				clear={clearUsers}
				maxUser={maxUserConversation}
			/>
			<div className="flex-1 w-full p-1">
				{error ? (
					<div className="text-red-500 p-4 text-sm">
						<div className="flex flex-row gap-2 items-center">
							<button
								onClick={clearError}
								className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-xs gap-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
							>
								<XCircleIcon className="h-4 w-4" />
							</button>
							<span>{t("textError", { error })}</span>
						</div>
					</div>
				) : (
					<ConversationInput users={users} onChange={onChangePartial} placeholder={t("conversationPlaceholder")} />
				)}
			</div>
			<div className="w-full flex justify-end items-center h-12 bg-gray-50 dark:bg-gray-900 px-4">
				<CreateSpeechButton onCreateSpeech={onCreateSpeech} pending={pending} disabled={!validated} />
			</div>
		</div>
	);
};

export default ConversationToSpeechPage;