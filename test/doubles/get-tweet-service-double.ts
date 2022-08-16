import { GetTweetService } from "@/domain/services/get-tweet/get-tweet-service";
import { GetTweetServiceDTO } from "@/domain/services/get-tweet/get-tweet-service-dto";

export class GetTweetServiceDouble implements GetTweetService {
  public async get(): Promise<GetTweetServiceDTO> {
    return;
  }
}
