import { TweetReadyToPrintEvent } from "@/domain/events/tweet-ready-to-print-event";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventName } from "@/domain/events/types/event-name";
import { PrintTweetService } from "@/domain/services/print-tweet/print-tweet-service";

export class TweetReadyToPrintHandler implements EventHandler {
  public readonly eventName: EventName = "TWEET_READY_TO_PRINT";

  public constructor(private readonly printTweetService: PrintTweetService) {}

  public async handle(event: TweetReadyToPrintEvent): Promise<void> {
    await this.printTweetService.print(event.tweet);
  }
}
