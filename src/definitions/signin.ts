import { z } from "zod";

export enum SigninFields {
	email = "email",
	password = "password",
}

export const SigninFormSchema = z.object({
	[SigninFields.email]: z.string().email({ message: "emailInvalid" }).trim(),
	[SigninFields.password]: z
		.string()
		.min(6, { message: "passwordMinLength" })
		.max(20, { message: "passwordMaxLength" })
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
