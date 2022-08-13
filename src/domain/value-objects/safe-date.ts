import { isValid } from "date-fns";
import { Err, Ok, Result } from "oxide.ts";

export class SafeDate {
  public readonly value: Date;

  private constructor(props: Date | string) {
    this.value = new Date(props);
  }

  public static new(date: Date | string): Result<SafeDate, string> {
    const [isValidDate, error] = this.validate(date);

    if (!isValidDate) {
      return Err(error);
    }

    return Ok(new SafeDate(date));
  }

  private static validate(date: Date | string): [boolean, string] {
    const errors = [];

    const isValidDate = isValid(date);
    return [isValidDate, errors.join(", ")];
  }
}
