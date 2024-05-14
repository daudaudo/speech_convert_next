"use client";

import { ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useConvertToText } from "~/contexts/ConvertToTextContext";

const CTTSubmitButton = () => {
	const { requestCreateText, pending, validate } = useConvertToText();

	const validated = validate();

	return (
		<>
			<button
				disabled={!validated || pending}
				onClick={requestCreateText}
				className="hidden md:block z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center w-20 h-20 rounded-full bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-gray-600 cursor-pointer disabled:cursor-not-allowed"
			>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-[100px] bg-gray-50 dark:bg-gray-900" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 w-14 h-14 bg-white focus:ring-4 focus:outline-none border border-gray-200 focus:ring-primary-300 font-medium rounded-full text-sm text-center inline-flex items-center mr-2 dark:bg-primary-600 dark:text-white dark:hover:bg-gray-200 dark:hover:text-primary-600 dark:focus:ring-primary-800 dark:border-gray-600 hover:bg-primary-800 hover:text-white p-3.5">
					{pending ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : <ArrowRightIcon className="h-6 w-6" />}
				</div>
			</button>
			{/* <button disabled={!validated || pending} onClick={requestCreateText} className="block md:hidden w-full h-1">
				{pending ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : <ArrowDownIcon className="h-6 w-6" />}
			</button> */}
		</>
	);
};

export default CTTSubmitButton;
