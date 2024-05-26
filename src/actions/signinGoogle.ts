"use server";

import { redirect } from "next/navigation";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { login } from "~/actions/data/oauth/google";
import { createSession } from "~/utils/session";
import { callApiAction } from "~/actions/utils";

export async function navigateSigninByGoogleCallback() {
	try {
		const res = await callApiAction(RequestUrl.signinGoogleCallback, RequestMethod.GET);
		if (!res.success) {
			return { message: res.message };
		}
		const callback_url = res?.data?.callback_url;
		redirect(callback_url);
	} catch (error) {
		throw error;
	}
}

export const signinByGoogle = async (code: string) => {
	const { access_token, _id } = await login({ code });
	await createSession(access_token, _id);
};
