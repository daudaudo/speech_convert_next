import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMeUser } from "~/actions/getMeUser";
import { isAuthPage, PagePath } from "~/enums/path";
import { getSession } from "~/utils/session";

export const middleware = async (request: NextRequest) => {
	try {
		const { pathname } = request.nextUrl;
		// Handle auth pages
		if (isAuthPage(pathname)) {
			return NextResponse.next();
		}

		const { token } = await getSession();
		if (!token) {
			return NextResponse.redirect(new URL(PagePath.signin, request.url));
		}
		const user = await getMeUser();
		if (!user.success) {
			return NextResponse.redirect(new URL(PagePath.signin, request.url));
		}
		return NextResponse.next();
	} catch (error) {
		return NextResponse.next();
	}
};

export const config = {
	matcher: [
		// { source: "/oauth/google/callback" },
		{ source: "/signin" },
		{ source: "/signup" },
		{ source: "/" },
		{ source: "/text-to-speech" },
		{ source: "/document-to-speech" },
		{ source: "/conversation-to-speech" },
		{ source: "/speech-to-text" },
		{ source: "/document-to-text" },
		{ source: "/text-to-text" },
		{ source: "/history" },
	],
};
