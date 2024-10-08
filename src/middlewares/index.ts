"use server";

import { NextRequest, NextResponse } from "next/server";
import { match } from "path-to-regexp";
import { PagePath } from "~/enums/path";
import { RequestMethod } from "~/enums/request";
import { auth } from "~/middlewares/auth";

const requireAuthPaths = [
	PagePath.textToSpeech,
	PagePath.speechToText,
	PagePath.documentToSpeech,
	PagePath.documentToText,
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

	if (requireAuthPaths.some((path) => match(path)(pathname))) {
		await auth(request, response, true);
	} else {
		await auth(request, response, false);
	}

	return response;
};
