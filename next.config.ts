import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
},
  images: {
    remotePatterns:[
      {
        protocol:"https",
        hostname:"sdmntprcentralus.oaiusercontent.com",
        port:"",
        pathname:"**"
      },
       {
        protocol:"https",
        hostname:"v3.fal.media",
        port:"",
        pathname:"**"
      },
      {
        protocol:"https",
        hostname:"media.licdn.com",
        port:"",
        pathname:"**"
      }
    ]
    
}
};

export default nextConfig;
