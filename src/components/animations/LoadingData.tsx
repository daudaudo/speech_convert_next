"use client";

import React from "react";
import SvgIcon from "~/components/icon/SvgIcon";

const DEFAULT_SIZE = 50;

interface Props {
	size?: number;
}

const LoadingData = ({ size = DEFAULT_SIZE }: Props) => {
	return (
		<div className="w-full p-4 inline-flex items-center justify-center text-gray-700 dark:text-gray-300">
			<SvgIcon name="arrow-rotate" type="solid" width={size} height={size} className="animate-spin" />
		</div>
	);
};

export default LoadingData;
