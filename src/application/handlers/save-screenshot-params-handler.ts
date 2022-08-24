import { ReceivedScreenshotParamsEvent } from "@/domain/events/received-screenshot-params";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventName } from "@/domain/events/types/event-name";
import { SaveScreenshotParamsService } from "@/domain/services/save-screenshot-params/save-screenshot-params-service";

export class SaveScreenshotParamsHandler implements EventHandler {
  public readonly eventName: EventName = "RECEIVED_SCREENSHOT_PARAMS";

  public constructor(
    private readonly saveScreenshotParamsService: SaveScreenshotParamsService,
  ) {}

  public async handle(event: ReceivedScreenshotParamsEvent): Promise<void> {
    await this.saveScreenshotParamsService.save({
      tweetId: event.tweetId,
      size: event.size,
      theme: event.theme,
      email: event.email,
      processedAt: event.processedAt,
    });
  }
}
