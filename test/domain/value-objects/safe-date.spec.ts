import { faker } from "@faker-js/faker";

import { errorMessage } from "@/domain/errors/error-message";
import { SafeDate } from "@/domain/value-objects/safe-date";

describe(SafeDate.name, () => {
  it("should instance safe date with valid props", async () => {
    // given
    const safeDateMock = faker.date.recent();

    // when
    const safeDate = SafeDate.new(safeDateMock);

    // then
    expect(safeDate.isOk()).toBeTruthy();
    expect(safeDate.unwrap()).toBeInstanceOf(SafeDate);
    expect(safeDate.unwrap().value).toEqual(safeDateMock);
  });

  it("should not instance a safe date value object with invalid props", async () => {
    // given
    const mock = faker.lorem.text();

    // when
    const safeDate = SafeDate.new(mock);

    // then
    expect(safeDate.isErr()).toBeTruthy();
    expect(safeDate.unwrapErr()).toEqual(
      errorMessage.invalid_date_format(mock),
    );
  });
});
