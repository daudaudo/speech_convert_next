import { redirect } from "next/navigation";
import { callApiAction } from "./utils";
import { RequestMethod } from "~/types/request";
import { PagePath } from "~/enums/path";
import { SignupFormSchema, SignupFormState } from "~/definitions/signup";
import { createSession } from "~/utils/section";

export async function signup(state: SignupFormState, formData: FormData) {
	// handle form validation
	const validatedFields = SignupFormSchema.safeParse({
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
	});
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	// handle form submission
	const { username, email, password } = validatedFields.data;
	const res = await callApiAction("auth/register", RequestMethod.POST, { username, email, password });
	if (!res.success) {
		return {
			errors: res.message,
		};
	}

	// handle session creation
	const token = res?.data?.access_token;
	createSession(token);

	// redirect to home page
	redirect(PagePath.home);
}
