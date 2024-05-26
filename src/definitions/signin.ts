import { z } from "zod";

export enum SigninFields {
	email = "email",
	password = "password",
}

export const SigninFormSchema = z.object({
	[SigninFields.email]: z.string().email({ message: "Địa chỉ email không hợp lệ." }).trim(),
	[SigninFields.password]: z
		.string()
		.min(6, { message: "Mật khẩu phải có ít nhất 6 kí tự." })
		.max(20, { message: "Mật khẩu không được quá 20 kí tự." })
		.trim(),
});

export type SigninFormState =
	| {
			errors?: {
				[SigninFields.email]?: string[];
				[SigninFields.password]?: string[];
			};
			message?: string;
	  }
	| undefined;
