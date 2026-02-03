import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Force webpack (required for next-pwa)
  webpack: (config) => {
    return config;
  },

  // Required to silence Turbopack error
  turbopack: {},
};

export default nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
})(nextConfig);
