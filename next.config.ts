/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { withPostHogConfig } from "@posthog/nextjs-config";
import { type NextConfig } from "next";

import { env } from "~/env.js";

const config: NextConfig = {};

export default withPostHogConfig(config, {
  personalApiKey: env.POSTHOG_SOURCE_MAPS_API_KEY,
  envId: env.POSTHOG_PROJECT_ID,
  host: env.NEXT_PUBLIC_POSTHOG_HOST,
  sourcemaps: {
    enabled: true,
    project: "posthog-source-maps",
  },
});
