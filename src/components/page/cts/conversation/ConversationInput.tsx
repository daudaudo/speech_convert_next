"use client";

import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { CTSConfig } from "~/constants/configs";
import { SilentTime } from "~/enums/convarsation";
import { CTSPartial, User } from "~/types/CTSTypes";

function parseTextWithUsers(text: string, users: User[]): CTSPartial[] {
	const partials: CTSPartial[] = [];
	const userRegex = /\[([^\]]+)\]:?\s*([^[]*)/g;
	const silentRegex = /(\d+)s/;
	let match;

	while ((match = userRegex.exec(text)) !== null) {
		const userNameOrSilent = match[1].trim();
		const message = match[2].trim();
		if (users.some((u) => u.name === userNameOrSilent)) {
			const user = users.find((u) => u.name === userNameOrSilent);
			if (user) {
				partials.push({
					name: user.name,
					voice: user.voice || "",
					text: message,
					silent: 0,
				});
			}
		}
		const silentMatch = userNameOrSilent.match(silentRegex);
		if (silentMatch && partials.length > 0) {
			partials[partials.length - 1].silent = parseInt(silentMatch[1], 10);
		}
	}
	return partials;
}
interface Props {
	users: User[];
	onChange: (partial: CTSPartial[]) => void;
	placeholder?: string;
}

const ConversationInput = ({ users, onChange, placeholder }: Props) => {
	const t = useTranslations("cts");
	const [text, setText] = useState<string>("");
	const [textLength, setTextLength] = useState<number>(0);
	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const userSuggestions = useMemo(() => {
		return users.map((user) => ({ id: user.id, display: user.name }));
	}, [users]);

	const silentSuggestions = useMemo(() => {
		return [
			{ id: SilentTime.BRIEF, display: `${SilentTime.BRIEF}s` },
			{ id: SilentTime.SHORT, display: `${SilentTime.SHORT}s` },
			{ id: SilentTime.MEDIUM, display: `${SilentTime.MEDIUM}s` },
			{ id: SilentTime.LONG, display: `${SilentTime.LONG}s` },
		];
	}, []);

	const onTextChange = (event: any, newValue: string, newPlainTextValue: string) => {
		setText(newPlainTextValue);
	};

	const clearText = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		setText("");
		e.stopPropagation();
	}, []);

	useEffect(() => {
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}
		typingTimeoutRef.current = setTimeout(() => {
			const partials: CTSPartial[] = parseTextWithUsers(text, users);
			setTextLength(partials.reduce((sum, partial) => sum + partial.text.length, 0));
			onChange(partials);
		}, 300);
		return () => {
			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}
		};
	}, [text, users]);

	return (
		<>
			<div
				className={`${textLength === 0 ? "hidden" : ""} absolute top-[10px] right-3 text-right text-xs font-thin dark:text-gray-300 flex flex-row space-x-4 items-center z-40`}
			>
				<span>
					{textLength} / {CTSConfig.maxTextLength}
				</span>
				<button
					onClick={clearText}
					disabled={textLength === 0}
					className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 text-red-500 hover:text-red-600 disabled:text-red-500 dark:text-red-400 dark:hover:text-red-500 dark:disabled:text-red-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 dark:focus-visible:ring-red-400 inline-flex items-center"
				>
					<span>{t("clearText")}</span>
				</button>
			</div>
			<MentionsInput
				value={text}
				onChange={onTextChange}
				placeholder={placeholder}
				className="mentions__control text-gray-800 dark:text-gray-200"
			>
				<Mention
					trigger="@"
					data={userSuggestions}
					appendSpaceOnAdd
					displayTransform={(id, display) => `[${display}]:`}
				/>
				<Mention
					trigger="#"
					data={silentSuggestions}
					appendSpaceOnAdd
					displayTransform={(id, display) => `[${display}]`}
				/>
			</MentionsInput>
		</>
	);
};

export default ConversationInput;
