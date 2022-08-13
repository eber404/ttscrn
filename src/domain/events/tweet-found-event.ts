import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";
import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

export class TweetFoundEvent implements DomainEvent {
  public readonly name: EventName = "TWEET_FOUND";

  public constructor(public readonly basictweetInfo: GetTweetServiceDTO) {}
}
