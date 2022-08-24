import { faker } from "@faker-js/faker";

import { ValidTweetFoundHandler } from "@/application/handlers/valid-tweet-found-handler";

import { Templates } from "@/domain/enums/templates";
import { Themes } from "@/domain/enums/theme";
import { ValidTweetFoundEvent } from "@/domain/events/tweet-found-event";
import { TweetReadyToPrintEvent } from "@/domain/events/tweet-ready-to-print-event";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { GetAuthorService } from "@/domain/services/get-author/get-author-service-id";
import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

import { EventMediatorDouble } from "@test/doubles/event-mediator-double";
import { GetAuthorServiceDouble } from "@test/doubles/get-author-service-double";

interface Sut {
  mediator: EventMediator;
  service: GetAuthorService;
  handler: EventHandler;
}

const makeSut = (): Sut => {
  const mediator = new EventMediatorDouble();
  const service = new GetAuthorServiceDouble();
  const handler = new ValidTweetFoundHandler(service, mediator);

  return {
    mediator,
    service,
    handler,
  };
};

describe(ValidTweetFoundHandler.name, () => {
  it(`should call get author service and publish a ${TweetReadyToPrintEvent.name}`, async () => {
    // given
    const { handler, mediator, service } = makeSut();
    jest.spyOn(handler, "handle");
    jest.spyOn(service, "get");
    const basictweetInfo: GetTweetServiceDTO = {
      authorId: faker.datatype.number().toString(),
      createdAt: faker.date.recent().toString(),
      id: faker.datatype.number.toString(),
      text: faker.lorem.paragraph(),
      device: faker.internet.userAgent().split(" ")[0],
    };
    const template = Templates.instagram_stories;
    const theme = Themes.light;
    const event = new ValidTweetFoundEvent(basictweetInfo, template, theme);

    mediator.subscribe(handler);

    // when
    mediator.publish(event);

    // then
    expect(handler.handle).toBeCalledWith(event);
    expect(service.get).toBeCalledWith(event.basictweetInfo.authorId);
  });
});
