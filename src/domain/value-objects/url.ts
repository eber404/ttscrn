import { isURL } from "class-validator";
import { Result, Ok, Err } from "oxide.ts";

import { errorMessage } from "@/domain/errors/error-message";

export class Url {
  public constructor(public readonly value: string) {}

  public static new(url: string): Result<Url, string> {
    const [isValid, errors] = this.validate(url);

    return isValid ? Ok(new Url(url)) : Err(errors);
  }

  public static validate(url: string): [boolean, string] {
    const errors = [];

    const isValid = isURL(url);

    if (!isValid) {
      errors.push(errorMessage.invalid_url());
    }

    return [isValid, errors.join(", ")];
  }
}
