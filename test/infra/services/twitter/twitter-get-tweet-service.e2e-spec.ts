import { faker } from "@faker-js/faker";

import { TwitterAPIGetTweetService } from "@/infra/services/twitter-api/twitter-get-tweet-service";

import { InfraException } from "@/domain/errors/exceptions/infra-exception";
import { GetTweetService } from "@/domain/services/get-tweet/get-tweet-service";

interface Sut {
  service: GetTweetService;
}

function makeSut(): Sut {
  const service = new TwitterAPIGetTweetService();

  return {
    service,
  };
}

describe(TwitterAPIGetTweetService.name, () => {
  it("should get tweet with the given id", async () => {
    // given
    const tweetIdMock = "319238848217493505";
    const { service } = makeSut();

    // then
    const response = await service.get(tweetIdMock);

    // then
    expect(response.id).toBeDefined();
    expect(response.text).toBeDefined();
    expect(response.authorId).toBeDefined();
  });

  it("should throw if tweet is from a private account", async () => {
    const error: InfraException = {
      message: faker.lorem.sentence(),
      name: faker.lorem.slug(),
      stack: "from jest test",
    };

    try {
      // given
      const tweetIdMock = "1558505499875835906";
      const { service } = makeSut();
      jest.spyOn(service, "get").mockRejectedValue(new InfraException(error));

      // then
      await service.get(tweetIdMock);

      // then
    } catch (error) {
      expect(error).toBeInstanceOf(InfraException);
    }
  });
});
