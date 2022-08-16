import { Template } from "@/domain/entities/template";
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";
import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

export class ValidTweetFoundEvent implements DomainEvent {
  public readonly name: EventName = "VALID_TWEET_FOUND";

  public constructor(
    public readonly basictweetInfo: GetTweetServiceDTO,
    public readonly template: Template,
  ) {}
}
