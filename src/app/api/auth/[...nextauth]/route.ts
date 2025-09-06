import NextAuth from "next-auth";
import { authOptions } from "@/server/auth/options";
const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST }; 