import { Tweet } from "@/domain/entities/tweet";
import { FoundAuthorEvent } from "@/domain/events/found-author";
import { FoundTweetEvent } from "@/domain/events/found-tweet";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { EventName } from "@/domain/events/types/event-name";
import { GetAuthorService } from "@/domain/services/get-author/get-author-service-id";

export class GetAuthorHandler implements EventHandler {
  public readonly eventName: EventName = "FOUND_TWEET";

  public constructor(
    private readonly getAuthorService: GetAuthorService,
    private readonly mediator: EventMediator,
  ) {}

  public async handle(event: FoundTweetEvent): Promise<void> {
    const { avatar, name, user } = await this.getAuthorService.get(
      event.tweet.authorId,
    );

    const tweet = Tweet.new({
      id: event.tweet.id,
      text: event.tweet.text,
      createdAt: event.tweet.createdAt,
      device: event.tweet.device,
      author: {
        avatar,
        name,
        user,
      },
    });

    const foundAuthorEvent = new FoundAuthorEvent(tweet, event.processId);

    this.mediator.publish(foundAuthorEvent);
  }
}
