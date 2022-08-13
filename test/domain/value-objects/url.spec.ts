import { faker } from "@faker-js/faker";

import { errorMessage } from "@/domain/errors/error-message";
import { Url } from "@/domain/value-objects/url";

describe("url value object", () => {
  it("should instance a valid url", async () => {
    // given
    const mock = faker.internet.url();

    // when
    const url = Url.new(mock);

    // then
    expect(url.unwrap().value).toBe(mock);
  });

  it("should not instance and return an error", async () => {
    // given
    const mock = faker.animal.bear();

    // when
    const url = Url.new(mock);
    const callUrlUnwrap = (): Url => url.unwrap();

    // then
    expect(callUrlUnwrap).toThrowError();
    expect(url.unwrapErr()).toEqual(errorMessage.invalid_url());
  });
});
