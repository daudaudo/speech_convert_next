"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { signinByGoogle } from "~/actions/signinGoogle";
import Loading from "~/components/animations/Loading";
import { useAuth } from "~/contexts/auth/AuthContext";
import { PagePath } from "~/enums/path";

interface Props {}

const CallbackOAuthGoogle = ({}: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { signin } = useAuth();

	useEffect(() => {
		const code = searchParams.get("code");

		if (!code || !code.trim().length) {
			router.replace(PagePath.signin);
		} else {
			(async () => {
				try {
					await signinByGoogle(code);
					if (signin) {
						await signin();
						router.replace(PagePath.textToSpeech);
					} else {
						window.location.href = PagePath.textToSpeech;
					}
				} catch {
					router.replace(PagePath.signin);
				}
			})();
		}
	}, []);

	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
			<Loading />
		</div>
	);
};

export default CallbackOAuthGoogle;
