import React from "react";
import AuthLayout from "~/layouts/AuthLayout";

const AccountRecoveryLayout = ({ children }: React.PropsWithChildren) => {
	return <AuthLayout>{children}</AuthLayout>;
};

export default AccountRecoveryLayout;
