import { TwitterGetAuthorService } from "@/infra/services/twitter/twitter-get-author-service";

describe(TwitterGetAuthorService.name, () => {
  it("should get twitter user with the given id", async () => {
    // given
    const authorIdMock = "229728760";
    const getAuthorService = new TwitterGetAuthorService();

    // when
    const response = await getAuthorService.get(authorIdMock);

    // then
    expect(response.id).toBeDefined();
    expect(response.name).toBeDefined();
    expect(response.user).toBeDefined();
    expect(response.avatar).toBeDefined();
  });
});
