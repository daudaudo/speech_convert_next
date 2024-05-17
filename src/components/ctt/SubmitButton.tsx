"use client";

import { ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useConvertToText } from "~/contexts/ConvertToTextContext";

const CTTSubmitButton = () => {
	const { requestCreateText, pending, validate } = useConvertToText();

	const validated = validate();

	return (
		<button
			disabled={!validated || pending}
			onClick={requestCreateText}
			className="w-full h-full inline-flex items-center justify-center"
		>
			<div className="inline-flex items-center justify-center text-gray-600 w-14 h-14 bg-white focus:ring-4 focus:outline-none border border-gray-200 focus:ring-primary-300 font-medium rounded-full text-sm text-center dark:bg-primary-600 dark:text-white dark:hover:bg-gray-200 dark:hover:text-primary-600 dark:focus:ring-primary-800 dark:border-gray-600 hover:bg-primary-800 hover:text-white">
				{pending ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : <ArrowRightIcon className="h-6 w-6" />}
			</div>
		</button>
	);
};

export default CTTSubmitButton;
