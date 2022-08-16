import { faker } from "@faker-js/faker";

import { Tweet } from "@/domain/entities/tweet";

export function tweetMockFactory(props?: Partial<Tweet>): Tweet {
  return Tweet.new({
    text: faker.lorem.sentence(10),
    createdAt: faker.date.recent(),
    author: {
      avatar: faker.internet.avatar(),
      name: faker.name.firstName(),
      user: faker.internet.userName().replace(/[^A-Za-z0-9_]+/gim, "_"),
      ...props,
    },
  });
}
