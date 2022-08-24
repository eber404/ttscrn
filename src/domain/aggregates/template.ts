import { Theme } from "@/domain/entities/theme";
import { Shape } from "@/domain/enums/shape";
import { Size } from "@/domain/value-objects/size";

export interface TemplateProps {
  shape: Shape;
  size: Size;
  theme: Theme;
}

export class Template {
  private constructor(
    public readonly shape: Shape,
    public readonly size: Size,
    public readonly theme: Theme,
  ) {}

  public static new({ shape, size, theme }: TemplateProps): Template {
    return new Template(shape, size, theme);
  }
}
