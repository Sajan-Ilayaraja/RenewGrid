/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static export
    images: {
        unoptimized: true
    },
    webpack: (config) => {
      // Ignore Node.js-specific modules in frontend
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };

      // Suppress Handlebars require.extensions warning
      config.module.rules.push({
        test: /handlebars\/lib\/index\.js$/,
        use: 'null-loader',
      });

      return config;
    },
  };

  module.exports = nextConfig;