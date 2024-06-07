import type { SvgProps } from "~/types/icon";
import Logo from "~/components/icon/svg/app/Logo";
import ArrowRightToBracket from "~/components/icon/svg/outline/ArrowRightToBracket";
import Gauge from "~/components/icon/svg/outline/Gauge";
import Text from "~/components/icon/svg/outline/Text";
import TrashCan from "~/components/icon/svg/outline/TrashCan";
import EN from "~/components/icon/svg/flag/en";
import VI from "~/components/icon/svg/flag/vi";
import ZH from "~/components/icon/svg/flag/zh";
import Share from "~/components/icon/svg/solid/share";
import UserPlus from "~/components/icon/svg/solid/UserPlus";

const IconsMap = {
	app: {
		logo: Logo,
	},
	flag: {
		en: EN,
		vi: VI,
		zh: ZH,
	},
	outline: {
		"arrow-right-to-bracket": ArrowRightToBracket,
		gauge: Gauge,
		text: Text,
		"trash-can": TrashCan,
	},
	solid: {
		share: Share,
		"user-plus": UserPlus,
	},
};

type SvgName =
	| keyof typeof IconsMap.app
	| keyof typeof IconsMap.flag
	| keyof typeof IconsMap.outline
	| keyof typeof IconsMap.solid;

type SvgType = keyof typeof IconsMap;

export type { SvgName, SvgType };
export default IconsMap as {
	[key: string]: { [key: string]: React.FC<SvgProps> };
};
