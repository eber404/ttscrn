import { faker } from "@faker-js/faker";

import { ScreenshootProps } from "@/domain/aggregates/screenshot";

import { userNameFactory } from "@test/helpers/username-factory";

export function screenshotPropsFactory(
  props?: Partial<ScreenshootProps>,
): ScreenshootProps {
  const name = faker.name.firstName();

  return {
    image: faker.image.lorempixel.abstract(),
    template: {
      size: {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
        unit: "px",
      },
      shape: "instagram_stories",
    },
    tweet: {
      text: faker.lorem.sentence(3),
      author: {
        avatar: faker.internet.avatar(),
        name,
        user: userNameFactory(name),
      },
      createdAt: faker.date.recent().toISOString(),
      device: faker.internet.userAgent().split(" ")[0],
    },
    ...props,
  };
}
