export default (phase, { defaultConfig }) => {
	/** @type {import('next').NextConfig} */
	const nextConfig = {
		async redirects() {
			return [
				{
					source: '/',
					destination: '/text-to-speech',
					permanent: true,
				},
			]
		},
	}

	return nextConfig
}
