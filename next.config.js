/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  /**
   * Added for GitHub Pages deployment.
   */
  basePath: process.env.BASE_PATH,
  ...(!process.env.DEPLOY_TO_GITHUB_PAGES ? {output: 'export'} : {})
}

module.exports = nextConfig
