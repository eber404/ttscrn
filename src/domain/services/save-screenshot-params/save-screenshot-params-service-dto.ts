import { SizeProps } from "@/domain/entities/size";
import { ThemeName } from "@/domain/entities/theme";

export interface SaveScreenshotParamsServiceDTO {
  tweetId: string;
  size: SizeProps;
  theme: ThemeName;
  email: string;
  processedAt: Date;
}
