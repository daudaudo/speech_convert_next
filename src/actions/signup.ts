"use server";

import { redirect } from "next/navigation";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { PagePath } from "~/enums/path";
import { SignupFields, SignupFormSchema, SignupFormState } from "~/definitions/signup";
import { createSession } from "~/utils/session";
import { callApiAction } from "./utils";

export async function signup(state: SignupFormState, formData: FormData) {
	try {
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
		const res = await callApiAction(RequestUrl.signup, RequestMethod.POST, { username, email, password });
		if (!res.success) {
			return { message: res.message };
		}
		const token = res?.data?.access_token;
		const id = res?.data?._id;
		createSession(token, id);
		redirect(PagePath.home);
	} catch (error) {
		throw error;
	}
}
