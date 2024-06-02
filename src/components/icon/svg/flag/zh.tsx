import React from "react";
import type { SvgProps } from "~/types/icon";

const ZH = ({ width, height }: SvgProps) => {
	return (
		<svg
			style={{ width, height }}
			width="521"
			height="350"
			viewBox="0 0 521 350"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_301_1408)" filter="url(#filter0_d_301_1408)">
				<path d="M4 -0.00585938H517V341.994H4V-0.00585938Z" fill="#D80027" />
				<path
					d="M230.8 239.194L221.1 223.594L203.2 227.994L215.1 213.894L205.4 198.294L222.5 205.194L234.3 191.094L233 209.494L250.1 216.394L232.2 220.794L230.8 239.194ZM294.6 81.994L284.5 97.394L296.1 111.694L278.4 106.894L268.3 122.394L267.3 103.994L249.6 99.194L266.8 92.594L265.8 74.194L277.4 88.494L294.6 81.994ZM240.2 25.394L238.2 43.694L255 51.294L237 55.094L235 73.394L225.8 57.394L207.9 61.194L220.2 47.494L211 31.594L227.8 39.094L240.2 25.394ZM296.8 161.794L281.9 172.694L287.7 190.194L272.8 179.394L257.9 190.394L263.5 172.794L248.6 162.094L267 161.994L272.6 144.394L278.4 161.894L296.8 161.794ZM119 46.294L136.3 99.794H192.5L147.1 132.694L164.4 186.194L119 153.194L73.5 186.194L90.9 132.694L45.4 99.794H101.7L119 46.294Z"
					fill="#FFDA44"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_301_1408"
					x="0"
					y="-0.00585938"
					width="521"
					height="350"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_301_1408" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_301_1408" result="shape" />
				</filter>
				<clipPath id="clip0_301_1408">
					<rect width="513" height="342" fill="white" transform="translate(4 -0.00585938)" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default ZH;
