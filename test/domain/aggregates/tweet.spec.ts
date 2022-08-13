import { Author, AuthorProps } from "@/domain/entities/author";
import { errorMessage } from "@/domain/errors/error-message";
import { TweetUrl } from "@/domain/value-objects/tweet-url";
import { Url } from "@/domain/value-objects/url";

export interface TweetProps {
  text: string;
  author: AuthorProps;
  url: string;
}

export class Tweet {
  private static readonly errors: string[] = [];

  private constructor(
    public readonly text: string,
    public readonly author: Author,
    public readonly url: TweetUrl,
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
    const url = Url.new(props.url);

    const TWEET_MAX_LENGTH = 280;

    if (props.text.length > TWEET_MAX_LENGTH) {
      this.addError(errorMessage.invalid_tweet_text);
    }

    if (url.isErr()) {
      this.addError(url.unwrapErr());
    }

    if (this.hasErrors()) {
      throw Error(this.getErrorMessages());
    }

    return new Tweet(props.text, author, url.unwrap());
  }
}
