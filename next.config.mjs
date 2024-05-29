/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //PROBLEMA DO WATCHPACK RESOLVIDO
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ignored: [
        'F:'
      ],
    };
    return config;
  },
};

export default nextConfig;
