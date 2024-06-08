"use server";

import { NextRequest, NextResponse } from "next/server";
import { match } from "path-to-regexp";
import { PagePath } from "~/enums/path";
import { RequestMethod } from "~/enums/request";
import { auth } from "~/middlewares/auth";

export const map = async (request: NextRequest, response: NextResponse) => {
	if (request.method !== RequestMethod.GET) {
		return;
	}

	const pathname = request.nextUrl.pathname;

	if (match(PagePath.speechHistory)(pathname)) {
		await auth(request, response, true);
	} else if (match(PagePath.textHistory)(pathname)) {
		await auth(request, response, true);
	} else if (match(PagePath.conversationHistory)(pathname)) {
		await auth(request, response, true);
	} else {
		await auth(request, response, false);
	}

	return response;
};
