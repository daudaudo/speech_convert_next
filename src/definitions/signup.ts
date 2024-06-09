import { z } from "zod";

export enum SignupFields {
	username = "username",
	email = "email",
	password = "password",
	confirmPassword = "confirm-password",
}

export const SignupFormSchema = z.object({
	[SignupFields.username]: z.string().min(6, { message: "nameMinLength" }).trim(),
	[SignupFields.email]: z.string().email({ message: "emailInvalid" }).trim(),
	[SignupFields.password]: z
		.string()
		.min(6, { message: "passwordMinLength" })
		.max(20, { message: "passwordMaxLength" })
		.trim(),
});

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
