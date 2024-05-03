export default (phase, { defaultConfig }) => {
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