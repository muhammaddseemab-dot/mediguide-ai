/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['mediguide-assets.vercel.app', 'localhost'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
}

module.exports = nextConfig
