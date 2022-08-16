import { faker } from "@faker-js/faker";

import { TwitterAPIGetAuthorService } from "@/infra/services/twitter-api/twitter-get-author-service";

import { InfraException } from "@/domain/errors/exceptions/infra-exception";

describe(TwitterAPIGetAuthorService.name, () => {
  it("should get twitter user with the given id", async () => {
    // given
    const authorIdMock = "229728760";
    const getAuthorService = new TwitterAPIGetAuthorService();

    // when
    const response = await getAuthorService.get(authorIdMock);

    // then
    expect(response.id).toBeDefined();
    expect(response.name).toBeDefined();
    expect(response.user).toBeDefined();
    expect(response.avatar).toBeDefined();
  });

  it("should throw infra exception error", async () => {
    try {
      // given
      const authorIdMock = "229728760";

      const errorMock: InfraException = {
        name: faker.lorem.sentence(3),
        message: faker.lorem.sentence(3),
        stack: "from test",
      };
      const getAuthorService = new TwitterAPIGetAuthorService();
      jest
        .spyOn(getAuthorService, "get")
        .mockRejectedValue(new InfraException(errorMock));

      // when
      const response = await getAuthorService.get(authorIdMock);

      // then
      expect(response).not.toBeDefined();
    } catch (error) {
      expect(error).toBeInstanceOf(InfraException);
    }
  });
});
