import { faker } from "@faker-js/faker";

import { Templates } from "@/domain/enums/templates";
import { Themes } from "@/domain/enums/theme";
import { ValidTweetFoundEvent } from "@/domain/events/tweet-found-event";
import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

export function validTweetFoundEventFactory(
  props?: Partial<GetTweetServiceDTO>,
): ValidTweetFoundEvent {
  const basictweetInfo: GetTweetServiceDTO = {
    id: faker.datatype.number().toString(),
    text: faker.lorem.paragraph(),
    authorId: faker.datatype.number().toString(),
    createdAt: faker.date.recent().toISOString(),
    device: faker.internet.userName().split(" ")[0],
    ...props,
  };

  const template = Templates.linkedin_post;
  const theme = Themes.dark;

  return new ValidTweetFoundEvent(basictweetInfo, template, theme);
}
