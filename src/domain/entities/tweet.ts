import { Author, AuthorProps } from "@/domain/entities/author";
import { errorMessage } from "@/domain/errors/error-message";
import { DomainException } from "@/domain/errors/exceptions/domain-exception";
import { SafeDate } from "@/domain/value-objects/safe-date";

export interface TweetProps {
  text: string;
  author: AuthorProps;
  createdAt: Date | string;
}

export class Tweet {
  private static readonly errors: string[] = [];

  private constructor(
    public readonly text: string,
    public readonly author: Author,
    public readonly createdAt: SafeDate,
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

  public static new(props: TweetProps): Tweet {
    const author = Author.new(props.author);
    const createdAt = SafeDate.new(props.createdAt);

    const TWEET_MAX_LENGTH = 280;

    if (props.text.length > TWEET_MAX_LENGTH || props.text.length === 0) {
      this.addError(errorMessage.invalid_tweet_text(props.text));
    }

    if (createdAt.isErr()) {
      this.addError(createdAt.unwrapErr());
    }

    if (this.hasErrors()) {
      throw new DomainException({
        name: errorMessage.tweet_entity_exception,
        message: this.getErrorMessages(),
        stack: Tweet.name,
      });
    }

    return new Tweet(props.text, author, createdAt.unwrap());
  }
}
