import { twitterClient } from "@/infra/services/twitter/twitter-client";

import { RepositoryException } from "@/domain/errors/exceptions/infra-exception";
import { GetAuthorDto } from "@/domain/services/get-author/get-author-service-dto";
import { GetAuthorService } from "@/domain/services/get-author/get-author-service-id";

export class TwitterGetAuthorService implements GetAuthorService {
  private readonly client = twitterClient;

  public async get(authorId: string): Promise<GetAuthorDto> {
    const { data, errors } = await this.client.v2.user(authorId, {
      "user.fields": ["id", "name", "username", "profile_image_url"],
    });

    if (errors?.length > 0) {
      throw new RepositoryException(
        errors.map((err) => err.title),
        TwitterGetAuthorService.name,
      );
    }

    console.log("data", data);

    return {
      id: data.id,
      name: data.name,
      user: data.username,
      avatar: data.profile_image_url,
    };
  }
}
