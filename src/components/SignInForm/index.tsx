"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import { useFormState } from "react-dom";
import { PagePath } from "~/enums/path";
import { signin } from "~/actions/signin";
import { SigninFields, SigninFormState } from "~/definitions/signin";

interface Props {}

const SignInForm: React.FC<Props> = () => {
	const [state, action] = useFormState<SigninFormState, FormData>(signin, undefined);

	const renderWarning = useCallback(() => {
		const message = state?.message;
		if (!message) return null;
		return (
			<div className="bg-yellow-200 text-yellow-800 p-4 rounded-lg">
				<p className="text-sm font-medium">Đăng nhập không thành công</p>
				<p className="text-sm font-normal">{message}</p>
			</div>
		);
	}, [state]);

	const renderError = useCallback(
		(field: SigninFields) => {
			if (!state?.errors) return null;
			const error = state.errors[field];
			if (!error) return null;
			return <p className="text-red-500 text-xs">{error}</p>;
		},
		[state?.errors],
	);

	return (
		<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
			<div className="p-4 space-y-4 md:space-y-6 sm:p-6">
				<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
					Đăng nhập
				</h1>
				{renderWarning()}
				<form action={action} noValidate className="space-y-4 md:space-y-6">
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Email
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
							Mật khẩu
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
									Ghi nhớ
								</label>
							</div>
						</div>
						{/* <Link
							href={PagePath.accountRecovery}
							className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
						>
							Quên mật khẩu?
						</Link> */}
					</div>
					<button
						type="submit"
						className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						Đăng nhập
					</button>
					<p className="text-sm font-light text-gray-500 dark:text-gray-400">
						Bạn chưa có tài khoản?&nbsp;
						<Link href={PagePath.signup} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
							Đăng ký
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignInForm;
