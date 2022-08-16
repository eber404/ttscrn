import { randomUUID } from "crypto";

import { Template, TemplateProps } from "@/domain/entities/template";
import { Tweet, TweetProps } from "@/domain/entities/tweet";
import { errorMessage } from "@/domain/errors/error-message";
import { DomainException } from "@/domain/errors/exceptions/domain-exception";
import { SafeDate } from "@/domain/value-objects/safe-date";
import { Url } from "@/domain/value-objects/url";

export interface ScreenshootProps {
  id?: string;
  tweet: TweetProps;
  image: string;
  template: TemplateProps;
  createdAt?: Date | string;
}

export class Screenshot {
  private static readonly errors: string[] = [];

  private constructor(
    public readonly id: string,
    public readonly tweet: Tweet,
    public readonly image: Url,
    public readonly template: Template,
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

  public static new(props: ScreenshootProps): Screenshot {
    const id = props.id ?? randomUUID();
    const tweet = Tweet.new(props.tweet);
    const image = Url.new(props.image);
    const template = Template.new(props.template);
    const createdAt = SafeDate.new(props.createdAt ?? new Date());

    if (image.isErr()) {
      this.addError(image.unwrapErr());
    }

    if (createdAt.isErr()) {
      this.addError(createdAt.unwrapErr());
    }

    if (this.hasErrors()) {
      throw new DomainException({
        name: errorMessage.invalid_screenshot_props,
        message: this.getErrorMessages(),
        stack: Screenshot.name,
      });
    }

    return new Screenshot(
      id,
      tweet,
      image.unwrap(),
      template,
      createdAt.unwrap(),
    );
  }
}
