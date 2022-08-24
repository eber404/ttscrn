import { DomainConfig } from "@/domain/config";
import { CreatedScreenshotEvent } from "@/domain/events/created-screenshot";
import { FoundAuthorEvent } from "@/domain/events/found-author";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { EventName } from "@/domain/events/types/event-name";
import { CreateTweetHashService } from "@/domain/services/create-tweet-hash/create-tweet-hash-service";
import { GetTemplateByTweetService } from "@/domain/services/get-template-by-tweet/get-template-by-tweet-service";
import { PrintTweetService } from "@/domain/services/print-tweet/print-tweet-service";

export class PrintTweetHandler implements EventHandler {
  public readonly eventName: EventName = "FOUND_AUTHOR";

  public constructor(
    private readonly createTweetHashService: CreateTweetHashService,
    private readonly getTemplateByTweetService: GetTemplateByTweetService,
    private readonly printTweetService: PrintTweetService,
    private readonly mediator: EventMediator,
  ) {}

  public async handle(event: FoundAuthorEvent): Promise<void> {
    const tweet = {
      tweetId: event.tweet.id,
      tweetCreatedAt: event.tweet.createdAt.toISOString(),
    };

    const tweetHash = await this.createTweetHashService.create(
      tweet,
      DomainConfig.hash.algorithm,
      DomainConfig.hash.encondig,
    );

    const template = await this.getTemplateByTweetService.get(tweetHash);

    const screenshot = await this.printTweetService.print(
      event.tweet,
      template,
    );

    const createdScreenshot = new CreatedScreenshotEvent(screenshot);

    this.mediator.publish(createdScreenshot);
  }
}
