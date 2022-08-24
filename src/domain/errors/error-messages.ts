export const errorMessage = {
  // Url
  invalid_url: (props?: string): string =>
    `Inform a valid url ${props ?? ""}`.trim(),
  invalid_tweet_url: (url?: string): string =>
    `invalid tweet url (${url}) Tweet url should be from twitter.com`,

  // Author
  invalid_author_name_length: (name?: string): string =>
    `invalid name (${name}) Name length should have between 4 and 50 characters`,
  invalid_author_user_length: (user?: string): string =>
    `invalid author (${user}) User length should have between 4 and 50 characters`,
  invalid_author_user_characters: (user?: string): string =>
    `invalid user (${user}) Use only letters, numbers and underscore for username`,
  author_entity_exception: "Invalid props for Author entity",

  // Tweet
  invalid_tweet_text: (text?: string): string =>
    `invalid tweet text (${text}) Tweet text max length should be 280 characters`,
  tweet_entity_exception: "Invalid props for Tweet entity",

  // Size value-object
  size_width_is_NaN: (width?: number): string =>
    `invalid width (${width}) Size width must be number`,
  size_width_is_negative: (width?: number): string =>
    `invalid width (${width}) Size width must be positive`,
  size_height_is_NaN: (height?: number): string =>
    `invalid height (${height}) Size height must be number`,
  size_height_is_negative: (height?: number): string =>
    `invalid height (${height}) Size height must be positive`,

  // SafeDate
  invalid_date_format: (date?: string): string =>
    `invalid date (${date}) Inform a valid date`,

  // Screenshot
  invalid_screenshot_props: "Invalid aggregate screenshot",
};
