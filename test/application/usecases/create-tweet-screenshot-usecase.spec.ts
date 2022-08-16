import { faker } from "@faker-js/faker";

import { CreateTweetScreenshotUseCase } from "@/application/usecases/create-tweet-screenshot-usecase";

import { InfraException } from "@/domain/errors/exceptions/infra-exception";
import { ValidTweetFoundEvent } from "@/domain/events/tweet-found-event";
import { EventMediator } from "@/domain/events/types/event-mediator";
import { GetTweetService } from "@/domain/services/get-tweet/get-tweet-service";

import { EventMediatorDouble } from "@test/doubles/event-mediator-double";
import { GetTweetServiceDouble } from "@test/doubles/get-tweet-service-double";
import { validTweetFoundEventFactory } from "@test/mocks/valid-tweet-found-event-mock";

interface Sut {
  service: GetTweetService;
  mediator: EventMediator;
  event: ValidTweetFoundEvent;
  usecase: CreateTweetScreenshotUseCase;
}

const makeSut = (props?: Partial<Sut>): Sut => {
  const service = new GetTweetServiceDouble();
  const mediator = new EventMediatorDouble();
  const event = validTweetFoundEventFactory();
  const usecase = new CreateTweetScreenshotUseCase(service, mediator);

  return {
    service,
    mediator,
    event,
    usecase,
    ...props,
  };
};

describe(CreateTweetScreenshotUseCase.name, () => {
  it(`should validate a screenshot solicitation and publish ${ValidTweetFoundEvent.name} event`, async () => {
    // given
    const tweetIdMock = faker.datatype.number().toString();
    const eventMock = validTweetFoundEventFactory({
      id: tweetIdMock,
    });
    const { usecase, mediator, service } = makeSut({ event: eventMock });
    jest.spyOn(service, "get");
    jest.spyOn(mediator, "publish");

    // when
    await usecase.execute({ tweetId: tweetIdMock });

    // then
    expect(service.get).toBeCalledWith(tweetIdMock);
    expect(mediator.publish).toBeCalled();
  });

  it(`should not catch an error if something wrong happens on the flow`, async () => {
    try {
      // given
      const { usecase, mediator, service } = makeSut();
      jest.spyOn(service, "get").mockRejectedValue(
        new InfraException({
          name: "infra error",
          message: "something wrong happened",
        }),
      );
      jest.spyOn(mediator, "publish");
      const inputMock = "123123123123";

      // when
      await usecase.execute({ tweetId: inputMock });

      // then
      expect(mediator.publish).not.toBeCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(InfraException);
    }
  });
});
