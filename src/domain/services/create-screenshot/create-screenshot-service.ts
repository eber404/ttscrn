import { Screenshot } from "@/domain/aggregates/screenshot";
import { Template } from "@/domain/aggregates/template";
import { Tweet } from "@/domain/entities/tweet";

export interface CreateScreenshotService {
  create(tweet: Tweet, template: Template): Promise<Screenshot>;
}
