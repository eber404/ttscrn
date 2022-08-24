import { Result, Ok, Err } from "oxide.ts";
import { ZodSchema } from "zod";

export class DomainValidation {
  protected static validate<T, Props = unknown>(
    schema: ZodSchema,
    props: Props,
  ): Result<T, string> {
    const validation = schema.safeParse(props);

    if (!validation.success) {
      return Err(validation.error.issues.join(", "));
    }

    return Ok(validation.data);
  }
}
