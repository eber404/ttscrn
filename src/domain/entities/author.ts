import { errorMessage } from "@/domain/errors/error-message";
import { Url } from "@/domain/value-objects/url";

import { DomainException } from "../errors/exceptions/domain-exception";

export interface AuthorProps {
  name: string;
  user: string;
  avatar: string;
}

export class Author {
  private static readonly errors: string[] = [];

  private constructor(
    public readonly name: string,
    public readonly user: string,
    public readonly avatar: Url,
  ) {}

  private static addError(error: string): void {
    this.errors.push(error);
  }

  private static hasErrors(): boolean {
    return this.errors.length > 0;
  }

  private static getErrorMessages(): string {
    return this.errors.filter((err) => err).join(", ");
  }

  public static new(props: AuthorProps): Author {
    if (props.name?.length < 4 || props.name?.length > 15) {
      this.addError(errorMessage.invalid_author_name_length);
    }

    if (props.user?.length < 4 || props.user?.length > 50) {
      this.addError(errorMessage.invalid_author_user_length);
    }

    const VALID_CHARACTERS = /[^A-Za-z0-9_]+/gim;

    if (VALID_CHARACTERS.test(props.user)) {
      this.addError(errorMessage.invalid_author_user_characters);
    }

    const avatar = Url.new(props.avatar);

    if (avatar.isErr()) {
      this.addError(errorMessage.invalid_url("for avatar"));
    }

    if (this.hasErrors()) {
      throw new DomainException({
        message: this.getErrorMessages(),
        name: "Invalid author props",
        stack: Author.name,
      });
    }

    return new Author(props.name, props.user, avatar.unwrap());
  }
}
