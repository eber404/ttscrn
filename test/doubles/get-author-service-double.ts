import { faker } from "@faker-js/faker";

import { GetAuthorDto } from "@/domain/services/get-author/get-author-service-dto";
import { GetAuthorService } from "@/domain/services/get-author/get-author-service-id";

export class GetAuthorServiceDouble implements GetAuthorService {
  public async get(): Promise<GetAuthorDto> {
    return {
      avatar: faker.internet.avatar(),
      id: faker.datatype.number.toString(),
      name: faker.name.firstName(),
      user: faker.internet.userName().replace(/[^A-Za-z0-9_]+/gim, "_"),
    };
  }
}
