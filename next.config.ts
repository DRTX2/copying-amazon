import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  // Experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', '@tanstack/react-query'],
  },
  
  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: isProd
      ? { exclude: ["warn", "error"] }
      : false,
  },
  
  // Headers for security
    async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },

          // Disable MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          // Enforce HTTPS (only in prod)
          ...(isProd
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []),

          // Limit browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },

          // Basic CSP (safe starter)
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "connect-src 'self' http://localhost:8080; " +
              "img-src 'self' https: data:; " +
              "font-src 'self' https://cdnjs.cloudflare.com; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
              "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
