"use server";

import { redirect } from "next/navigation";
import { RequestMethod, RequestUrl } from "~/enums/request";
import { createSession } from "~/utils/session";
import { PagePath } from "~/enums/path";
import { callApiAction } from "./utils";

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

export async function signinByGoogle(code: string) {
	try {
		const res = await callApiAction(RequestUrl.signinGoogle, RequestMethod.GET, undefined, { code });
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
