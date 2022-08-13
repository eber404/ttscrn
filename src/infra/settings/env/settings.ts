import { Env } from "@/infra/settings/env/environment-variable";
import { loadSystemSettings } from "@/infra/settings/env/load-system-settings";

const variables = loadSystemSettings();

class Settings {
  private static _instance: Settings;

  public readonly twitter = new TwitterSettings();
  public readonly app = new AppSettings();

  public static get instance(): Settings {
    if (!this._instance) {
      this._instance = new Settings();
    }

    return this._instance;
  }
}

class TwitterSettings {
  public readonly [Env.TWITTER_API_KEY] = variables[Env.TWITTER_API_KEY];
  public readonly [Env.TWITTER_API_SECRET] = variables[Env.TWITTER_API_SECRET];
  public readonly [Env.TWITTER_BEARER_TOKEN] =
    variables[Env.TWITTER_BEARER_TOKEN];
}

class AppSettings {
  public readonly [Env.PORT] = variables[Env.PORT];
}

export const settings = Object.freeze(Settings.instance);
