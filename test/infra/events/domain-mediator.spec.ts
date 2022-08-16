import { DomainMediator } from "@/infra/events/domain-mediator";

import { EventDouble } from "@test/doubles/event-double";
import { EventHandlerDouble } from "@test/doubles/event-handler-double";

describe(DomainMediator.name, () => {
  it("should subscribe a handler and publish an event", async () => {
    // given
    const mediator = new DomainMediator();
    jest.spyOn(mediator, "subscribe");
    jest.spyOn(mediator, "publish");
    const handler = new EventHandlerDouble();
    const event = new EventDouble();

    // when
    mediator.subscribe(handler);
    mediator.publish(event);

    // then
    expect(mediator.subscribe).toBeCalled();
    expect(mediator.publish).toBeCalledWith(event);
  });
});
