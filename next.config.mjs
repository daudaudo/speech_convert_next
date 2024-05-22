export default (phase, { defaultConfig }) => {
	/** @type {import('next').NextConfig} */
	const nextConfig = {
		...defaultConfig,
		reactStrictMode: false,
	}

	return nextConfig
}
