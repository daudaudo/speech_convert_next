import type { SvgProps } from "~/types/icon";
import Logo from "~/components/icon/svg/app/Logo";
import ArrowRightToBracket from "~/components/icon/svg/outline/ArrowRightToBracket";
import Gauge from "~/components/icon/svg/outline/Gauge";
import TextOutline from "~/components/icon/svg/outline/Text";
import CircleX from "~/components/icon/svg/outline/CircleX";
import TrashCan from "~/components/icon/svg/outline/TrashCan";
import EN from "~/components/icon/svg/flag/en";
import VI from "~/components/icon/svg/flag/vi";
import ZH from "~/components/icon/svg/flag/zh";
import Share from "~/components/icon/svg/solid/Share";
import UserPlus from "~/components/icon/svg/solid/UserPlus";
import ArrowLeft from "~/components/icon/svg/solid/ArrowLeft";
import ChevronDoubleRight from "~/components/icon/svg/solid/ChevronDoubleRight";
import TextSolid from "~/components/icon/svg/solid/Text";
import FileOutline from "~/components/icon/svg/outline/File";
import MessagesOutline from "~/components/icon/svg/outline/Messages";
import MessagesSolid from "~/components/icon/svg/solid/Messages";
import ChevronDoubleUp from "~/components/icon/svg/solid/ChevronDoubleUp";
import PlayPause from "~/components/icon/svg/solid/PlayPause";
import ArrowDownToBracket from "~/components/icon/svg/solid/ArrowDownToBracket";
import ArrowRight from "~/components/icon/svg/solid/ArrowRight";
import ArrowRotate from "~/components/icon/svg/solid/ArrowRotate";
import VolumeHighSolid from "~/components/icon/svg/solid/VolumeHigh";
import ChevronDown from "~/components/icon/svg/solid/ChevronDown";
import Check from "~/components/icon/svg/solid/Check";
import Moon from "~/components/icon/svg/solid/Moon";
import Sun from "~/components/icon/svg/solid/Sun";
import CircleUser from "~/components/icon/svg/solid/CircleUser";
import FileSolid from "~/components/icon/svg/solid/File";
import CircleInfo from "~/components/icon/svg/solid/CircleInfo";
import Xmark from "~/components/icon/svg/solid/Xmark";
import CloudArrowUp from "~/components/icon/svg/outline/CloudArrowUp";
import Clipboard from "~/components/icon/svg/outline/Clipboard";
import MicrophoneSolid from "~/components/icon/svg/solid/Microphone";
import MicrophoneOutline from "~/components/icon/svg/outline/Microphone";
import LanguageOutline from "~/components/icon/svg/outline/Language";
import LanguageSolid from "~/components/icon/svg/solid/Language";
import BarsOutline from "~/components/icon/svg/outline/Bars";
import BarsSolid from "~/components/icon/svg/solid/Bars";
import VolumeHighOutline from "~/components/icon/svg/outline/VolumeHigh";
import Facebook from "~/components/icon/svg/app/Facebook";
import Youtube from "~/components/icon/svg/app/Youtube";
import Mail from "~/components/icon/svg/app/Mail";

const IconsMap = {
	app: {
		logo: Logo,
		facebook: Facebook,
		youtube: Youtube,
		mail: Mail,
	},
	flag: {
		en: EN,
		vi: VI,
		zh: ZH,
	},
	outline: {
		"arrow-right-to-bracket": ArrowRightToBracket,
		gauge: Gauge,
		text: TextOutline,
		"trash-can": TrashCan,
		"circle-x": CircleX,
		clipboard: Clipboard,
		"cloud-arrow-up": CloudArrowUp,
		file: FileOutline,
		messages: MessagesOutline,
		microphone: MicrophoneOutline,
		language: LanguageOutline,
		bars: BarsOutline,
		"volume-high": VolumeHighOutline,
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
		"volume-high": VolumeHighSolid,
		check: Check,
		moon: Moon,
		sun: Sun,
		"circle-user": CircleUser,
		file: FileSolid,
		"circle-info": CircleInfo,
		"x-mark": Xmark,
		text: TextSolid,
		messages: MessagesSolid,
		microphone: MicrophoneSolid,
		language: LanguageSolid,
		bars: BarsSolid,
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
