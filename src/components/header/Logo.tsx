import Link from "next/link";
import React from "react";
import SvgIcon from "~/components/icon/SvgIcon";
import { PagePath } from "~/enums/path";

const Logo = () => {
	return (
		<Link href={PagePath.home} className="flex items-center gap-2 self-center text-xl font-semibold whitespace-nowrap">
			<SvgIcon name="logo" width={30} height={30} />
			<span className="text-primary-600">Speech Convert</span>
		</Link>
	);
};

export default Logo;
