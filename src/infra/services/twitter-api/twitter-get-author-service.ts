import { twitterClient } from "@/infra/services/twitter-api/twitter-client";

import { InfraException } from "@/domain/errors/exceptions/infra-exception";
import { GetAuthorDto } from "@/domain/services/get-author/get-author-service-dto";
import { GetAuthorService } from "@/domain/services/get-author/get-author-service-id";

export class TwitterAPIGetAuthorService implements GetAuthorService {
  private readonly client = twitterClient;

  public async get(authorId: string): Promise<GetAuthorDto> {
    const { data, errors } = await this.client.v2.user(authorId, {
      "user.fields": ["id", "name", "username", "profile_image_url"],
    });

    if (errors) {
      const error = errors[0];
      throw new InfraException({
        name: error.title,
        message: error.detail,
        stack: TwitterAPIGetAuthorService.name,
      });
    }

    return {
      id: data.id,
      name: data.name,
      user: data.username,
      avatar: data.profile_image_url,
    };
  }
}
