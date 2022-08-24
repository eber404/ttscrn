import { Screenshot } from "@/domain/aggregates/screenshot";
import { Template } from "@/domain/aggregates/template";
import { Tweet } from "@/domain/entities/tweet";

export interface PrintTweetService {
  print(tweet: Tweet, template: Template): Promise<Screenshot>;
}
