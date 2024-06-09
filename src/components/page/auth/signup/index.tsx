"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SignupFields, SignupFormSchema, SignupFormState } from "~/definitions/signup";
import { PagePath } from "~/enums/path";
import { register } from "~/actions/usecase/auth";
import { useAuth } from "~/contexts/auth/AuthContext";
import SubmitButton from "~/components/page/auth/signup/SubmitButton";
import { useToastMessage } from "~/contexts/toast/ToastWrapper";

interface Props {}

const SignUpForm = ({}: Props) => {
	const router = useRouter();
	const auth = useAuth();
	const toast = useToastMessage();
	const t = useTranslations("auth");
	const [state, action] = useFormState<SignupFormState, FormData>(
		async (currentState: SignupFormState, formData: FormData) => {
			try {
				const username = formData.get(SignupFields.username) as string;
				const email = formData.get(SignupFields.email) as string;
				const password = formData.get(SignupFields.password) as string;

				const validatedFields = SignupFormSchema.safeParse({ username, email, password });
				if (!validatedFields.success) {
					return { errors: validatedFields.error.flatten().fieldErrors };
				}

				await register({ username, email, password });

				if (auth.signin) {
					await auth.signin();
					toast.show(t("signupSuccess"));
				} else {
					toast.show(t("signupError"));
					window.location.href = PagePath.home;
				}

				router.replace(PagePath.home);
			} catch (error: unknown) {
				if (error instanceof Error) {
					return { message: error.message };
				}
			}
		},
		undefined,
	);

	const renderWarning = useCallback(() => {
		const message = state?.message;
		if (!message) return null;
		return (
			<div className="bg-yellow-200 text-yellow-800 p-4 rounded-lg">
				<p className="text-sm font-semibold">{t("signupErrorTitle")}</p>
				<p className="text-sm font-normal">{message}</p>
			</div>
		);
	}, [state]);

	const renderError = useCallback(
		(field: SignupFields) => {
			if (!state?.errors?.[field]) return null;
			const error = t(`definition.${state.errors[field]}`);
			if (!error) return null;
			return <p className="text-red-500 text-xs">{error}</p>;
		},
		[state?.errors],
	);

	return (
		<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
			<div className="p-4 space-y-4 md:space-y-6">
				<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
					{t("signup")}
				</h1>
				{renderWarning()}
				<form action={action} noValidate className="space-y-4 md:space-y-6">
					<div>
						<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t("username")}
						</label>
						<input
							type="text"
							name={SignupFields.username}
							id={SignupFields.username}
							className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${state?.errors?.username ? "border-red-500" : ""}`}
							placeholder={t("usernamePlaceholder")}
						/>
						{renderError(SignupFields.username)}
					</div>
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t("email")}
						</label>
						<input
							type="email"
							name={SignupFields.email}
							id={SignupFields.email}
							placeholder="example@gmail.com"
							autoComplete="email"
							className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${state?.errors?.email ? "border-red-500" : ""}`}
						/>
						{renderError(SignupFields.email)}
					</div>
					<div>
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t("password")}
						</label>
						<input
							type="password"
							name={SignupFields.password}
							id={SignupFields.password}
							placeholder="••••••••"
							autoComplete="new-password"
							className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${state?.errors?.password ? "border-red-500" : ""}`}
						/>
						{renderError(SignupFields.password)}
					</div>
					<div>
						<label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							{t("confirmPassword")}
						</label>
						<input
							type="password"
							name={SignupFields.confirmPassword}
							id={SignupFields.confirmPassword}
							placeholder="••••••••"
							autoComplete="new-password"
							className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 }`}
						/>
						{renderError(SignupFields.confirmPassword)}
					</div>
					<SubmitButton />
					<p className="text-sm font-light text-gray-500 dark:text-gray-400">
						{t("haveAccount")}&nbsp;
						<Link href={PagePath.signin} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
							{t("signin")}
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
