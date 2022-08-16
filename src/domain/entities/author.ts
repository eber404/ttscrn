import { errorMessage } from "@/domain/errors/error-message";
import { DomainException } from "@/domain/errors/exceptions/domain-exception";
import { Url } from "@/domain/value-objects/url";

export interface AuthorProps {
  name: string;
  user: string;
  avatar: string;
}

export class Author {
  private static readonly errors: string[] = [];
  private static readonly VALID_USER_CHARACTERS = /[A-Za-z0-9_]+/gim;

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
    if (props.name.length < 3 || props.name.length > 15) {
      this.addError(errorMessage.invalid_author_name_length(props.name));
    }

    if (props.user.length < 4 || props.user.length > 50) {
      this.addError(errorMessage.invalid_author_user_length(props.user));
    }

    if (!this.VALID_USER_CHARACTERS.test(props.user)) {
      this.addError(errorMessage.invalid_author_user_characters(props.user));
    }

    const avatar = Url.new(props.avatar);

    if (avatar.isErr()) {
      this.addError(errorMessage.invalid_url("for avatar"));
    }

    if (this.hasErrors()) {
      throw new DomainException({
        name: errorMessage.author_entity_exception,
        message: this.getErrorMessages(),
        stack: Author.name,
      });
    }

    return new Author(props.name, props.user, avatar.unwrap());
  }
}
