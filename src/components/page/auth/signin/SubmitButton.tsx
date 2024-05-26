"use client";

import { Button } from "@material-tailwind/react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			variant="text"
			type="submit"
			disabled={pending}
			className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
		>
			{pending ? "Đang đăng nhập..." : "Đăng nhập"}
		</Button>
	);
};

export default SubmitButton;
