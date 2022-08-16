import { randomUUID } from "crypto";

import { faker } from "@faker-js/faker";

import { Screenshot } from "@/domain/aggregates/screenshot";

export function screenshotMockFactory(): Screenshot {
  return Screenshot.new({
    tweet: {
      createdAt: faker.date.recent(),
      text: faker.lorem.paragraph(),
      author: {
        avatar: faker.internet.avatar(),
        name: faker.name.firstName(),
        user: faker.internet.userName().replace(" ", "_"),
      },
    },
    id: randomUUID(),
    createdAt: faker.date.recent(),
    image: faker.internet.avatar(),
    template: {
      size: {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
        unit: "px",
      },
      social: "instagram_stories",
    },
  });
}
