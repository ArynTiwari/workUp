/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["cdn.discordapp.com", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        
      },
    ],
  },
};

export default nextConfig;
