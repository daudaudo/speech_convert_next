"use client";

import React from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { DEFAULT_AUTO_CLOSE } from "~/constants/toast";

interface Props {
	children: React.ReactNode;
}

type ToastOptions = {
	autoClose?: number | false;
};

interface Context {
	info(message: string, options?: ToastOptions): any;
	error(message: string, options?: ToastOptions): any;
	show(message: string, options?: ToastOptions): any;
	warning(message: string, options?: ToastOptions): any;
}

const ToastContext = React.createContext<Context>({
	info() {},
	error() {},
	show() {},
	warning() {},
});

ToastContext.displayName = "ToastProvider";
const ToastProvider = ToastContext.Provider;

const ToastWrapper = ({ children }: Props) => {
	const parseOptions = (options?: ToastOptions) => {
		return {
			autoClose: options?.autoClose || DEFAULT_AUTO_CLOSE,
		};
	};

	const info = (message: string, options?: ToastOptions) => {
		toast(message, {
			...parseOptions(options),
			type: "info",
		});
	};

	const error = (message: string, options?: ToastOptions) => {
		toast(message, {
			...parseOptions(options),
			type: "error",
		});
	};

	const warning = (message: string, options?: ToastOptions) => {
		toast(message, {
			...parseOptions(options),
			type: "warning",
		});
	};

	const show = (message: string, options?: ToastOptions) => {
		toast(message, {
			...parseOptions(options),
			type: "default",
		});
	};

	return (
		<ToastProvider value={{ info, error, warning, show }}>
			<ToastContainer
				position="top-right"
				autoClose={DEFAULT_AUTO_CLOSE}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
			{children}
		</ToastProvider>
	);
};

export default ToastWrapper;

export const useToastMessage = () => {
	const context = React.useContext(ToastContext);

	return { ...context };
};
