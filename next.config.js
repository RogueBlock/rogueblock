/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ipfs.algonode.xyz',
      'cf-ipfs.com',
      'dweb.link',
      'cloudflare-ipfs.com',
      'ipfs-gateway.cloud',
      'raw.githubusercontent.com',
      'vitals.vercel-insights.com',
      'google-analytics.com',
      '*.google-analytics.com'
    ]
  }
}

module.exports = nextConfig
