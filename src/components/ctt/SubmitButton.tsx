"use client";

import React from "react";
import SvgIcon from "~/components/icon/SvgIcon";

interface Props {
	validated: boolean;
	pending: boolean;
	submit: () => void;
}

const CTTSubmitButton = ({ validated, pending, submit }: Props) => {
	return (
		<button
			disabled={!validated || pending}
			onClick={submit}
			className="w-full h-full inline-flex items-center justify-center rounded-full"
		>
			<div className="inline-flex items-center justify-center text-gray-600 w-14 h-14 bg-white focus:ring-4 focus:outline-none border border-gray-200 focus:ring-primary-300 font-medium rounded-full text-sm text-center dark:bg-primary-500 dark:text-white dark:hover:bg-gray-200 dark:hover:text-primary-600 dark:focus:ring-primary-800 dark:border-gray-600 hover:bg-primary-500 hover:text-white">
				{pending ? (
					<SvgIcon name="arrow-rotate" type="solid" width={24} height={24} className="animate-spin" />
				) : (
					<SvgIcon name="arrow-right" type="solid" width={24} height={24} />
				)}
			</div>
		</button>
	);
};

export default CTTSubmitButton;
