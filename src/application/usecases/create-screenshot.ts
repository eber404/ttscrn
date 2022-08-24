import { ThemeType } from "@/domain/entities/theme";
import { Shape } from "@/domain/enums/shape";
import { FoundTweetEvent } from "@/domain/events/found-tweet";
import { ReceivedTemplateParamsEvent } from "@/domain/events/received-template";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { GetTweetService } from "@/domain/services/get-tweet/get-tweet-service";
import { Command } from "@/domain/usecases";

interface Input {
  tweetId: string;
  shape: Shape;
  theme: ThemeType;
}

export class CreateScreenshotUseCase implements Command<Input> {
  public constructor(
    private readonly mediator: EventMediator,
    private readonly getTweetService: GetTweetService,
  ) {}

  public async execute(input: Input): Promise<void> {
    const tweet = await this.getTweetService.get(input.tweetId);

    const foundTweetEvent = new FoundTweetEvent(tweet);
    const receveidTemplateParams = new ReceivedTemplateParamsEvent(
      tweet,
      input.shape,
      input.theme,
    );

    this.mediator.publish(foundTweetEvent);
    this.mediator.publish(receveidTemplateParams);
  }
}
