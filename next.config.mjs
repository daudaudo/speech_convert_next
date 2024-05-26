import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default (phase, { defaultConfig }) => {
	/** @type {import('next').NextConfig} */
	const nextConfig = {
		...defaultConfig,
		reactStrictMode: false,
	};

	return withNextIntl(nextConfig);
}
