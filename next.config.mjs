import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

const withPWA = nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
});

export default withPWA(config);
