import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const isProd = process.env.NODE_ENV === 'production';

export default isProd
  ? withPWA({
      ...nextConfig,
      pwa: {
        dest: 'public',
        disable: true, // 🔴 disable PWA during Vercel build
      },
    })
  : nextConfig;
