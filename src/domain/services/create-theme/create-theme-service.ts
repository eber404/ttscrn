import { ThemeType, Theme } from "@/domain/entities/theme";

export interface CreateThemeService {
  create: (theme: ThemeType) => Theme;
}
