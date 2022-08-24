import { errorMessage } from "@/domain/errors/error-messages";
import { Size, Unit } from "@/domain/value-objects/size";

describe(Size.name, () => {
  it("should create a size with valid props", async () => {
    // given
    const sizeMock = {
      width: 1080,
      height: 1920,
      unit: "px",
    };

    // when
    const size = Size.new({ ...sizeMock, unit: "px" });

    // then
    expect(size.isOk()).toBeTruthy();
    expect(size.unwrap()).toEqual(sizeMock);
  });

  it("should not create a size with negative sizes", async () => {
    // given
    const sizeMock = {
      width: -100,
      height: -1920,
      unit: "px",
    };

    const fakeUnit = "potato" as Unit;

    // when
    const size = Size.new({ ...sizeMock, unit: fakeUnit });

    // then
    expect(size.isErr()).toBeTruthy();
    expect(size.unwrapErr()).toEqual(
      `${errorMessage.size_width_is_negative(
        sizeMock.width,
      )}, ${errorMessage.size_height_is_negative(sizeMock.height)}`,
    );
  });

  it("should not create a size with NaN sizes", async () => {
    // given
    const fakeWidth = "@" as unknown as number;
    const fakeHeight = "@" as unknown as number;

    const sizeMock = {
      width: fakeWidth,
      height: fakeHeight,
      unit: "px" as Unit,
    };

    // when
    const size = Size.new(sizeMock);

    // then
    expect(size.isErr()).toBeTruthy();
    expect(size.unwrapErr()).toEqual(
      `${errorMessage.size_width_is_NaN(
        sizeMock.width,
      )}, ${errorMessage.size_height_is_NaN(sizeMock.height)}`,
    );
    expect(size.unwrap).toThrow();
  });
});
