"use client";

import { createContext, useContext } from "react";
import ContextError from "~/errors/contextError";

type AuthContextType = {
	token: string;
	signin: (token: string, meId: string) => void;
	signout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new ContextError("useAuth");
	return {
		token: context.token,
		signin: context.signin,
		signout: context.signout,
	};
};

export { AuthContext, useAuth };
