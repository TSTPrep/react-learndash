/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  /**
   * Added for GitHub Pages deployment.
   */
  // basePath: "/react-learndash",
  // output: "export",
}

module.exports = nextConfig
