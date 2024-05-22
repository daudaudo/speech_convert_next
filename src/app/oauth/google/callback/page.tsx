import React, { Suspense } from "react";
import CallbackOAuthGoogle from "~/components/page/oauth/google/CallbackOAuthGoogle";

interface Props {}

const Page = ({}: Props) => {
	return (
		<Suspense>
			<CallbackOAuthGoogle />
		</Suspense>
	);
};

export default Page;
