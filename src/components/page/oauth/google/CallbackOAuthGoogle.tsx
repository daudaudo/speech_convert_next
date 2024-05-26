"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { signinByGoogle } from "~/actions/signinGoogle";
import Loading from "~/components/animations/Loading";
import { useAuth } from "~/contexts/auth/AuthContext";
import { useToastMessage } from "~/contexts/toast/ToastWrapper";
import { PagePath } from "~/enums/path";
import withSuspense from "~/hocs/withSuspense";

interface Props {}

const CallbackOAuthGoogleView = ({}: Props) => {
	const toast = useToastMessage();
	const router = useRouter();
	const searchParams = useSearchParams();
	const { signin } = useAuth();

	useEffect(() => {
		const code = searchParams.get("code");
		if (!code || !code.trim().length) {
			router.replace(PagePath.signin);
			toast.error("Đăng nhập Google thất bại. Vui lòng thử lại.");
		} else {
			(async () => {
				try {
					await signinByGoogle(code);
					await signin();
					router.replace(PagePath.home);
					toast.info("Đăng nhập bằng Google thành công.", { autoClose: 3000 });
				} catch {
					router.replace(PagePath.signin);
					toast.error("Đăng nhập Google thất bại. Vui lòng thử lại.");
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

const CallbackOAuthGoogle = withSuspense(CallbackOAuthGoogleView);

export default CallbackOAuthGoogle;
