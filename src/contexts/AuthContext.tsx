"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { getCurrentUser } from "~/actions/getCurrentUser";
import ContextError from "~/errors/context";
import { deleteSession } from "~/utils/session";

type Store = {
	authencated: boolean;
	signout: () => void;
	pending?: boolean;
	user?: {
		id: string;
		email?: string;
	};
};

const DefaultStore: Store = {
	authencated: false,
	signout: () => {},
};

const Context = React.createContext<Store>(DefaultStore);

interface Props {
	children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
	const initRef = useRef(false);
	const [pending, startTransition] = useTransition();
	const [authencated, setAuthencated] = useState(DefaultStore.authencated);
	const [user, setUser] = useState(DefaultStore.user);

	const signout = async () => {
		try {
			await deleteSession();
			setAuthencated(false);
			setUser(undefined);
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		if (initRef.current) {
			return;
		}

		startTransition(async () => {
			try {
				const res = await getCurrentUser();
				if (res.success) {
					setAuthencated(true);
					setUser({
						id: res?.data?.id,
						email: res?.data?.email,
					});
				}
			} catch (error) {
				setAuthencated(false);
			}
		});

		return () => {
			initRef.current = true;
		};
	}, []);

	const store: Store = { pending, authencated, user, signout };

	return <Context.Provider value={store}>{children}</Context.Provider>;
};

const useAuth = () => {
	const context = React.useContext(Context);
	if (!context) {
		throw new ContextError("useAuth");
	}
	return context;
};

export { AuthProvider, useAuth };
