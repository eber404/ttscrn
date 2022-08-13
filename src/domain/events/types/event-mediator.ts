import { EventHandler } from "@/domain/events/types/event-handler";

import { DomainEvent } from "./domain-event";

export interface EventMediator {
  subscribe(handler: EventHandler): void;
  publish(event: DomainEvent): void;
}
