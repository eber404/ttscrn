import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventMediator } from "@/domain/events/types/event-mediator";

interface EventHandlerWithUnsubscribe extends EventHandler {
  unsubscribe(): void;
}

export class DomainMediator implements EventMediator {
  private handlers: EventHandler[] = [];

  public unsubscribe(handler: EventHandler): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  public subscribe(handler: EventHandler): EventHandlerWithUnsubscribe {
    this.handlers.push(handler);

    return {
      ...handler,
      unsubscribe: () => this.unsubscribe(handler),
    };
  }

  public publish(event: DomainEvent): void {
    for (const handler of this.handlers) {
      if (handler.eventName === event.name) {
        handler.handle(event);
      }
    }
  }
}
