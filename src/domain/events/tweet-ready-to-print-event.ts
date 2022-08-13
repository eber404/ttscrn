import { Tweet } from "@/domain/aggregates/tweet";
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";

export class TweetReadyToPrintEvent implements DomainEvent {
  public readonly name: EventName = "TWEET_READY_TO_PRINT";

  public constructor(public readonly tweet: Tweet) {}
}
