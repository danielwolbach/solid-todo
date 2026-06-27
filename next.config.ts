import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    experimental: {
        webpackMemoryOptimizations: true,
    },
};

export default nextConfig;
