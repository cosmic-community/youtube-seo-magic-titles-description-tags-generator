/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Experimental features to handle API routes during build
  experimental: {
    // Skip API route validation during build if env vars are missing
    skipTrailingSlashRedirect: true,
  },
}

module.exports = nextConfig