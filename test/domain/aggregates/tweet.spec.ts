import { Tweet } from "@/domain/entities/tweet";
import { DomainException } from "@/domain/errors/exceptions/domain-error";

import { tweetPropsFactory } from "@test/mocks/tweet/tweet-props-mock";

describe(Tweet.name, () => {
  it("should instance tweet entity with valid props", async () => {
    // given
    const mock = tweetPropsFactory();

    // when
    const tweet = Tweet.new(mock);

    // then
    expect(tweet).toBeDefined();
  });

  it("should not instance tweet entity with invalid props", async () => {
    try {
      // given
      const mock = tweetPropsFactory({
        text: "",
        createdAt: "potato",
      });

      // when
      Tweet.new(mock);

      // then
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
    }
  });
});
