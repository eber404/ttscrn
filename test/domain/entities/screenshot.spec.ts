import { faker } from "@faker-js/faker";

import { Screenshot } from "@/domain/entities/screenshot";

import { screenshotPropsMock } from "@test/mocks/screenshot-props-mock";

describe("screenshot entity", () => {
  it("should instance screenshot entity with valid values", async () => {
    // given
    const mock = screenshotPropsMock();

    // when
    const screenshot = Screenshot.new(mock);

    const result = {
      tweet: screenshot.tweet.value,
      createdAt: new Date(screenshot.createdAt),
      image: screenshot.image.value,
      format: screenshot.format,
    };

    // then
    expect(result).toMatchObject(mock);
    expect(screenshot).toBeInstanceOf(Screenshot);
    expect(screenshot.id).toBeDefined();
  });

  it("should throw an error if invalid props has been provided to screenshot entity", async () => {
    // given
    const mock = screenshotPropsMock({ tweet: faker.internet.url() });

    // when
    const callScreenshotNew = (): Screenshot => Screenshot.new(mock);

    // then
    expect(callScreenshotNew).toThrowError();
  });
});
