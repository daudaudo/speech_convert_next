import type { SvgProps } from "~/types/icon";
import Logo from "~/components/icon/svg/app/Logo";
import ArrowRightToBracket from "~/components/icon/svg/outline/ArrowRightToBracket";
import Gauge from "~/components/icon/svg/outline/Gauge";
import Text from "~/components/icon/svg/outline/Text";
import CircleX from "~/components/icon/svg/outline/CircleX";
import TrashCan from "~/components/icon/svg/outline/TrashCan";
import EN from "~/components/icon/svg/flag/en";
import VI from "~/components/icon/svg/flag/vi";
import ZH from "~/components/icon/svg/flag/zh";
import Share from "~/components/icon/svg/solid/Share";
import UserPlus from "~/components/icon/svg/solid/UserPlus";
import ArrowLeft from "~/components/icon/svg/solid/ArrowLeft";
import ChevronDoubleRight from "~/components/icon/svg/solid/ChevronDoubleRight";
import ChevronDoubleUp from "./solid/ChevronDoubleUp";
import PlayPause from "./solid/PlayPause";
import ArrowDownToBracket from "./solid/ArrowDownToBracket";
import ArrowRight from "./solid/ArrowRight";
import ArrowRotate from "./solid/ArrowRotate";
import VolumeHigh from "./solid/VolumeHigh";
import ChevronDown from "./solid/ChevronDown";
import Check from "./solid/Check";
import Clipboard from "./outline/Clipboard";
import Moon from "./solid/Moon";
import Sun from "./solid/Sun";
import CircleUser from "./solid/CircleUser";
import CloudArrowUp from "./outline/CloudArrowUp";
import File from "./solid/File";
import CircleInfo from "./solid/CircleInfo";
import Xmark from "./solid/Xmark";

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
		"circle-x": CircleX,
		clipboard: Clipboard,
		"cloud-arrow-up": CloudArrowUp,
	},
	solid: {
		share: Share,
		"user-plus": UserPlus,
		"arrow-left": ArrowLeft,
		"arrow-right": ArrowRight,
		"arrow-rotate": ArrowRotate,
		"chevron-double-right": ChevronDoubleRight,
		"chevron-double-up": ChevronDoubleUp,
		"chevron-down": ChevronDown,
		"play-pause": PlayPause,
		"arrow-down-to-bracket": ArrowDownToBracket,
		"volume-high": VolumeHigh,
		check: Check,
		moon: Moon,
		sun: Sun,
		"circle-user": CircleUser,
		file: File,
		"circle-info": CircleInfo,
		"x-mark": Xmark,
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
