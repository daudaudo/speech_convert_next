import React, { Suspense } from "react";

interface DefaultProps {}

function withSuspense<P extends DefaultProps>(Component: React.ComponentType<P>, fallback?: React.ReactNode) {
	return function WithSuspense(props: P) {
		return (
			<Suspense fallback={fallback}>
				<Component {...props} />
			</Suspense>
		);
	};
}

export default withSuspense;
