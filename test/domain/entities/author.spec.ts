import { Author } from "@/domain/entities/author";
import { DomainException } from "@/domain/errors/exceptions/domain-exception";
import { Url } from "@/domain/value-objects/url";

import { authorPropsMock } from "@test/mocks/author-props-mock";

describe("author entity", () => {
  it("should instance a valid author entity", async () => {
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

  it("should not instance an invalid author entity", async () => {
    try {
      // given
      const mock = authorPropsMock({
        avatar: "potato",
        name: "1",
        user: "@",
      });

      // when
      const author = Author.new(mock);

      // then
      expect(author).toThrow();
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
    }
  });
});
