/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "www.notion.so",
      "images.unsplash.com",
      "www.s3.us-west-2.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
      "i.namu.wiki"
    ],
  },
};

module.exports = nextConfig;
