import { isNegative } from "class-validator";
import { Ok, Result, Err } from "oxide.ts";

import { errorMessage } from "@/domain/errors/error-message";

export type Unit = "px";

export interface SizeProps {
  width: number;
  height: number;
  unit: Unit;
}

export class Size {
  public readonly width: number;
  public readonly height: number;
  public readonly unit: Unit;

  private constructor(props: Size) {
    Object.assign(this, props);
  }

  public static new(props: SizeProps): Result<Size, string> {
    const [isValid, errors] = this.validate(props);

    return isValid ? Ok(new Size(props)) : Err(errors);
  }

  private static validate(props: SizeProps): [boolean, string] {
    const errors = [];

    if (isNaN(props.width)) {
      errors.push(errorMessage.size_width_is_NaN(props.width));
    }

    if (isNegative(props.width)) {
      errors.push(errorMessage.size_width_is_negative(props.width));
    }

    if (isNaN(props.height)) {
      errors.push(errorMessage.size_height_is_NaN(props.height));
    }

    if (isNegative(props.height)) {
      errors.push(errorMessage.size_height_is_negative(props.height));
    }

    const isValid = errors.length === 0;

    return [isValid, errors.join(", ")];
  }
}
