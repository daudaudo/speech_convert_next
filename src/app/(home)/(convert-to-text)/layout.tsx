import React from "react";

interface Props {
	children: React.ReactNode;
}

const ConvertToTextLayout = ({ children }: Props) => {
	return <>{children}</>;
};

export default ConvertToTextLayout;
