/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.turbogixxertuning.com"
      }
    ]
  }
};

export default nextConfig;
