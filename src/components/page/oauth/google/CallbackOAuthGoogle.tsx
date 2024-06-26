"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { signinByGoogle } from "~/actions/signinGoogle";
import LoadingPage from "~/components/animations/LoadingPage";
import { useAuth } from "~/contexts/auth/AuthContext";
import { useToastMessage } from "~/contexts/toast/ToastWrapper";
import { PagePath } from "~/enums/path";
import withSuspense from "~/hocs/withSuspense";

interface Props {}

const CallbackOAuthGoogleView = ({}: Props) => {
	const toast = useToastMessage();
	const router = useRouter();
	const searchParams = useSearchParams();
	const t = useTranslations("auth");
	const { signin } = useAuth();

	useEffect(() => {
		const code = searchParams.get("code");
		if (!code || !code.trim().length) {
			router.replace(PagePath.signin);
			toast.error(t("signinGoogleError"));
		} else {
			(async () => {
				try {
					await signinByGoogle(code);
					await signin();
					router.replace(PagePath.home);
					toast.info(t("signinGoogleSuccess"), { autoClose: 3000 });
				} catch {
					router.replace(PagePath.signin);
					toast.error(t("signinGoogleError"));
				}
			})();
		}
	}, []);

	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
			<LoadingPage />
		</div>
	);
};

const CallbackOAuthGoogle = withSuspense(CallbackOAuthGoogleView);

export default CallbackOAuthGoogle;
