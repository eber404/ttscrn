import { Template } from "@/domain/aggregates/template";
import { DomainConfig } from "@/domain/config";
import { ReceivedTemplateParamsEvent } from "@/domain/events/received-template";
import { EventHandler } from "@/domain/events/types/event-handler";
import { EventName } from "@/domain/events/types/event-name";
import { CreateSizeService } from "@/domain/services/create-size/create-size-service";
import { CreateThemeService } from "@/domain/services/create-theme/create-theme-service";
import { CreateTweetHashService } from "@/domain/services/create-tweet-hash/create-tweet-hash-service";
import { StoreTemplateService } from "@/domain/services/store-template/store-template-service";

export class SaveTemplateHandler implements EventHandler {
  public readonly eventName: EventName = "RECEIVED_TEMPLATE_PARAMS";

  public constructor(
    private readonly storeTemplateService: StoreTemplateService,
    private readonly createSizeService: CreateSizeService,
    private readonly createThemeService: CreateThemeService,
    private readonly createTweetHashService: CreateTweetHashService,
  ) {}

  public async handle(event: ReceivedTemplateParamsEvent): Promise<void> {
    const size = this.createSizeService.create(event.shape);
    const theme = this.createThemeService.create(event.theme);

    const template = Template.new({ shape: event.shape, size, theme });

    const tweet = {
      tweetId: event.tweet.id,
      tweetCreatedAt: event.tweet.createdAt,
    };

    const tweetHash = await this.createTweetHashService.create(
      tweet,
      DomainConfig.hash.algorithm,
      DomainConfig.hash.encondig,
    );

    await this.storeTemplateService.store(tweetHash, template);
  }
}
