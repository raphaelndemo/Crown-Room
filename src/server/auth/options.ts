import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
// Add Google/Apple if desired
export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER as string,
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: { strategy: "jwt" },
}; 