import { faker } from "@faker-js/faker";

import { ScreenshootProps } from "@/domain/entities/screenshot";

export function screenshotPropsMock(
  props?: Partial<ScreenshootProps>,
): ScreenshootProps {
  return {
    tweet:
      props?.tweet ??
      "https://twitter.com/dinhoouropreto/status/319238848217493505",
    image: props?.image ?? faker.internet.url(),
    format: props?.format ?? "instagram_stories",
    createdAt: faker.date.recent(),
  };
}
