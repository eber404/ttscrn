import { faker } from "@faker-js/faker";

import { ValidTweetFoundEvent } from "@/domain/events/tweet-found-event";
import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

export function validTweetFoundEventFactory(
  props?: Partial<GetTweetServiceDTO>,
): ValidTweetFoundEvent {
  return new ValidTweetFoundEvent({
    id: faker.datatype.number().toString(),
    text: faker.lorem.paragraph(),
    authorId: faker.datatype.number().toString(),
    createdAt: faker.date.recent().toISOString(),
    ...props,
  });
}
