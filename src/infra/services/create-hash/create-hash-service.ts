import { BinaryToTextEncoding, createHash } from "crypto";

import { CreateTweetHashService } from "@/domain/services/create-tweet-hash/create-tweet-hash-service";
import { CreateHashServiceDTO } from "@/domain/services/create-tweet-hash/create-tweet-hash-service-dto";

export class MemoryCreateHashService implements CreateTweetHashService {
  public async create(
    tweet: CreateHashServiceDTO,
    algorithm: string,
    encoding: BinaryToTextEncoding,
  ): Promise<string> {
    return createHash(algorithm).update(JSON.stringify(tweet)).digest(encoding);
  }
}
