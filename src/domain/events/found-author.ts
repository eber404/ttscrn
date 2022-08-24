import { Tweet } from "@/domain/entities/tweet";
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";

export class FoundAuthorEvent implements DomainEvent {
  public readonly name: EventName = "FOUND_AUTHOR";

  public constructor(public readonly tweet: Tweet) {}
}
