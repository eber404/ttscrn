import { ThemeName, Theme } from "@/domain/entities/theme";

export interface CreateThemeService {
  create: (theme: ThemeName) => Promise<Theme>;
}
