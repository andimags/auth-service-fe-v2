import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: `${process.env.AUTH_SERVICE_BASE_URL}/:path*`,
            },
        ]
    },
}

export default nextConfig
