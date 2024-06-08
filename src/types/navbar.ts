import { SvgName } from "~/components/icon/svg";
import { PagePath } from "~/enums/path";

type NavbarItem = {
	path: PagePath;
	label: string;
	iconName?: SvgName;
};

export type { NavbarItem };
