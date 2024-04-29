"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import { useFormState } from "react-dom";
import { signup } from "~/actions/signup";
import { SignupFields, SignupFormState } from "~/definitions/signup";
import { PagePath } from "~/enums/path";

interface Props {}

const SignUpForm: React.FC<Props> = () => {
	const [state, action] = useFormState<SignupFormState, FormData>(signup, undefined);

	const renderWarning = useCallback(() => {
		const message = state?.message;
		if (!message) return null;
		return (
			<div className="bg-yellow-200 text-yellow-800 p-4 rounded-lg">
				<p className="text-sm font-medium">Đăng kí không thành công</p>
				<p className="text-sm font-normal">{message}</p>
			</div>
		);
	}, [state]);

	const renderError = useCallback(
		(field: SignupFields) => {
			if (!state?.errors) return null;
			const error = state.errors[field];
			if (!error) return null;
			return <p className="text-red-500 text-xs">{error}</p>;
		},
		[state?.errors],
	);

	return (
		<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
			<div className="p-4 space-y-4 md:space-y-6">
				<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
					Đăng kí
				</h1>
				{renderWarning()}
				<form action={action} noValidate className="space-y-4 md:space-y-6">
					<div>
						<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Tên của bạn
						</label>
						<input
							type="text"
							name={SignupFields.username}
							id={SignupFields.username}
							className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${state?.errors?.username ? "border-red-500" : ""}`}
							placeholder="Tên của bạn"
						/>
						{renderError(SignupFields.username)}
					</div>
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Email
						</label>
						<input
							type="email"
							name={SignupFields.email}
							id={SignupFields.email}
							className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${state?.errors?.email ? "border-red-500" : ""}`}
							placeholder="example@gmail.com"
						/>
						{renderError(SignupFields.email)}
					</div>
					<div>
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Mật khẩu
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
							Xác nhận mật khẩu
						</label>
						<input
							type="password"
							name={SignupFields.confirmPassword}
							id={SignupFields.confirmPassword}
							placeholder="••••••••"
							autoComplete="new-password"
							className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 }`}
						/>
						{/* {renderError(SignupFields.confirmPassword)} */}
					</div>
					{/* <div className="flex items-start">
						<div className="flex items-center h-5">
							<input
								id="terms"
								aria-describedby="terms"
								type="checkbox"
								className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
								required
							/>
						</div>
						<div className="ml-3 text-sm">
							<label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
								Tôi đồng ý với&nbsp;
								<Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
									Điều khoản Dịch vụ
								</Link>
							</label>
						</div>
					</div> */}
					<button
						type="submit"
						className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						Tạo tài khoản
					</button>
					<p className="text-sm font-light text-gray-500 dark:text-gray-400">
						Bạn đã có tài khoản?&nbsp;
						<Link href={PagePath.signin} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
							Đăng nhập
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
