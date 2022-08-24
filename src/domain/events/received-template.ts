import { ThemeType } from "@/domain/entities/theme";
import { Shape } from "@/domain/enums/shape";
import { DomainEvent } from "@/domain/events/types/domain-event";
import { EventName } from "@/domain/events/types/event-name";
import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

export class ReceivedTemplateParamsEvent implements DomainEvent {
  public readonly name: EventName = "RECEIVED_TEMPLATE_PARAMS";

  public constructor(
    public readonly tweet: GetTweetServiceDTO,
    public readonly shape: Shape,
    public readonly theme: ThemeType,
  ) {}
}
