/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,

    /**
     * Added for GitHub Pages deployment.
     */
    basePath: process.env.BASE_PATH,
    assetPrefix: process.env.ASSET_PREFIX,
    ...(!process.env.DEPLOY_TO_GITHUB_PAGES ? {output: 'export'} : {}),

    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
