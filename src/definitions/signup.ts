import { z } from "zod";

export enum SignupFields {
	username = "username",
	email = "email",
	password = "password",
	confirmPassword = "confirm-password",
}

export const SignupFormSchema = z.object({
	[SignupFields.username]: z.string().min(6, { message: "Tên phải có ít nhất 6 kí tự." }).trim(),
	[SignupFields.email]: z.string().email({ message: "Địa chỉ email không hợp lệ." }).trim(),
	[SignupFields.password]: z
		.string()
		.min(6, { message: "Mật khẩu phải có ít nhất 6 kí tự." })
		.max(20, { message: "Mật khẩu không được quá 20 kí tự." })
		// .regex(/[a-zA-Z]/, { message: "Phải chứa ít nhất một chữ cái." })
		// .regex(/[0-9]/, { message: "Phải chứa ít nhất một số." })
		// .regex(/[^a-zA-Z0-9]/, {
		// 	message: "Phải chứa ít nhất một kí tự đặc biệt.",
		// })
		.trim(),
	// [SignupFields.confirmPassword]: z.string().min(1, { message: "Vui lòng xác nhận mật khẩu." }).trim(),
});
// .refine((data) => data[SignupFields.password] === data[SignupFields.confirmPassword], {
// 	message: "Mật khẩu không khớp.",
// 	path: [SignupFields.confirmPassword],
// });

export type SignupFormState =
	| {
			errors?: {
				[SignupFields.username]?: string[];
				[SignupFields.email]?: string[];
				[SignupFields.password]?: string[];
				[SignupFields.confirmPassword]?: string[];
			};
			message?: string;
	  }
	| undefined;
