import { faker } from "@faker-js/faker";

import { TweetProps } from "@/domain/entities/tweet";

import { userNameFactory } from "@test/helpers/username-factory";

export function tweetPropsFactory(props?: Partial<TweetProps>): TweetProps {
  const name = faker.name.firstName();

  return {
    author: {
      name,
      user: userNameFactory(name),
      avatar: faker.internet.avatar(),
    },
    createdAt: faker.date.recent(),
    text: faker.lorem.sentence(15),
    device: faker.internet.userAgent().split(" ")[0],
    ...props,
  };
}
