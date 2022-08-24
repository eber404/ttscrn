import { ThemeDTO } from "@/presentation/dtos/theme-dto";
import { TweetDTO } from "@/presentation/dtos/tweet-dto";

export const htmlTemplateFactory = (
  tweet: TweetDTO,
  theme: ThemeDTO,
): string => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Document</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
      rel="stylesheet"
    />

    <style>
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: ${theme.html.fontSize};
      }

      html,
      body {
        height: 100%;
      }

      body {
        background-color: #000000;
        font-family: "Roboto", sans-serif;
        padding: 35px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .container {
        display: flex;
        flex-direction: column;
      }

      .user-box {
        display: flex;
      }

      .avatar {
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        overflow: hidden;
      }

      .avatar > img {
        width: 101%;
        height: 101%;
      }

      .user-info-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 12px;
      }

      .user-info-name {
        font-size: 0.938rem;
        font-weight: 500;
        color: ${theme.colors.text};
      }

      .user-info-username {
        font-size: 0.938rem;
        color: ${theme.colors.details};
      }

      .tweet-box {
        display: flex;
        padding: 20px 0;
      }

      .tweet-text {
        font-size: 1.438rem;
        color: ${theme.colors.text};
      }

      .tweet-footer {
        display: flex;
      }

      .tweet-date {
        font-size: 0.938rem;
        font-weight: 400;
        color: ${theme.colors.details};
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="user-box">
        <div class="avatar">
          <img src="${tweet.avatar}" />
        </div>
        <div class="user-info-box">
          <p class="user-info-name">${tweet.name}</p>
          <p class="user-info-username">@${tweet.user}</p>
        </div>
      </div>

      <div class="tweet-box">
        <p class="tweet-text">
          ${tweet.text}
        </p>
      </div>

      <div class="tweet-footer">
        <p class="tweet-date">${tweet.createdAt.toString()} · Twitter for iPhone</p>
      </div>
    </div>
  </body>
</html>
`;
