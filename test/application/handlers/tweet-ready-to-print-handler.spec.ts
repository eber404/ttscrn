import { TweetReadyToPrintHandler } from "@/application/handlers/tweet-ready-to-print-handler";

import { Tweet } from "@/domain/entities/tweet";
import { TweetReadyToPrintEvent } from "@/domain/events/tweet-ready-to-print-event";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { PrintTweetService } from "@/domain/services/print-tweet/print-tweet-service";

import { EventMediatorDouble } from "@test/doubles/event-mediator-double";
import { PrintTweetServiceDouble } from "@test/doubles/print-tweet-service-double";
import { tweetMockFactory } from "@test/mocks/tweet/tweet-mock";

interface Sut {
  mediator: EventMediator;
  service: PrintTweetService;
  handler: TweetReadyToPrintHandler;
  tweet: Tweet;
  event: TweetReadyToPrintEvent;
}

const makeSut = (props?: Partial<Sut>): Sut => {
  const mediator = new EventMediatorDouble();
  const service = new PrintTweetServiceDouble();
  const handler = new TweetReadyToPrintHandler(service);
  const tweet = tweetMockFactory();
  const event = new TweetReadyToPrintEvent(tweet);

  return {
    mediator,
    service,
    handler,
    tweet,
    event,
    ...props,
  };
};

describe(TweetReadyToPrintHandler.name, () => {
  it(`should call print tweet service and publish a ScreenshotDoneEvent`, async () => {
    // given
    const { handler, mediator, service, event, tweet } = makeSut();
    jest.spyOn(handler, "handle");
    jest.spyOn(service, "print");
    mediator.subscribe(handler);

    // when
    mediator.publish(event);

    // then
    expect(handler.handle).toBeCalledWith(event);
    expect(service.print).toBeCalledWith(tweet);
  });
});
