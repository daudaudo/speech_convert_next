import React from "react";
import AuthLayout from "~/layouts/AuthLayout";

const SigninLayout = ({ children }: React.PropsWithChildren) => {
	return <AuthLayout>{children}</AuthLayout>;
};

export default SigninLayout;
