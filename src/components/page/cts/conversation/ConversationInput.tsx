"use client";

import React, { useMemo, useState } from "react";
import MentionInput from "~/components/base/MetionInput";
import { CTSPartial, User } from "~/types/CTSTypes";

function parseTextWithUsers(text: string, users: User[]) {
	const partials: CTSPartial[] = [];
	const regex = /\[([^\]]+)\]:?\s*([^[]*)/g;
	let match;
	while ((match = regex.exec(text)) !== null) {
		const userName = match[1];
		const message = match[2].trim();
		const user = users.find((u) => u.name === userName);
		if (user) {
			partials.push({
				name: user.name,
				voice: user.voice,
				text: message,
				silent: 0,
			});
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

	const suggestions = useMemo(() => {
		return users.map((user) => ({ id: user.id, display: user.name }));
	}, [users]);

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

	return <MentionInput value={text} suggestions={suggestions} onChange={onTextChange} placeholder={placeholder} />;
};

export default ConversationInput;
