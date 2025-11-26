# PostHog Sourcemaps – Next.js 16 + Vercel Reproduction

This repository is a minimal reproducible example demonstrating an issue with PostHog sourcemap uploads when building a Next.js 16 project on Vercel.

## Problem

I initially discovered this issue because sourcemaps were not working correctly in PostHog Error Tracking. While investigating, I noticed that the release created by PostHog was showing incorrect or missing repository information (previously appearing as `path0`). This led me to suspect that the failure to detect the repository and branch during Vercel builds is directly related to the sourcemaps not resolving properly.

When running the build locally, PostHog correctly detects the Git SHA and the Git repository name.  
However, when the build runs on Vercel CI (either from a pull request or a commit to `main`), the repository name is not detected at all.

Since CI/CD is normally responsible for generating and uploading sourcemaps, this behavior creates difficulty in real-world workflows. I would not expect to run a local build before creating a pull request just to ensure repository detection works.

## Setup

This example follows the official PostHog Next.js sourcemaps integration guide and uses:

- `@posthog/nextjs-config` ^1.6.0
- `@posthog/cli` ^0.5.16
- Next.js 16
- Deployed on Vercel

The repository contains a simple Next.js app configured with PostHog and the minimal sourcemap setup needed to reproduce the issue.

## Reproducing the Issue

1. Clone this repository.
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set the required PostHog environment variables.
4. Run a local build:

   ```bash
   pnpm build
   ```

   Locally, the repository name is detected correctly and sourcemaps are uploaded with the expected metadata.

5. Deploy to Vercel or push a commit/PR.  
   The release on PostHog will not contain repository information, and sourcemaps will not resolve correctly in Error Tracking.

## Feedback for PostHog (Context)

While investigating this, I also noticed that the PostHog UI release table is not ordered by creation date. When debugging releases, manually searching page-by-page by commit hash is cumbersome. Ordering the table by most recent first would make the experience much smoother.

## License

MIT
