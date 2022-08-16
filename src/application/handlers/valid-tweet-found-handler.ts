import { Tweet } from "@/domain/entities/tweet";
import { ValidTweetFoundEvent } from "@/domain/events/tweet-found-event";
import { TweetReadyToPrintEvent } from "@/domain/events/tweet-ready-to-print-event";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { EventName } from "@/domain/events/types/event-name";
import { GetAuthorService } from "@/domain/services/get-author/get-author-service-id";

export class ValidTweetFoundHandler implements EventHandler {
  public readonly eventName: EventName = "VALID_TWEET_FOUND";

  public constructor(
    private readonly getAuthorService: GetAuthorService,
    private readonly mediator: EventMediator,
  ) {}

  public async handle(event: ValidTweetFoundEvent): Promise<void> {
    const { avatar, name, user } = await this.getAuthorService.get(
      event.basictweetInfo.authorId,
    );

    const tweet = Tweet.new({
      text: event.basictweetInfo.text,
      createdAt: event.basictweetInfo.createdAt,
      author: {
        avatar,
        name,
        user,
      },
    });

    const tweetReadyToPrintEvent = new TweetReadyToPrintEvent(
      tweet,
      event.template,
    );
    this.mediator.publish(tweetReadyToPrintEvent);
  }
}
