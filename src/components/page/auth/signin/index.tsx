"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";
import { PagePath } from "~/enums/path";
import { SigninFields, SigninFormSchema, SigninFormState } from "~/definitions/signin";
import { navigateSigninByGoogleCallback } from "~/actions/data/auth";
import { useToastMessage } from "~/contexts/toast/ToastWrapper";
import SubmitButton from "~/components/page/auth/signin/SubmitButton";
import { useAppDispatch, useAppSelector } from "~/store/store";
import { authActions } from "~/store/slices/auth";

interface Props {}

const SignInForm = ({}: Props) => {
	const dispatch = useAppDispatch();
	const { authencated } = useAppSelector((state) => state.auth);

	const router = useRouter();
	const toast = useToastMessage();
	const t = useTranslations("auth");
	const [state, action] = useFormState<SigninFormState, FormData>(
		async (currentState: SigninFormState, formData: FormData) => {
			try {
				const email = formData.get(SigninFields.email) as string;
				const password = formData.get(SigninFields.password) as string;
				const validatedFields = SigninFormSchema.safeParse({
					email,
					password,
				});
				if (!validatedFields.success) {
					return { errors: validatedFields.error.flatten().fieldErrors };
				}
				dispatch(authActions.login({ email, password }));
			} catch (error: unknown) {
				if (error instanceof Error) {
					return { message: error.message };
				}
			}
			return undefined;
		},
		undefined,
	);

	useEffect(() => {
		if (authencated) {
			router.replace(PagePath.home);
			toast.show(t("signinSuccess"), { autoClose: 3000 });
		}
	}, [authencated, router]);

	const Warning = useMemo(() => {
		const message = state?.message;
		if (!message) {
			return null;
		}
		return (
			<div className="bg-yellow-200 text-yellow-800 p-4 rounded-lg">
				<p className="text-sm font-semibold">{t("signinErrorTitle")}</p>
				<p className="text-sm font-normal">{message}</p>
			</div>
		);
	}, [state?.message]);

	const renderError = useCallback(
		(field: SigninFields) => {
			if (!state?.errors?.[field]) return null;
			const error = t(`definition.${state.errors[field]}`);
			if (!error) return null;
			return <p className="text-red-500 text-xs">{error}</p>;
		},
		[state?.errors],
	);

	return (
		<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
			<div className="p-4 space-y-4 md:space-y-6 sm:p-6">
				<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
					{t("signin")}
				</h1>
				<span className="text-center text-xs font-bold text-primary-500 italic">
					Đăng nhập để sử dụng các chức năng nâng cao
				</span>
				{Warning}
				<form action={action} noValidate className="space-y-4 md:space-y-6">
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t("email")}
						</label>
						<input
							id={SigninFields.email}
							name={SigninFields.email}
							type="email"
							autoComplete="email"
							className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${state?.errors?.email ? "border-red-500" : ""}`}
							placeholder="example@gmail.com"
						/>
						{renderError(SigninFields.email)}
					</div>
					<div>
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t("password")}
						</label>
						<input
							id={SigninFields.password}
							name={SigninFields.password}
							type="password"
							placeholder="••••••••"
							className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${state?.errors?.password ? "border-red-500" : ""}`}
							autoComplete="current-password"
						/>
						{renderError(SigninFields.password)}
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input
									aria-describedby="remember"
									type="checkbox"
									className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
								/>
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
									{t("remember")}
								</label>
							</div>
						</div>
					</div>
					<SubmitButton />
				</form>
				<div className="flex items-center my-4">
					<div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
					<span className="px-4 text-gray-500">{t("or")}</span>
					<div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
				</div>
				<form action={navigateSigninByGoogleCallback} noValidate>
					<Button
						type="submit"
						variant="outlined"
						className="w-full text-gray-800 dark:text-gray-50 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm dark:hover:bg-gray-700 dark:focus:ring-gray-800"
					>
						{t("signinWithGoogle")}
					</Button>
				</form>
				<p className="text-sm font-light text-gray-500 dark:text-gray-400">
					{t("dontHaveAccount")}&nbsp;
					<Link href={PagePath.signup} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
						{t("signup")}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignInForm;
