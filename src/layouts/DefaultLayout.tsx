import React from "react";

interface Props {
	children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
	return <>{children}</>;
};

export default DefaultLayout;
