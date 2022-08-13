import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

export interface GetTweetService {
  get(tweetId: string): Promise<GetTweetServiceDTO>;
}
