import { Screenshot } from "@/domain/aggregates/screenshot";
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";

export class ScreenshotCreatedEvent implements DomainEvent {
  public readonly name: EventName = "SCREENSHOT_CREATED";

  public constructor(public readonly screenshot: Screenshot) {}
}
