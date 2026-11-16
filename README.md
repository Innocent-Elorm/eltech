This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The `Deploy to Vercel` GitHub Actions workflow deploys pull requests as Vercel Preview deployments and pushes to `master` to Production. A manual run from `master` deploys to Production; a manual run from another branch creates a Preview deployment. It deploys the full Next.js application, including server features.

To configure it:

1. Import this repository into Vercel and set `master` as the production branch.
2. Configure the app's environment variables for Preview and Production in Vercel. Use `.env.example` as the variable-name reference, and set strong, unique values for `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
3. Add these repository **Actions secrets**: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. The IDs are available in `.vercel/project.json` after linking the project with `vercel link`, or in the Vercel project settings.
4. Disable automatic Git deployments in Vercel so GitHub Actions is the only deployment path.

The workflow requires these secrets. Pull requests from forks are intentionally skipped because GitHub does not expose repository secrets to them. See the [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying) for platform details.
