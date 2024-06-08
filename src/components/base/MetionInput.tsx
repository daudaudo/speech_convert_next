"use client";

import React from "react";
import { Mention, MentionItem, MentionsInput, SuggestionDataItem } from "react-mentions";

interface Props {
	value?: string;
	suggestions: SuggestionDataItem[];
	placeholder?: string | undefined;
	onChange?: (
		event: { target: { value: string } },
		newValue: string,
		newPlainTextValue: string,
		mentions: MentionItem[],
	) => void;
}

const MentionInput = ({ value, suggestions = [], onChange, placeholder }: Props) => {
	return (
		<MentionsInput value={value} onChange={onChange} placeholder={placeholder} className="mentions__control">
			<Mention
				trigger="@"
				data={suggestions}
				appendSpaceOnAdd
				className="mentions"
				displayTransform={(id, display) => `[${display}]`}
			/>
			<Mention
				trigger="#"
				data={suggestions}
				appendSpaceOnAdd
				className="mentions"
				displayTransform={(id, display) => `[${display}]`}
			/>
		</MentionsInput>
	);
};

export default MentionInput;
