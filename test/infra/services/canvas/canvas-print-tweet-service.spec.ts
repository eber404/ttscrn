import * as fs from "fs/promises";

import { CanvasPrintTweetService } from "@/infra/services/canvas/print-tweet-service";

import { Tweet } from "@/domain/entities/tweet";
import { Templates } from "@/domain/enums/templates";

import { tweetPropsFactory } from "@test/mocks/tweet/tweet-props-mock";

describe(CanvasPrintTweetService.name, () => {
  it("should draw something", async () => {
    // given
    const service = new CanvasPrintTweetService();
    const tweetProps = tweetPropsFactory();
    const tweet = Tweet.new(tweetProps);
    const template = Templates.instagram_stories;

    // when
    await service.print(tweet, template);

    // then
    const file = await fs.readFile(__dirname + "/test.png");
    expect(file).toBeDefined();
  });
});
