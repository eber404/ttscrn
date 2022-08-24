import { Screenshot } from "@/domain/aggregates/screenshot";
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";

export class FoundScreenshotEvent implements DomainEvent {
  public readonly name: EventName = "FOUND_SCREENSHOT";
  public readonly processedAt = Date.now();

  public constructor(
    public readonly screenshot: Screenshot,
    public readonly email: string,
  ) {}
}
