import { ScreenshotParamsDTO } from "@/domain/dtos/screenshot-params-dto";
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";

export class ReceivedScreenshotParamsEvent implements DomainEvent {
  public readonly name: EventName = "RECEIVED_SCREENSHOT_PARAMS";

  public constructor(
    public readonly screenshotParams: ScreenshotParamsDTO,
    public readonly processId: string,
  ) {}
}
