import { randomUUID } from "crypto";

import { TweetUrl } from "@/domain/value-objects/tweet-url";
import { Url } from "@/domain/value-objects/url";

type Format = "instagram_stories" | "instagram_timeline";

export interface ScreenshootProps {
  id?: string;
  tweet: string;
  image: string;
  format: Format;
  createdAt?: Date | number;
}

export class Screenshot {
  private static readonly errors: string[] = [];

  private constructor(
    public readonly id: string,
    public readonly tweet: TweetUrl,
    public readonly image: Url,
    public readonly format: Format,
    public readonly createdAt: Date,
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

  public static new(props: ScreenshootProps): Screenshot {
    const id = props.id ?? randomUUID();
    const tweet = TweetUrl.new(props.tweet);
    const image = Url.new(props.image);
    const format = props.format;
    const createdAt = props.createdAt ? new Date(props.createdAt) : new Date();

    if (tweet.isErr()) {
      this.addError(tweet.unwrapErr());
    }

    if (image.isErr()) {
      this.addError(image.unwrapErr());
    }

    if (this.hasErrors()) {
      throw Error(this.getErrorMessages());
    }

    return new Screenshot(
      id,
      tweet.unwrap(),
      image.unwrap(),
      format,
      createdAt,
    );
  }
}
