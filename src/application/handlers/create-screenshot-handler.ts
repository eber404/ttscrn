import { Template } from "@/domain/aggregates/template";
import { FoundAuthorEvent } from "@/domain/events/found-author";
import { FoundScreenshotEvent } from "@/domain/events/found-screenshot";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { EventName } from "@/domain/events/types/event-name";
import { CreateScreenshotService } from "@/domain/services/create-screenshot/create-screenshot-service";
import { CreateThemeService } from "@/domain/services/create-theme/create-theme-service";
import { GetScreenshotParamsService } from "@/domain/services/get-screenshot-params/get-screenshot-params-service";

export class CreateScreenshotHandler implements EventHandler {
  public readonly eventName: EventName = "FOUND_AUTHOR";

  public constructor(
    private readonly getScrenshotParamsService: GetScreenshotParamsService,
    private readonly createScreenshotService: CreateScreenshotService,
    private readonly createThemeService: CreateThemeService,
    private readonly mediator: EventMediator,
  ) {}

  public async handle(event: FoundAuthorEvent): Promise<void> {
    const screenshotParams = await this.getScrenshotParamsService.get(
      event.tweet.id,
      event.processId,
    );

    const theme = await this.createThemeService.create(screenshotParams.theme);

    const template = Template.new({
      size: screenshotParams.size,
      theme,
    });

    const screenshot = await this.createScreenshotService.create(
      event.tweet,
      template,
    );

    const foundScreenshotEvent = new FoundScreenshotEvent(
      screenshot,
      screenshotParams.email,
    );

    this.mediator.publish(foundScreenshotEvent);
  }
}
