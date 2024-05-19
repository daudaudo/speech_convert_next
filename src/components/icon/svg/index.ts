import type { SvgProps } from "~/types/icon";
import Logo from "./app/Logo";
import ArrowRightToBracket from "./outline/ArrowRightToBracket";
import Gauge from "./outline/Gauge";

const IconsMap = {
	app: {
		logo: Logo,
	},
	outline: {
		"arrow-right-to-bracket": ArrowRightToBracket,
		gauge: Gauge,
	},
	solid: {},
};

type SvgName = keyof typeof IconsMap.app | keyof typeof IconsMap.outline | keyof typeof IconsMap.solid;

type SvgType = keyof typeof IconsMap;

export type { SvgName, SvgType };
export default IconsMap as {
	[key: string]: { [key: string]: React.FC<SvgProps> };
};
