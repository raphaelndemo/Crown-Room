import type { Role } from "@prisma/client";

export function isAdmin(role?: Role | null) {
  return role === "ADMIN";
}
export function isStylist(role?: Role | null) {
  return role === "STYLIST";
} 