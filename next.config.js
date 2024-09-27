/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Suppress warnings from specific modules
    config.ignoreWarnings = [
      warning => warning.message.includes('some-specific-warning'), // Example: suppress specific warning
    ];

    return config;
  },
};

module.exports = nextConfig;
