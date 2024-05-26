import type { SvgProps } from "~/types/icon";
import Logo from "~/components/icon/svg/app/Logo";
import ArrowRightToBracket from "~/components/icon/svg/outline/ArrowRightToBracket";
import Gauge from "~/components/icon/svg/outline/Gauge";
import Text from "~/components/icon/svg/outline/Text";

const IconsMap = {
	app: {
		logo: Logo,
	},
	outline: {
		"arrow-right-to-bracket": ArrowRightToBracket,
		gauge: Gauge,
		text: Text,
	},
	solid: {},
};

type SvgName = keyof typeof IconsMap.app | keyof typeof IconsMap.outline | keyof typeof IconsMap.solid;

type SvgType = keyof typeof IconsMap;

export type { SvgName, SvgType };
export default IconsMap as {
	[key: string]: { [key: string]: React.FC<SvgProps> };
};
