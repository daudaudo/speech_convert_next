"use client";

import React, { useCallback, useMemo, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import CreateSpeechButton from "~/components/cts/CreateSpeechButton";
import ModelSelect from "~/components/cts/ModelSelect";
import CTSNavbar from "~/components/cts/Navbar";
import { OpenAITTSModel } from "~/enums/openAi";
import { User } from "~/types/CTSTypes";
import ConversationUser from "~/components/page/cts/conversation/ConversationUser";
import CTSConfig from "~/constants/configs";

const ConversationToSpeechPage = () => {
	const t = useTranslations("cts");

	const [model, setModel] = useState(OpenAITTSModel.TTS1);

	const { maxUserConversation } = CTSConfig;

	const [pending, startTransition] = useTransition();
	// const [error, setError] = useState<string>("");

	const [users, setUsers] = useState<User[]>([]);
	const [text, setText] = useState<string>("");

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

	const onTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	}, []);

	const validated = useMemo(() => {
		return users.length > 0 && text.length > 0;
	}, [users]);

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
			<div className="flex-1 w-full p-1">
				<ConversationUser
					users={users}
					add={addUser}
					update={updateUser}
					remove={removeUser}
					clear={clearUsers}
					maxUser={maxUserConversation}
				/>
				<textarea
					autoFocus
					required
					placeholder={t("conversationPlaceholder")}
					onChange={onTextChange}
					value={text}
					className="w-full pt-8 pl-4 pr-2 resize-none overflow-y-auto h-full min-h-[210px] px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-900 focus:ring-0 dark:text-white dark:placeholder-gray-500 placeholder-gray-300 focus-visible:outline-none py-3"
				/>
			</div>
			<div className="w-full flex justify-end items-center h-12 bg-gray-50 dark:bg-gray-900 px-4">
				<CreateSpeechButton onCreateSpeech={onCreateSpeech} pending={pending} disabled={!validated} />
			</div>
		</div>
	);
};

export default ConversationToSpeechPage;
