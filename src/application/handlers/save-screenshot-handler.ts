import { createHash } from "crypto";

import { CreatedScreenshotEvent } from "@/domain/events/created-screenshot";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventName } from "@/domain/events/types/event-name";
import { CreateScreenshotHashService } from "@/domain/services/create-screenshot-hash/create-screenshot-hash-service";
import { SaveScreenshotService } from "@/domain/services/save-screenshot/save-screenshot-service";

export class StoreScreenshotHandler implements EventHandler {
  public readonly eventName: EventName = "CREATED_SCREENSHOT";

  public constructor(
    private readonly saveScreenshotService: SaveScreenshotService,
    private readonly createScreenshotHashService: CreateScreenshotHashService,
  ) {}

  public async handle(event: CreatedScreenshotEvent): Promise<void> {
    const screenshotHash = createHash("sha256")
      .update(JSON.stringify(event.screenshot))
      .digest("hex");

    await this.saveScreenshotService.save(screenshotHash, event.screenshot);
  }
}
