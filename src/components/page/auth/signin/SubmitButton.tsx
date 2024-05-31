"use client";

import { Button } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
	const { pending } = useFormStatus();
	const t = useTranslations("auth");

	return (
		<Button
			variant="text"
			type="submit"
			disabled={pending}
			className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		>
			{pending ? t("signinPending") : t("signin")}
		</Button>
	);
};

export default SubmitButton;
