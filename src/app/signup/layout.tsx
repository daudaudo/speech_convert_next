import React from "react";
import AuthLayout from "~/layouts/AuthLayout";

const SignupLayout = ({ children }: React.PropsWithChildren) => {
	return <AuthLayout>{children}</AuthLayout>;
};

export default SignupLayout;
