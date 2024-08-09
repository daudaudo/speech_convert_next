"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import LoadingPage from "~/components/animations/LoadingPage";
import { useToastMessage } from "~/contexts/toast/ToastWrapper";
import { PagePath } from "~/enums/path";
import withSuspense from "~/hocs/withSuspense";
import { useAppDispatch, useAppSelector } from "~/store/store";
import { authActions } from "~/store/slices/auth";

interface Props {}

const CallbackOAuthGoogleView = ({}: Props) => {
	const dispatch = useAppDispatch();
	const { authencated, error } = useAppSelector((state) => state.auth);

	const t = useTranslations("auth");
	const toast = useToastMessage();
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const code = searchParams.get("code");
		if (!code || !code.trim().length || error) {
			router.replace(PagePath.signin);
			toast.error(t("signinGoogleError"));
		} else if (authencated) {
			router.replace(PagePath.home);
			toast.info(t("signinGoogleSuccess"), { autoClose: 3000 });
		} else {
			dispatch(authActions.loginByGoogle({ code }));
		}
	}, [authencated, error, router]);

	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
			<LoadingPage />
		</div>
	);
};

const CallbackOAuthGoogle = withSuspense(CallbackOAuthGoogleView);

export default CallbackOAuthGoogle;
