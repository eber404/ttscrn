import { GetAuthorServiceDto } from "./get-author-service-dto";

export interface GetAuthorService {
  get(authorId: string): Promise<GetAuthorServiceDto>;
}
