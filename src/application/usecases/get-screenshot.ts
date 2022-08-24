import { randomUUID } from "crypto";

import { ScreenshotParamsDTO } from "@/domain/dtos/screenshot-params-dto";
import { FoundScreenshotEvent } from "@/domain/events/found-screenshot";
import { FoundTweetEvent } from "@/domain/events/found-tweet";
import { ReceivedScreenshotParamsEvent } from "@/domain/events/received-screenshot-params";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { GetScreenshotService } from "@/domain/services/get-screenshot/get-screenshot-service";
import { GetTweetService } from "@/domain/services/get-tweet/get-tweet-service";
import { Command } from "@/domain/usecases";

import { GetScreenshotUseCaseInput } from "./get-screenshot-input";

export class GetScreenshotUseCase
  implements Command<GetScreenshotUseCaseInput>
{
  public constructor(
    private readonly mediator: EventMediator,
    private readonly getTweetService: GetTweetService,
    private readonly getScreenshotService: GetScreenshotService,
  ) {}

  public async execute(input: GetScreenshotUseCaseInput): Promise<void> {
    const screenshot = await this.getScreenshotService.get(
      input.tweetId,
      input.size,
      input.theme,
    );

    if (screenshot) {
      const foundScreenshotEvent = new FoundScreenshotEvent(
        screenshot,
        input.email,
      );

      return this.mediator.publish(foundScreenshotEvent);
    }

    const tweet = await this.getTweetService.get(input.tweetId);

    const processId = randomUUID();

    const foundTweetEvent = new FoundTweetEvent(tweet, processId);

    const screenshotParams: ScreenshotParamsDTO = {
      email: input.email,
      size: input.size,
      theme: input.theme,
      tweetId: input.tweetId,
    };

    const receivedScreenshotParamsEvent = new ReceivedScreenshotParamsEvent(
      screenshotParams,
      processId,
    );

    this.mediator.publish(foundTweetEvent);
    this.mediator.publish(receivedScreenshotParamsEvent);
  }
}
