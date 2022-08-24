import { BinaryToTextEncoding } from "crypto";

import { CreateHashServiceDTO } from "@/domain/services/create-tweet-hash/create-tweet-hash-service-dto";

export interface CreateTweetHashService {
  create: (
    tweet: CreateHashServiceDTO,
    algorithm: string,
    encoding: BinaryToTextEncoding,
  ) => Promise<string>;
}
