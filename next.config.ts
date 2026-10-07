import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Enables static export generation (`next build` outputs to /out folder)
    output: "export",

    // Required for static export when using Next.js <Image /> component
    images: {
        unoptimized: true,
    },

    // Enforces trailing slashes for clean static folder routing on static hosts (Vercel, Netlify, GitHub Pages)
    trailingSlash: true,

    // React Strict Mode for catching lifecycle/rendering bugs early
    reactStrictMode: true,
};

export default nextConfig;