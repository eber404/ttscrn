import { faker } from "@faker-js/faker";

import { TweetProps } from "@/domain/entities/tweet";

export function tweetPropsFactory(props?: Partial<TweetProps>): TweetProps {
  return {
    author: {
      avatar: faker.internet.avatar(),
      name: faker.name.firstName(),
      user: faker.internet.userName().replace(/[^A-Za-z0-9_]+/gim, "_"),
    },
    createdAt: faker.date.recent(),
    text: faker.lorem.sentence(3),
    ...props,
  };
}
