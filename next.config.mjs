import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.imagekit.io" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.mux.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
