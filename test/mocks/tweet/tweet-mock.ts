import { faker } from "@faker-js/faker";

import { Tweet, TweetProps } from "@/domain/entities/tweet";

import { userNameFactory } from "@test/helpers/username-factory";

export function tweetMockFactory(props?: Partial<TweetProps>): Tweet {
  const name = faker.name.firstName();

  return Tweet.new({
    text: faker.lorem.sentence(10),
    createdAt: faker.date.recent(),
    author: {
      avatar: faker.internet.avatar(),
      name,
      user: userNameFactory(name),
    },
    device: faker.internet.userAgent().split(" ")[0],
    ...props,
  });
}
