import { redirect } from "next/navigation";
import { callApiAction } from "./utils";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { createSession } from "~/utils/session";
import { PagePath } from "~/enums/path";
import { SigninFields, SigninFormSchema, SigninFormState } from "~/definitions/signin";

export async function signin(state: SigninFormState, formData: FormData) {
	try {
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
		const res = await callApiAction(RequestUrl.signin, RequestMethod.POST, { email, password });
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
