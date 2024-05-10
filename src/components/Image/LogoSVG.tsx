import React from "react";

interface LogoSVGProps {
	className?: string;
	size?: number;
}
const LogoSVG = (props: LogoSVGProps) => {
	const { className, size = 45 } = props;
	return (
		<svg
			style={{ width: size, height: size }}
			width="70"
			height="70"
			viewBox="0 0 70 70"
			fill="none"
			className={className}
		>
			<rect y="17" width="5" height="47" rx="2.5" fill="url(#paint0_linear_1102_465)" />
			<rect x="13" y="37" width="5" height="27" rx="2.5" fill="url(#paint1_linear_1102_465)" />
			<rect x="26" y="26" width="5" height="38" rx="2.5" fill="url(#paint2_linear_1102_465)" />
			<rect x="39" y="6" width="5" height="58" rx="2.5" fill="url(#paint3_linear_1102_465)" />
			<rect x="52" y="31" width="5" height="33" rx="2.5" fill="url(#paint4_linear_1102_465)" />
			<rect x="65" y="40" width="5" height="24" rx="2.5" fill="url(#paint5_linear_1102_465)" />
			<defs>
				<linearGradient id="paint0_linear_1102_465" x1="2.5" y1="17" x2="2.5" y2="64" gradientUnits="userSpaceOnUse">
					<stop stopColor="#F89C34" />
					<stop offset="1" stopColor="#E66000" />
				</linearGradient>
				<linearGradient id="paint1_linear_1102_465" x1="15.5" y1="37" x2="15.5" y2="64" gradientUnits="userSpaceOnUse">
					<stop stopColor="#F89C34" />
					<stop offset="1" stopColor="#E66000" />
				</linearGradient>
				<linearGradient id="paint2_linear_1102_465" x1="28.5" y1="26" x2="28.5" y2="64" gradientUnits="userSpaceOnUse">
					<stop stopColor="#F89C34" />
					<stop offset="1" stopColor="#E66000" />
				</linearGradient>
				<linearGradient id="paint3_linear_1102_465" x1="41.5" y1="6" x2="41.5" y2="64" gradientUnits="userSpaceOnUse">
					<stop stopColor="#F89C34" />
					<stop offset="1" stopColor="#E66000" />
				</linearGradient>
				<linearGradient id="paint4_linear_1102_465" x1="54.5" y1="31" x2="54.5" y2="64" gradientUnits="userSpaceOnUse">
					<stop stopColor="#F89C34" />
					<stop offset="1" stopColor="#E66000" />
				</linearGradient>
				<linearGradient id="paint5_linear_1102_465" x1="67.5" y1="40" x2="67.5" y2="64" gradientUnits="userSpaceOnUse">
					<stop stopColor="#F89C34" />
					<stop offset="1" stopColor="#E66000" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default LogoSVG;
