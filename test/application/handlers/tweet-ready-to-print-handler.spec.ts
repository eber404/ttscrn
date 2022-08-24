import { TweetReadyToPrintHandler } from "@/application/handlers/tweet-ready-to-print-handler";

import { Tweet } from "@/domain/entities/tweet";
import { Templates } from "@/domain/enums/templates";
import { Themes } from "@/domain/enums/theme";
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
  const template = Templates.whatsapp_post;
  const theme = Themes.light;
  const event = new TweetReadyToPrintEvent(tweet, template, theme);

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
    const { handler, mediator, service, event } = makeSut();
    jest.spyOn(service, "print");
    jest.spyOn(handler, "handle");
    mediator.subscribe(handler);

    // when
    mediator.publish(event);

    // then
    expect(handler.handle).toBeCalledWith(event);
    expect(service.print).toBeCalledWith(
      event.tweet,
      event.template,
      event.theme,
    );
  });
});
