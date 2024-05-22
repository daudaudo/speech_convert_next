"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { signinByGoogle } from "~/actions/signinGoogle";
import Loading from "~/components/animations/Loading";
import { PagePath } from "~/enums/path";

interface Props {}

const CallbackOAuthGoogle = ({}: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const code = searchParams.get("code");
		if (!code || !code.trim().length) {
			router.replace(PagePath.signin);
		} else {
			signinByGoogle(code)
				.then(() => {
					router.replace(PagePath.home);
				})
				.catch(() => {
					router.replace(PagePath.signin);
				});
		}
	}, []);

	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
			<Loading />
		</div>
	);
};

export default CallbackOAuthGoogle;
