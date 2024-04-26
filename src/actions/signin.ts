import { redirect } from "next/navigation";
import { callApiAction } from "./utils";
import { RequestMethod } from "~/types/request";
import { createSession } from "~/utils/section";
import { PagePath } from "~/enums/path";
import { SigninFormSchema, SigninFormState } from "~/definitions/signin";

export async function signin(state: SigninFormState, formData: FormData) {
	// handle form validation
	const validatedFields = SigninFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	// handle form submission
	const { email, password } = validatedFields.data;
	const resLogin = await callApiAction("auth/login", RequestMethod.POST, { email, password });
	if (!resLogin.success) {
		return {
			message: resLogin.message,
		};
	}
	const token = resLogin?.data?.access_token;
	createSession(token);

	// redirect to home page
	redirect(PagePath.home);
}
