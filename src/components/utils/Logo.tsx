import Link from "next/link";
import React from "react";
import { PagePath } from "~/enums/path";

const Logo = () => {
	return (
		<Link href={PagePath.home} className="self-center text-2xl font-semibold whitespace-nowrap">
			<span className="text-primary-600">Speech Convert</span>
		</Link>
	);
};

export default Logo;
