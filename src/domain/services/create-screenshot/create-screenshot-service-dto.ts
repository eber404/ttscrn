export interface CreateScreenshotDTO {
  tweet: {
    text: string;
    createdAt: string;
    name: string;
    user: string;
    avatar: string;
  };
  template: {
    width: number;
    height: number;
    unit: string;
  };
}
