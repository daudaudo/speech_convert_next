import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					"50": "#ecfeff",
					"100": "#cffafe",
					"200": "#a5f3fc",
					"300": "#67e8f9",
					"400": "#22d3ee",
					"500": "#06b6d4",
					"600": "#0891b2",
					"700": "#0e7490",
					"800": "#155e75",
					"900": "#164e63",
					"950": "#083344",
				},
			},
		},
		fontFamily: {
			body: [
				"Open Sans",
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"system-ui",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji",
			],
			sans: [
				"Open Sans",
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"system-ui",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji",
			],
		},
	},
	plugins: [],
};
export default config;
