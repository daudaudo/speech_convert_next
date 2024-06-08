"use client";

import React, { useMemo, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { SilentTime } from "~/enums/convarsation";
import { CTSPartial, User } from "~/types/CTSTypes";

function parseTextWithUsers(text: string, users: User[]): CTSPartial[] {
	const partials: CTSPartial[] = [];
	const userRegex = /\[([^\]]+)\]\s*([^[]*)/g;
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
					voice: user.voice,
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
	const [text, setText] = useState<string>("");
	const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

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

	const processPartials = (newValue: string) => {
		const partials: CTSPartial[] = parseTextWithUsers(newValue, users);
		onChange(partials);
	};

	const onTextChange = (event: any, newValue: string, newPlainTextValue: string) => {
		setText(newPlainTextValue);
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}
		setTypingTimeout(
			setTimeout(() => {
				processPartials(newValue);
			}, 500),
		);
	};

	return (
		<MentionsInput value={text} onChange={onTextChange} placeholder={placeholder} className="mentions__control">
			<Mention trigger="@" data={userSuggestions} appendSpaceOnAdd displayTransform={(id, display) => `[${display}]`} />
			<Mention
				trigger="#"
				data={silentSuggestions}
				appendSpaceOnAdd
				displayTransform={(id, display) => `[${display}]`}
			/>
		</MentionsInput>
	);
};

export default ConversationInput;
