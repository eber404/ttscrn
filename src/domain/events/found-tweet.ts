import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";
import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

export class FoundTweetEvent implements DomainEvent {
  public readonly name: EventName = "FOUND_TWEET";

  public constructor(public readonly tweet: GetTweetServiceDTO) {}
}
