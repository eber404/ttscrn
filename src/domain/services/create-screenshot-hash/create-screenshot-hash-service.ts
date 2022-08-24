import { SizeProps } from "@/domain/entities/size";

interface Props {
  tweetId: string;
  size: SizeProps;
}

export interface CreateScreenshotHashService {
  create: (screenshot: Props) => Promise<void>;
}
