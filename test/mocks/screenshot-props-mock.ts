import { faker } from "@faker-js/faker";

import { ScreenshootProps } from "@/domain/aggregates/screenshot";

export function screenshotPropsFactory(
  props?: Partial<ScreenshootProps>,
): ScreenshootProps {
  return {
    image: faker.image.lorempixel.abstract(),
    template: {
      size: {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
        unit: "px",
      },
      social: "instagram_stories",
    },
    tweet: {
      text: faker.lorem.sentence(3),
      author: {
        avatar: faker.internet.avatar(),
        name: faker.name.firstName(),
        user: faker.internet.userName().replace(/[^A-Za-z0-9_]+/gim, "_"),
      },
      createdAt: faker.date.recent().toISOString(),
    },
    ...props,
  };
}
