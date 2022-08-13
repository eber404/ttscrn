import { DomainEvent } from "@/domain/events/types/domain-event";

import { EventName } from "./event-name";

export interface EventHandler {
  eventName: EventName;
  handle(event: DomainEvent): Promise<void> | void;
}
