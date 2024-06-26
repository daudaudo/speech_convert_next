import React from "react";
import type { SvgProps } from "~/types/icon";

const VI = ({ width, height }: SvgProps) => {
	return (
		<svg style={{ width, height }} width="513" height="343" viewBox="0 0 513 343" fill="none">
			<g clipPath="url(#clip0_301_64)">
				<path d="M197.025 0.960205H0V342.953H513V0.960205H197.025Z" fill="#D80027" />
				<path
					d="M256.5 73.0427L279.207 142.926H352.688L293.24 186.116L315.948 256.001L256.5 212.81L197.052 256.001L219.76 186.116L160.312 142.926H233.793L256.5 73.0427Z"
					fill="#FFDA44"
				/>
			</g>
			<defs>
				<clipPath id="clip0_301_64">
					<rect width="513" height="342" fill="white" transform="translate(0 0.956299)" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default VI;
