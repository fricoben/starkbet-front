/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  images: {
    domains: ["i.ibb.co", "starknet.id", "starknetid.netlify.app"],
  },
};
