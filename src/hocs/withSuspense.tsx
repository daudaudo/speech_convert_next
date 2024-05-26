import React, { Suspense } from "react";

interface DefaultProps {}

function withSuspense<P extends DefaultProps>(Component: React.ComponentType<P>) {
	return function WithSuspense(props: P) {
		return (
			<Suspense>
				<Component {...props} />
			</Suspense>
		);
	};
}

export default withSuspense;
