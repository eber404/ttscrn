import { z } from "zod";

import { Author, AuthorProps } from "@/domain/entities/author";
import { DomainError } from "@/domain/errors/domain-error";
import { DomainValidation } from "@/domain/validations/domain-validation";

const TWEET_MAX_LENGTH = 280;
const TWEET_MIN_LENGTH = 1;
const DEVICE_MIN_LENGTH = 1;

const TweetSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(TWEET_MIN_LENGTH).max(TWEET_MAX_LENGTH),
  device: z.string().min(DEVICE_MIN_LENGTH),
  createdAt: z.date(),
});

type TweetSchemaProps = z.infer<typeof TweetSchema>;

interface TweetProps extends Omit<TweetSchemaProps, "createdAt"> {
  author: AuthorProps;
  createdAt: Date | string;
}

export class Tweet extends DomainValidation {
  private constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly author: Author,
    public readonly device: string,
    public readonly createdAt: Date,
  ) {
    super();
  }

  public static new(props: TweetProps): Tweet {
    const validation = this.validate<Tweet, TweetProps>(TweetSchema, {
      ...props,
      createdAt: new Date(props.createdAt),
    });

    if (validation.isErr()) {
      throw new DomainError({
        name: "Invalid props for entity",
        message: validation.unwrapErr(),
        stack: Tweet.name,
      });
    }

    const result = validation.unwrap();

    return new Tweet(
      result.id,
      result.text,
      result.author,
      result.device,
      result.createdAt,
    );
  }
}
