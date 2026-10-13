import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for Cloudflare Pages. No server runtime is used.
  output: "export",
  // Emit /about/index.html and link to /about/. Cloudflare Pages serves
  // directory indexes and redirects /about -> /about/, so canonical URLs,
  // internal links and the hosting behavior all agree.
  trailingSlash: true,
  // The default image optimizer needs a server. All images are pre-sized
  // static assets, so optimization is disabled rather than faked.
  images: { unoptimized: true },
  poweredByHeader: false,
  // Pin the workspace root so an unrelated lockfile in a parent folder is ignored.
  turbopack: { root: import.meta.dirname },
  reactStrictMode: true,
};

export default nextConfig;
