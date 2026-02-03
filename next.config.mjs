import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const isProd = process.env.NODE_ENV === "production";

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    disable: !isProd, // PWA OFF in dev, ON in production
  },
});
