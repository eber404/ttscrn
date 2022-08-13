export interface ValidateTweetService {
  validate(tweetUrl: string): Promise<boolean>;
}
