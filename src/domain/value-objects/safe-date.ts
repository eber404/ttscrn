import { isValid } from "date-fns";
import { Err, Ok, Result } from "oxide.ts";

import { errorMessage } from "@/domain/errors/error-message";

export class SafeDate {
  public readonly value: Date;

  private constructor(props: Date | string) {
    this.value = new Date(props);
  }

  public static new(date: Date | string): Result<SafeDate, string> {
    const [isValidDate, errors] = this.validate(date);

    return isValidDate ? Ok(new SafeDate(date)) : Err(errors);
  }

  private static validate(props: Date | string): [boolean, string] {
    const errors = [];

    const date = typeof props === "string" ? new Date(props) : props;

    const isValidDate = isValid(date);

    if (!isValidDate) {
      errors.push(errorMessage.invalid_date_format(props.toString()));
    }

    return [isValidDate, errors.join(", ")];
  }
}
