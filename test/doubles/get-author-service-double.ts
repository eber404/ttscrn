import { faker } from "@faker-js/faker";

import { GetAuthorServiceDto } from "@/domain/services/get-author/get-author-service-dto";
import { GetAuthorService } from "@/domain/services/get-author/get-author-service-id";

import { userNameFactory } from "@test/helpers/username-factory";

export class GetAuthorServiceDouble implements GetAuthorService {
  public async get(): Promise<GetAuthorServiceDto> {
    const name = faker.name.firstName();

    return {
      avatar: faker.internet.avatar(),
      id: faker.datatype.number.toString(),
      name,
      user: userNameFactory(name),
    };
  }
}
