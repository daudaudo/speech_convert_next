export default (phase, { defaultConfig }) => {
	const nextConfig = {
		async redirects() {
			return [
				{
					source: '/',
					destination: '/sound',
					permanent: true,
				},
			]
		},
	}
	return nextConfig
  }