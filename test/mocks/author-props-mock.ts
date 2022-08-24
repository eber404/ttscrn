import { faker } from "@faker-js/faker";

import { AuthorProps } from "@/domain/entities/author";

import { userNameFactory } from "@test/helpers/username-factory";

export function authorPropsMock(props?: Partial<AuthorProps>): AuthorProps {
  const name = faker.name.firstName();

  return {
    avatar: faker.internet.url(),
    name,
    user: userNameFactory(name),
    ...props,
  };
}
