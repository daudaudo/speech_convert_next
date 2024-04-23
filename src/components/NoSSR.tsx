"use client";

import React from "react";
import { useEffect, useLayoutEffect, useState } from "react";

const useEnhancedEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// NoSSR component: fix styled-components flicker on server-side rendering
interface NoSSRProps {
	children: React.ReactNode;
	defer?: boolean;
	fallback?: React.ReactNode;
}
const NoSSR = ({ children, defer, fallback }: NoSSRProps) => {
	const [isMounted, setMountedState] = useState(false);

	useEnhancedEffect(() => {
		if (!defer) setMountedState(true);
	}, [defer]);

	useEffect(() => {
		if (defer) setMountedState(true);
	}, [defer]);

	return isMounted ? children : fallback;
};

export default NoSSR;
