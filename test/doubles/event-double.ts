/* eslint-disable @typescript-eslint/no-empty-function */
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";

export class EventDouble implements DomainEvent {
  public name: EventName = "TEST_EVENT" as EventName;
  public constructor() {}
}
