/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  /**
   * Added for GitHub Pages deployment.
   */
  basePath: "/react-learndash",
  ...(!process.env.DEPLOY_TO_GITHUB_PAGES ? {output: 'export'} : {})
}

module.exports = nextConfig
