"use server";

import { redirect } from "next/navigation";
import { callApiAction } from "./utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { createSession } from "~/utils/section";
import { PagePath } from "~/enums/path";
import { SigninFields, SigninFormSchema, SigninFormState } from "~/definitions/signin";

export async function signin(state: SigninFormState, formData: FormData) {
	// handle form validation
	const validatedFields = SigninFormSchema.safeParse({
		email: formData.get(SigninFields.email),
		password: formData.get(SigninFields.password),
	});
	if (!validatedFields.success) {
		return { errors: validatedFields.error.flatten().fieldErrors };
	}
	// handle form submission
	const { email, password } = validatedFields.data;
	return callApiAction(RequestUrl.signin, RequestMethod.POST, { email, password })
		.then((resLogin) => {
			if (!resLogin.success) {
				return { message: resLogin.message };
			}
			const token = resLogin?.data?.access_token;
			createSession(token);
			redirect(PagePath.home);
		})
		.catch((error) => {
			return { message: "Lỗi mạng. Thử lại sau!" };
		});
}
