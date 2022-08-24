import { SizeProps } from "@/domain/entities/size";

export interface GetScreenshotUseCaseInput {
  tweetId: string;
  size: SizeProps;
  email: string;
  theme: "dark" | "light";
}
