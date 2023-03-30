/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SERVICE_URL: 'https://sandapps.hubblerapp.com/testrest'
  },
}

module.exports = nextConfig
