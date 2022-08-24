import { Screenshot } from "@/domain/aggregates/screenshot";
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";

export class CreatedScreenshotEvent implements DomainEvent {
  public readonly name: EventName = "CREATED_SCREENSHOT";

  public constructor(public readonly screenshot: Screenshot) {}
}
