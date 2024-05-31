"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
	const { pending } = useFormStatus();
	const t = useTranslations("auth");

	return (
		<button
			type="submit"
			disabled={pending}
			className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		>
			{pending ? t("signupPending") : t("signup")}
		</button>
	);
};

export default SubmitButton;
