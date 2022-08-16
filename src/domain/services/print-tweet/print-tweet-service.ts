import { Template } from "@/domain/entities/template";
import { Tweet } from "@/domain/entities/tweet";

export interface PrintTweetService {
  print(tweet: Tweet, template: Template): Promise<void>;
}
