import { Template } from "@/domain/aggregates/template";

export interface StoreTemplateService {
  store: (tweetHash: string, template: Template) => Promise<void>;
}
