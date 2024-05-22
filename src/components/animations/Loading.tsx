"use client";

import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

interface Props {
	onEffect?(): unknown;
}

const Loading = ({ onEffect }: Props) => {
	useEffect(() => {
		onEffect && onEffect();
	}, []);

	return (
		<div>
			<Player
				autoplay
				loop
				src={require("~/assets/lottie/loading1.json")}
				style={{ height: "300px", width: "300px" }}
			/>
		</div>
	);
};

export default Loading;
