import { Screenshot } from "@/domain/aggregates/screenshot";
import { Size } from "@/domain/entities/size";
import { ThemeName } from "@/domain/entities/theme";

export interface GetScreenshotService {
  get: (tweetId: string, size: Size, theme: ThemeName) => Promise<Screenshot>;
}
