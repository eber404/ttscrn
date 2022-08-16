import { faker } from "@faker-js/faker";

import { AuthorProps } from "@/domain/entities/author";

export function authorPropsMock(props?: Partial<AuthorProps>): AuthorProps {
  return {
    avatar: props?.avatar ?? faker.internet.url(),
    name: props?.name ?? faker.name.firstName(),
    user:
      props?.user ??
      faker.internet.userName().replace(/[^A-Za-z0-9_]+/gim, "_"),
  };
}
