import { z } from "zod";
export const env = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url().optional(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
}).parse(process.env); 