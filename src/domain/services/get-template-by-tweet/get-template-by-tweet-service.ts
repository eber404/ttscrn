import { Template } from "@/domain/aggregates/template";

export interface GetTemplateByTweetService {
  get: (tweetHash: string) => Promise<Template>;
}
