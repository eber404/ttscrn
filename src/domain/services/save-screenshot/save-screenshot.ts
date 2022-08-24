import { Screenshot } from "@/domain/aggregates/screenshot";

export interface SaveScreenshotService {
  save: (screenshot: Screenshot) => Promise<void>;
}
