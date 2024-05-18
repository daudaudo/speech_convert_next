"use client";

import React, { useEffect, useState, useTransition } from "react";
import { getMeUser } from "~/actions/getMeUser";
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
	showedUser?: boolean;
	toggleShowedUser?: () => void;
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
	const [pending, startTransition] = useTransition();
	const [authencated, setAuthencated] = useState(DefaultStore.authencated);
	const [user, setUser] = useState(DefaultStore.user);
	const [showedUser, setShowedUser] = useState(false);

	const toggleShowedUser = (showed?: boolean) => {
		setShowedUser(showed === undefined ? !showedUser : showed);
	};

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
		startTransition(async () => {
			try {
				const res = await getMeUser();
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
	}, []);

	const store: Store = { pending, authencated, user, signout, showedUser, toggleShowedUser };

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
