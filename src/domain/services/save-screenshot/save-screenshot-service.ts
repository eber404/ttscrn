import { Screenshot } from "@/domain/aggregates/screenshot";

export interface SaveScreenshotService {
  save: (screenshotHash: string, screenshot: Screenshot) => Promise<void>;
}
