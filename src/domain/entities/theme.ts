import { z, ZodString } from "zod";

import { DomainError } from "@/domain/errors/domain-error";
import { DomainValidation } from "@/domain/validations/domain-validation";

export type ThemeName = "dark" | "light";

const HEXADECIMAL_RULE = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const zHex = (): ZodString => z.string().regex(HEXADECIMAL_RULE);

const ThemeSchema = z.object({
  colors: z.object({
    background: zHex(),
    text: zHex(),
    details: zHex(),
  }),
});

type ThemeProps = z.infer<typeof ThemeSchema>;

interface Colors {
  background: string;
  text: string;
  details: string;
}

interface Fonts {
  fontSize: string;
}

export class Theme extends DomainValidation {
  private constructor(
    public readonly colors: Colors,
    public readonly fonts: Fonts,
  ) {
    super();

    this.fonts = {
      fontSize: "16px",
    };
  }

  public static new(props: ThemeProps): Theme {
    const validation = this.validate<Theme>(ThemeSchema, props);

    if (validation.isErr()) {
      throw new DomainError({
        name: "Invalid props for entity",
        message: validation.unwrapErr(),
        stack: Theme.name,
      });
    }

    const result = validation.unwrap();

    return new Theme(result.colors, result.fonts);
  }
}
