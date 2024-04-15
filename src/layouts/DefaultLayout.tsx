import React from "react";

interface Props {
	children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
	return (
		<>
			<header>Header</header>
			{children}
			<footer>Footer</footer>
		</>
	);
};

export default DefaultLayout;
