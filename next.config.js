/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const allowedOrigins = ["https://mention.earth", "http://localhost:3000"];
    const headers = allowedOrigins.map((origin) => ({
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: origin },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,DELETE,PATCH,POST,PUT",
        },
        {
          key: "Access-Control-Allow-Headers",
          value:
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      ],
    }));

    return headers;
  },
};

module.exports = nextConfig;
