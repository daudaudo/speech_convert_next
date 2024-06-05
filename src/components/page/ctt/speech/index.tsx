"use client";

import React from "react";
import Record from "~/components/base/Record";
import { useConvertToText } from "~/contexts/ConvertToTextContext";

const SpeechToTextPage = () => {
	const { changeInput } = useConvertToText();

	return <Record createRecordCallback={changeInput} />;
};

export default SpeechToTextPage;
