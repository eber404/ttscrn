import { faker } from "@faker-js/faker";

import { errorMessage } from "@/domain/errors/error-message";
import { TweetUrl } from "@/domain/value-objects/tweet-url";

describe("twitter url", () => {
  it("should instance a twitter url", async () => {
    // given
    const mock = "https://twitter.com/dinhoouropreto/status/319238848217493505";

    // when
    const tweet = TweetUrl.new(mock);

    // then
    expect(tweet.unwrap().value).toBe(mock);
  });

  it("should not instance a twitter url and return an error", async () => {
    // given
    const mock = faker.internet.url();

    // when
    const tweet = TweetUrl.new(mock);

    // then
    expect(tweet.unwrapErr()).toBe(errorMessage.invalid_tweet_url);
  });
});
