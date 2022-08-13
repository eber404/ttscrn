import { Tweet } from "@/domain/aggregates/tweet";

export interface PrintTweetService {
  print(tweet: Tweet): Promise<void>;
}
