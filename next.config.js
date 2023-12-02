/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        LOCAL_URL: "http://localhost:3000"
    },
    productionBrowserSourceMaps: true
}

module.exports = nextConfig
