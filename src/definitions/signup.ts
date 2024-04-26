import { z } from "zod";

export const SignupFormSchema = z.object({
	username: z.string().min(6, { message: "Tên phải có ít nhất 6 kí tự" }).trim(),
	email: z.string().email({ message: "Địa chỉ email không hợp lệ." }).trim(),
	password: z
		.string()
		.min(6, { message: "Mật khẩu phải có ít nhất 6 kí tự" })
		.max(20, { message: "Mật khẩu không được quá 20 kí tự" })
		// .regex(/[a-zA-Z]/, { message: "Phải chứa ít nhất một chữ cái." })
		// .regex(/[0-9]/, { message: "Phải chứa ít nhất một số." })
		// .regex(/[^a-zA-Z0-9]/, {
		// 	message: "Phải chứa ít nhất một kí tự đặc biệt.",
		// })
		.trim(),
});

export type SignupFormState =
	| {
			errors?: {
				username?: string[];
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;
