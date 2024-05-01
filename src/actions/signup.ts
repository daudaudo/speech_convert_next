"use server";

import { redirect } from "next/navigation";
import { callApiAction } from "./utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { PagePath } from "~/enums/path";
import { SignupFields, SignupFormSchema, SignupFormState } from "~/definitions/signup";
import { createSession } from "~/utils/section";

export async function signup(state: SignupFormState, formData: FormData) {
	// handle form validation
	const validatedFields = SignupFormSchema.safeParse({
		username: formData.get(SignupFields.username),
		email: formData.get(SignupFields.email),
		password: formData.get(SignupFields.password),
	});
	if (!validatedFields.success) {
		return { errors: validatedFields.error.flatten().fieldErrors };
	}
	// handle form submission
	const { username, email, password } = validatedFields.data;
	return callApiAction(RequestUrl.signup, RequestMethod.POST, { username, email, password })
		.then((resRegister) => {
			if (!resRegister.success) {
				return { message: resRegister.message };
			}
			return callApiAction(RequestUrl.signin, RequestMethod.POST, { email, password });
		})
		.then((resLogin) => {
			if (!resLogin.success) {
				return { message: resLogin.message };
			}
			const token = resLogin?.data?.access_token;
			createSession(token);
			redirect(PagePath.home);
		})
		.catch(() => ({ message: "Lỗi điều hướng trang" }));
}
