/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/work/prissy-vandross-original-ip',
        destination: '/work/prissy-vandross',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
