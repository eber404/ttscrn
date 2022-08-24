import { faker } from "@faker-js/faker";

export function userNameFactory(name?: string): string {
  const nameProps = name ?? "";

  const user = faker.internet
    .userName(nameProps)
    .replace(/[^A-Za-z0-9_]+/, "_")
    .slice(0, 14);

  return user;
}
