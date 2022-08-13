import { TweetFoundEvent } from "@/domain/events/tweet-found-event";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { GetTweetService } from "@/domain/services/get-tweet/get-tweet-service";
import { Command } from "@/domain/usecases/interfaces";

interface ValidateTweetInput {
  tweetId: string;
}

export class ValidateTweetUseCase implements Command<ValidateTweetInput> {
  public constructor(
    private readonly getTweetService: GetTweetService,
    private readonly mediator: EventMediator,
  ) {}

  public async execute(input: ValidateTweetInput): Promise<void> {
    const tweetBasicInfo = await this.getTweetService.get(input.tweetId);

    if (tweetBasicInfo.text) {
      const tweetFoundEvent = new TweetFoundEvent(tweetBasicInfo);
      this.mediator.publish(tweetFoundEvent);
    }
  }
}
