import React, { Suspense } from "react";
import Header from "~/components/header";

interface Props {
	children: React.ReactNode;
}

const UserLayout = ({ children }: Props) => {
	return (
		<Suspense>
			<div className="h-screen md:max-w-screen-xl mx-auto">
				<div className="flex flex-col h-full w-full md:max-w-screen-xl">
					<div className="shrink-0 ">
						<Header />
					</div>
					<div className="flex-1">{children}</div>
					<div className="footer shrink-0 p-4 h-5" />
				</div>
			</div>
		</Suspense>
	);
};

export default UserLayout;
