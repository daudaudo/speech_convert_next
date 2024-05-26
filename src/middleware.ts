import { NextRequest, NextResponse } from "next/server";
import { PagePath } from "~/enums/path";
import { UnauthorizedError } from "~/errors/logic/auth";
import { map } from "~/middlewares.ts";

export const middleware = async (request: NextRequest) => {
	try {
		const response = NextResponse.next();
		return await map(request, response);
	} catch (error: unknown) {
		if (error instanceof UnauthorizedError) {
			return NextResponse.redirect(new URL(PagePath.signin, request.url));
		}

		return NextResponse.redirect(new URL(PagePath.home, request.url));
	}
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|favicon-32x32.png|favicon-16x16.png|site.webmanifest).*)"],
};
