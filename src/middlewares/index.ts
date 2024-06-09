"use server";

import { NextRequest, NextResponse } from "next/server";
import { match } from "path-to-regexp";
import { PagePath } from "~/enums/path";
import { RequestMethod } from "~/enums/request";
import { auth } from "~/middlewares/auth";

const requireAuthPaths = [
	PagePath.textHistory,
	PagePath.speechHistory,
	PagePath.conversationHistory,
	PagePath.conversationToSpeech,
];

export const map = async (request: NextRequest, response: NextResponse) => {
	if (request.method !== RequestMethod.GET) {
		return;
	}

	const pathname = request.nextUrl.pathname;

	let flag = false;
	requireAuthPaths.forEach((path) => {
		if (match(path)(pathname)) flag = true;
	});

	if (flag) {
		await auth(request, response, true);
	} else {
		await auth(request, response, false);
	}

	return response;
};
