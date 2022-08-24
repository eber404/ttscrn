import { Size } from "@/domain/entities/size";
import { Theme } from "@/domain/entities/theme";

export interface TemplateProps {
  size: Size;
  theme: Theme;
}

export class Template {
  private constructor(
    public readonly size: Size,
    public readonly theme: Theme,
  ) {}

  public static new({ size, theme }: TemplateProps): Template {
    return new Template(size, theme);
  }
}
