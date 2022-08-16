import { Template } from "@/domain/entities/template";
import { Tweet } from "@/domain/entities/tweet";
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";

export class TweetReadyToPrintEvent implements DomainEvent {
  public readonly name: EventName = "TWEET_READY_TO_PRINT";

  public constructor(
    public readonly tweet: Tweet,
    public readonly template: Template,
  ) {}
}
