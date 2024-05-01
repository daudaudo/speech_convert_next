import React from "react";
import AuthLayout from "~/layouts/AuthLayout";

interface Props {
	children?: React.ReactNode;
}

const SignInLayout: React.FC<Props> = ({ children }: Props) => {
	return <AuthLayout>{children}</AuthLayout>;
};

export default SignInLayout;
