import React from "react";
import { SvgProps } from "~/types/icon";
import IconsMap, { SvgName, SvgType } from "~/components/icon/svg";

type SvgIconProps = {
	name: SvgName;
	type?: SvgType;
	className?: string;
} & SvgProps;

const SvgIcon = (props: SvgIconProps) => {
	const { name, type = "app", width, height, color = "currentColor", className } = props;

	if (!IconsMap[type] || !IconsMap[type][name]) {
		return null;
	}

	const SvgComponent = IconsMap[type][name];

	return (
		<div id={name} className={`svg-icon ${className ?? ""}`}>
			<SvgComponent width={width} height={height} color={color} />
		</div>
	);
};

export default SvgIcon;
