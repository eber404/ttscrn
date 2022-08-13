import { Result, Ok, Err } from "oxide.ts";

import { errorMessage } from "@/domain/errors/error-message";

import { Url } from "./url";

export class TweetUrl extends Url {
  private constructor(public readonly value: string) {
    super(value);
  }

  public static new(url: string): Result<TweetUrl, string> {
    const [isValidUrl, urlErrors] = this.validate(url);

    if (!isValidUrl) return Err(urlErrors);

    const [isFromTwitter, twitterErrors] = this.isFromTwitter(url);

    return isFromTwitter ? Ok(new TweetUrl(url)) : Err(twitterErrors);
  }

  private static isFromTwitter(url: string): [boolean, string] {
    const errors = [];

    const isValid = url.includes("twitter.com");

    if (!isValid) {
      errors.push(errorMessage.invalid_tweet_url);
    }

    return [isValid, errors.join(", ")];
  }
}
