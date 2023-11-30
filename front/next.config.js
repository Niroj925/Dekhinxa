
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  }
  
  module.exports = nextConfig
  
  module.exports = {
    env: {
      BACKEND_API:process.env.BACKEND_API,
    },
  };