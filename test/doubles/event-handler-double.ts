import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventName } from "@/domain/events/types/event-name";

export class EventHandlerDouble implements EventHandler {
  public eventName: EventName = "TEST_EVENT" as EventName;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handle(event: DomainEvent): void {
    return;
  }
}
