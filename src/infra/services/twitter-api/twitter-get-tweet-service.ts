import { twitterClient } from "@/infra/services/twitter-api/twitter-client";

import { InfraException } from "@/domain/errors/exceptions/infra-exception";
import { GetTweetService } from "@/domain/services/get-tweet/get-tweet-service";
import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

export class TwitterAPIGetTweetService implements GetTweetService {
  private readonly client = twitterClient;

  public async get(tweetId: string): Promise<GetTweetServiceDTO> {
    const { data, errors } = await this.client.v2.singleTweet(tweetId, {
      "tweet.fields": ["id", "text", "author_id", "created_at"],
    });

    if (errors) {
      const { title, detail } = errors[0];
      throw new InfraException({
        name: title,
        message: detail,
        stack: TwitterAPIGetTweetService.name,
      });
    }

    return {
      id: data.id,
      text: data.text,
      authorId: data.author_id,
      createdAt: data.created_at,
    };
  }
}
