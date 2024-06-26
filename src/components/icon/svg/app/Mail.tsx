import React from "react";
import type { SvgProps } from "~/types/icon";

const Mail = ({ width, height }: SvgProps) => {
	return (
		<svg
			style={{ width, height }}
			width="48"
			height="48"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
				fill="#0971BD"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.8 17.1754C12.8 17.1754 22.4595 22.653 24.3344 22.653C26.2995 22.653 35.8544 17.28 35.8544 17.28L35.8698 16.32C35.8698 15.2602 35.0096 14.4 33.9469 14.4H14.7219C13.6602 14.4 12.8 15.2602 12.8 16.32V17.1754ZM35.8544 20.16C35.8544 20.16 26.3898 25.293 24.3344 25.293C22.4595 25.293 12.8144 20.16 12.8154 20.16L12.8 31.68C12.8 32.7399 13.6611 33.6 14.7219 33.6H33.9469C35.0096 33.6 35.8698 32.7399 35.8698 31.68L35.8544 20.16Z"
				fill="white"
			/>
		</svg>
	);
};

export default Mail;
