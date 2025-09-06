# Salon

RSC-first stylist booking platform scaffold.

## Stack
- Next.js App Router (TypeScript)
- Prisma + PostgreSQL
- Tailwind CSS
- NextAuth/Auth.js (Email provider stub)
- Zod validation
- Stripe + Stripe Connect (server stubs)
- Vitest + Playwright

## Commands
- `pnpm dev` – start dev server
- `pnpm build && pnpm start` – production build
- `pnpm prisma:generate` – generate Prisma client
- `pnpm prisma:migrate` – run dev migration
- `pnpm test` – unit tests
- `pnpm e2e` – e2e tests

## Env
Copy `.env.example` to `.env` and set values.

## Next steps
- Implement Stripe PaymentIntent and Connect onboarding
- Implement availability generation job and TimeSlot upserts
- Wire notifications (email/SMS)
- Harden rate limiting and add middleware at `src/middleware.ts` if needed
