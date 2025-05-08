import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/auth/home",
                permanent: true,
            },
            {
                source: "/auth",
                destination: "/auth/home",
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fastly.picsum.photos",
                port: "",
                pathname: "/id/**",
            },
        ],
    },
};

export default nextConfig;
