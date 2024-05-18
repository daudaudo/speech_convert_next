"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { signinByGoogle } from "~/actions/signinGoogle";

interface Props {
	code: string | undefined;
}
const SigninByGoogle = ({ code }: Props) => {
	const searchParams = useSearchParams();
	useEffect(() => {
		const action = async () => {
			try {
				if (code) await signinByGoogle(code);
			} catch (error) {
				throw error;
			}
		};
		action();
	}, [code]);

	return <div />;
};

export default SigninByGoogle;
