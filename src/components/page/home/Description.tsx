"use client";

import { useTranslations } from "next-intl";
import React from "react";

const Description = () => {
	const t = useTranslations("home");

	return (
		<section className="flex flex-col gap-2 w-full px-2">
			<span className="font-thin text-lg text-gray-700 dark:text-gray-200">{t("description")}</span>
			<div className="font-bold text-xl text-gray-700 dark:text-gray-200">{t("featureTitle")}</div>
			<ul>
				<li className="font-thin text-lg text-gray-700 dark:text-gray-200">
					<span className="font-bold">{t("features.feature1.title")}</span> {t("features.feature1.description")}
				</li>
				<li className="font-thin text-lg text-gray-700 dark:text-gray-200">
					<span className="font-bold">{t("features.feature2.title")}</span> {t("features.feature2.description")}
				</li>
				<li className="font-thin text-lg text-gray-700 dark:text-gray-200">
					<span className="font-bold">{t("features.feature3.title")}</span> {t("features.feature3.description")}
				</li>
				<li className="font-thin text-lg text-gray-700 dark:text-gray-200">
					<span className="font-bold">{t("features.feature4.title")}</span> {t("features.feature4.description")}
				</li>
				<li className="font-thin text-lg text-gray-700 dark:text-gray-200">
					<span className="font-bold">{t("features.feature5.title")}</span> {t("features.feature5.description")}
				</li>
			</ul>
			<span className="font-thin text-lg text-gray-700 dark:text-gray-200">{t("getStarted")}</span>
		</section>
	);
};

export default Description;
