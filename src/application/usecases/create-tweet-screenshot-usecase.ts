import { Shape } from "@/domain/enums/shape";
import { Templates } from "@/domain/enums/templates";
import { ValidTweetFoundEvent } from "@/domain/events/tweet-found-event";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { GetTweetService } from "@/domain/services/get-tweet/get-tweet-service";
import { Command } from "@/domain/usecases/interfaces";

interface CreateTweetScreenshotInput {
  tweetId: string;
  shape: Shape;
}

export class CreateTweetScreenshotUseCase
  implements Command<CreateTweetScreenshotInput>
{
  public constructor(
    private readonly getTweetService: GetTweetService,
    private readonly mediator: EventMediator,
  ) {}

  public async execute(input: CreateTweetScreenshotInput): Promise<void> {
    const tweetBasicInfo = await this.getTweetService.get(input.tweetId);

    const template = Templates[input.shape];

    const validTweetFoundEvent = new ValidTweetFoundEvent(
      tweetBasicInfo,
      template,
    );
    this.mediator.publish(validTweetFoundEvent);
  }
}
