import { Author } from "@/domain/entities/author";
import { Url } from "@/domain/value-objects/url";

import { authorPropsMock } from "@test/mocks/author-props-mock";

describe("author entity", () => {
  it("should instance a valid author object", async () => {
    // given
    const mock = authorPropsMock();
    const expectResult: Author = {
      avatar: Url.new(mock.avatar).unwrap(),
      name: mock.name,
      user: mock.user,
    };

    // when
    const author = Author.new(mock);

    // then
    expect(author).toEqual(expectResult);
  });
});
