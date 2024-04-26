import Link from "next/link";
import React from "react";
import { PagePath } from "~/enums/path";

interface Props {}

const SignInForm: React.FC<Props> = () => {
	return (
		<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
			<div className="p-4 space-y-4 md:space-y-6 sm:p-6">
				<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
					Đăng nhập
				</h1>
				<form className="space-y-4 md:space-y-6">
					<div>
						<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Email
						</label>
						<input
							id="email"
							type="email"
							name="email"
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="example@gmail.com"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
							Mật khẩu
						</label>
						<input
							type="password"
							name="password"
							placeholder="••••••••"
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						/>
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
