import { Template } from "@/domain/aggregates/template";
import { Shape } from "@/domain/enums/shape";
import { InfraException } from "@/domain/errors/infra-error";
import { GetSizeService } from "@/domain/services/get-size/get-size-service";
import { Size, SizeProps, Unit } from "@/domain/value-objects/size";

export class MemoryGetSizeService implements GetSizeService {
  private readonly DEFAULT_SIZE_UNIT: Unit = "px";

  public get(shape: Shape, sizeProps: SizeProps): Size {
    const hasSizeprops = Object.values(sizeProps).length > 0;

    if (shape === "custom_size" && hasSizeprops) {
      const size = Size.new(sizeProps);

      if (size.isErr()) {
        throw new InfraException({
          name: "Invalid Size entity on service",
          message: size.unwrapErr(),
          stack: MemoryGetSizeService.name,
        });
      }

      return size.unwrap();
    }

    return this.getSizeByTemplate(shape);
  }

  private getSizeByTemplate(shape: Shape): Size {
    const availableSizes = {
      instagram_stories: Template.new({
        shape: "instagram_stories",
        size: {
          width: 1080,
          height: 1920,
          unit: this.DEFAULT_SIZE_UNIT,
        },
      }),
      instagram_timeline: Template.new({
        shape: "instagram_timeline",
        size: {
          width: 1080,
          height: 1350,
          unit: this.DEFAULT_SIZE_UNIT,
        },
      }),
      twitter_timeline: Template.new({
        shape: "twitter_timeline",
        size: {
          width: 1200,
          height: 675,
          unit: this.DEFAULT_SIZE_UNIT,
        },
      }),
      pinterest_post: Template.new({
        shape: "pinterest_post",
        size: {
          width: 800,
          height: 1200,
          unit: this.DEFAULT_SIZE_UNIT,
        },
      }),
      linkedin_post: Template.new({
        shape: "linkedin_post",
        size: {
          width: 1200,
          height: 628,
          unit: this.DEFAULT_SIZE_UNIT,
        },
      }),
      whatsapp_story: Template.new({
        shape: "whatsapp_story",
        size: {
          width: 750,
          height: 1334,
          unit: this.DEFAULT_SIZE_UNIT,
        },
      }),
      whatsapp_post: Template.new({
        shape: "whatsapp_post",
        size: {
          width: 800,
          height: 800,
          unit: this.DEFAULT_SIZE_UNIT,
        },
      }),
    };

    return availableSizes[shape];
  }
}

/* instagram_timeline = 1080 x 1350
instagram_stories = 1080 x 1920
twitter_timeline = 1200 x 675
pinterest_post = 800 x 1200
linkedin_post = 1200 x 628
whatsapp_story = 750 x 1334
whatsapp_post = 800 x 800
custom_size */
