import { stripe } from "./stripe";

export async function createConnectAccount(userEmail: string) {
  // TODO: Create or fetch a connected account for stylist
  const account = await stripe.accounts.create({ type: "express", email: userEmail });
  return account;
}

export async function createAccountLink(accountId: string, refreshUrl: string, returnUrl: string) {
  return stripe.accountLinks.create({ account: accountId, refresh_url: refreshUrl, return_url: returnUrl, type: "account_onboarding" });
} 