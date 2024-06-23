"use client";

import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const DEFAULT_SIZE = 300;

interface Props {
	size?: number;
}

const LoadingPage = ({ size }: Props) => {
	return (
		<div>
			<Player
				autoplay
				loop
				src={require("~/assets/lottie/loading1.json")}
				style={{ height: `${size || DEFAULT_SIZE}px`, width: `${size || DEFAULT_SIZE}px` }}
			/>
		</div>
	);
};

export default LoadingPage;
