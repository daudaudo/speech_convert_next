import React, { useCallback } from "react";
import { cookies } from "next/headers";
import { AuthContext } from "./authContext";
import { CookieKey } from "~/enums/cookieKey";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const cookie = cookies();
	const token = cookie.get(CookieKey.token)?.value || "";

	const signin = useCallback(
		(token: string) => {
			cookie.set(CookieKey.token, token);
		},
		[cookie],
	);

	const signout = useCallback(() => {
		cookie.delete(CookieKey.token);
	}, [cookie]);

	return <AuthContext.Provider value={{ token, signin, signout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
