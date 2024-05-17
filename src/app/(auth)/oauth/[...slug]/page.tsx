import React from "react";
import SigninByGoogle from "~/components/signin/SigninByGoogle";

interface Props {
	searchParams: {
		[key: string]: string | undefined;
	};
}
const oOuthPage = ({ searchParams }: Props) => {
	return <SigninByGoogle code={searchParams.code} />;
};

export default oOuthPage;
