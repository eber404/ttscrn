export const errorMessage = {
  // Url
  invalid_url: (props?: string): string =>
    `Inform a valid url ${props ?? ""}`.trim(),
  invalid_tweet_url: `Tweet url should be from twitter.com`,

  // Author
  invalid_author_name_length:
    "Name length should have between 4 and 50 characters",
  invalid_author_user_length:
    "User length should have between 4 and 50 characters",
  invalid_author_user_characters:
    "Use only letters, numbers and underscore for username",

  // Tweet
  invalid_tweet_text: "Tweet lentgh should have between 1 and 280 characters",
};
