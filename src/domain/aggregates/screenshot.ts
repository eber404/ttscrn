import { randomUUID } from "crypto";

import { z } from "zod";

import { Template } from "@/domain/aggregates/template";
import { Tweet } from "@/domain/entities/tweet";
import { DomainException } from "@/domain/errors/domain-error";
import { DomainValidation } from "@/domain/validations/domain-validation";

const ScreenshotSchema = z.object({
  id: z.string().optional().optional().default(randomUUID()),
  image: z.string().url(),
  createdAt: z.date(),
});

type ScreenshotSchemaProps = z.infer<typeof ScreenshotSchema>;

interface ScreenshootProps extends ScreenshotSchemaProps {
  tweet: Tweet;
  template: Template;
}

export class Screenshot extends DomainValidation {
  private constructor(
    public readonly id: string,
    public readonly tweet: Tweet,
    public readonly image: URL,
    public readonly template: Template,
    public readonly createdAt: Date,
  ) {
    super();
  }

  public static new(props: ScreenshootProps): Screenshot {
    const validation = this.validate<Screenshot>(ScreenshotSchema, props);

    if (validation.isErr()) {
      throw new DomainException({
        name: "Invalid props for entity",
        message: validation.unwrapErr(),
        stack: Screenshot.name,
      });
    }

    const result = validation.unwrap();

    return new Screenshot(
      result.id,
      result.tweet,
      result.image,
      result.template,
      result.createdAt,
    );
  }
}
