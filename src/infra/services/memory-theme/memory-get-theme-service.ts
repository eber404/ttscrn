import { ThemeType, Theme } from "@/domain/entities/theme";
import { CreateThemeService } from "@/domain/services/create-theme/create-theme-service";

export class MemoryCreateThemeService implements CreateThemeService {
  public create(theme: ThemeType): Theme {
    const dark = {
      colors: {
        background: "#000000",
        text: "#e7e9ea",
        details: "#71767a",
      },
    };

    const light = {
      colors: {
        background: "#ffffff",
        text: "#0f1419",
        details: "#536471",
      },
    };

    if (theme === "dark") return Theme.new(dark);

    return Theme.new(light);
  }
}
