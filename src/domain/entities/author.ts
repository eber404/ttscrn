import { z } from "zod";

import { DomainError } from "@/domain/errors/domain-error";
import { DomainValidation } from "@/domain/validations/domain-validation";

const VALID_USERNAME_REGEX = /^[A-Za-z0-9_]{1,15}$/;

const AuthorSchema = z.object({
  name: z.string().min(3).max(15),
  user: z.string().regex(VALID_USERNAME_REGEX),
  avatar: z.string().url(),
});

export type AuthorProps = z.infer<typeof AuthorSchema>;

export class Author extends DomainValidation {
  private constructor(
    public readonly name: string,
    public readonly user: string,
    public readonly avatar: string,
  ) {
    super();
  }

  public static new(props: AuthorProps): Author {
    const validation = this.validate<Author>(AuthorSchema, props);

    if (validation.isErr()) {
      throw new DomainError({
        name: "Invalid props for entity",
        message: validation.unwrapErr(),
        stack: Author.name,
      });
    }

    const result = validation.unwrap();

    return new Author(result.name, result.name, result.avatar);
  }
}
