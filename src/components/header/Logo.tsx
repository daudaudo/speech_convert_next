import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import SvgIcon from "~/components/icon/SvgIcon";
import { PagePath } from "~/enums/path";

const Logo = () => {
	const t = useTranslations();
	return (
		<Link href={PagePath.home} className="flex items-center gap-2 self-center text-xl font-semibold whitespace-nowrap">
			<SvgIcon name="logo" width={30} height={30} />
			<span className="text-primary-600">{t("app.title")}</span>
		</Link>
	);
};

export default Logo;
