"use client";

import React from "react";
import { useConvertToText } from "~/contexts/ConvertToTextContext";
import Record from "../base/Record";

const RecordInput = () => {
	const { changeInput } = useConvertToText();

	return <Record createRecordCallback={changeInput} />;
};

export default RecordInput;
