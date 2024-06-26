import React from "react";
import type { SvgProps } from "~/types/icon";

const Text = ({ width, height, color }: SvgProps) => {
	return (
		<svg style={{ width, height }} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path d="M48 80v48c0 13.3-10.7 24-24 24s-24-10.7-24-24V72C0 49.9 17.9 32 40 32H408c22.1 0 40 17.9 40 40v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V80H248l0 352h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24h48l0-352H48z" />
		</svg>
	);
};

export default Text;
