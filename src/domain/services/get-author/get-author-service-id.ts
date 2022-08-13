import { GetAuthorDto } from "./get-author-service-dto";

export interface GetAuthorService {
  get(authorId: string): Promise<GetAuthorDto>;
}
