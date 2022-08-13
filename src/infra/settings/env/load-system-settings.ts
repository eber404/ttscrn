import { Env } from "@/infra/settings/env/environment-variable";

export function loadSystemSettings(): unknown {
  try {
    return {
      [Env.TWITTER_API_KEY]: process.env[Env.TWITTER_API_KEY],
      [Env.TWITTER_API_SECRET]: process.env[Env.TWITTER_API_SECRET],
      [Env.TWITTER_BEARER_TOKEN]: process.env[Env.TWITTER_BEARER_TOKEN],
      [Env.PORT]: process.env[Env.PORT],
    };
  } catch (error) {
    throw new Error("Missing environment variables.");
  }
}
