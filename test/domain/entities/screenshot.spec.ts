import { randomUUID } from "crypto";

import { Screenshot } from "@/domain/aggregates/screenshot";

import { screenshotPropsFactory } from "@test/mocks/screenshot-props-mock";

describe("screenshot entity", () => {
  it("should instance screenshot entity with valid values", async () => {
    // given
    const mock = screenshotPropsFactory();

    // when
    const screenshot = Screenshot.new(mock);

    // then
    expect(screenshot).toBeInstanceOf(Screenshot);
    expect(screenshot.id).toBeDefined();
  });

  it("should instance screenshot entity with the given id", async () => {
    // given
    const mock = screenshotPropsFactory({
      id: randomUUID(),
    });

    // when
    const screenshot = Screenshot.new(mock);

    // then
    expect(screenshot).toBeInstanceOf(Screenshot);
    expect(screenshot.id).toBeDefined();
  });

  it("should throw an error if invalid props has been provided to screenshot entity", async () => {
    // given
    const mock = screenshotPropsFactory({
      image: "potato",
      createdAt: "potato",
    });

    // when
    const callScreenshot = (): Screenshot => Screenshot.new(mock);

    // then
    expect(callScreenshot).toThrowError();
  });
});
