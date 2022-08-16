import { TwitterApi } from "twitter-api-v2";

import { settings } from "@/infra/settings/env/settings";

export const twitterClient = new TwitterApi(
  settings.twitter.TWITTER_BEARER_TOKEN,
);
