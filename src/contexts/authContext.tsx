"use client";

import React, { useState } from "react";
import { createContext, useContext } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import ContextError from "~/errors/contextError";
import { CookieKey } from "~/enums/cookieKey";
import { PagePath } from "~/enums/path";

type AuthContextType = {
	token: string | undefined;
	signin: (token: string) => void;
	signout: () => void;
	authecated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
	const router = useRouter();
	const curToken = getCookie(CookieKey.token) || "";
	const [token, setToken] = useState(curToken as string | undefined);

	const onTokenChange = (newToken?: string) => {
		setToken(newToken);
		if (newToken) setCookie(CookieKey.token, newToken);
		else deleteCookie(CookieKey.token);
	};

	const signin = (token: string) => {
		onTokenChange(token);
		router.push(PagePath.home);
	};

	const signout = () => {
		onTokenChange(undefined);
	};

	const authecated = !!token;

	return <AuthContext.Provider value={{ token, signin, signout, authecated }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new ContextError("useAuth");
	return {
		token: context.token,
		signin: context.signin,
		signout: context.signout,
		authecated: context.authecated,
	};
};

export { AuthProvider, useAuth };
