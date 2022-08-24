import { Size } from "@/domain/entities/size";
import { ThemeName } from "@/domain/entities/theme";

export interface ScreenshotParamsDTO {
  tweetId: string;
  size: Size;
  theme: ThemeName;
  email: string;
}
