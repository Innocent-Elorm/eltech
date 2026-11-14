import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "eltech";

const nextConfig = (phase: string): NextConfig => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  cacheComponents: !isGitHubPagesBuild,
  partialPrefetching: !isGitHubPagesBuild,
  ...(isGitHubPagesBuild
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: `/${repositoryName}`,
        images: { unoptimized: true },
        pageExtensions: ["ghpage.tsx"],
        typescript: { tsconfigPath: "tsconfig.github-pages.json" },
      }
    : {}),
  turbopack: {
    ...(isGitHubPagesBuild
      ? {
          resolveAlias: {
            "@/lib/site-data": "./lib/site-data.github-pages.ts",
          },
        }
      : {}),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
});

export default nextConfig;
