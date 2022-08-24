import { ScreenshotParamsDTO } from "@/domain/dtos/screenshot-params-dto";

export interface GetScreenshotParamsService {
  get: (tweetId: string, processId: string) => Promise<ScreenshotParamsDTO>;
}
