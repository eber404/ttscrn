import { PrintTweetService } from "@/domain/services/print-tweet/print-tweet-service";

export class PrintTweetServiceDouble implements PrintTweetService {
  public async print(): Promise<void> {
    return;
  }
}
