import { Shape } from "@/domain/enums/shape";
import { DomainException } from "@/domain/errors/exceptions/domain-exception";
import { Size, SizeProps } from "@/domain/value-objects/size";

export interface TemplateProps {
  shape: Shape;
  size: SizeProps;
}

export class Template {
  private constructor(
    public readonly shape: Shape,
    public readonly size: Size,
  ) {}

  public static new(props: TemplateProps): Template {
    const size = Size.new({
      width: props.size.width,
      height: props.size.height,
      unit: props.size.unit,
    });

    if (size.isErr()) {
      throw new DomainException({
        name: "Invalid props for Template entity.",
        message: size.unwrapErr(),
        stack: Template.name,
      });
    }

    return new Template(props.shape, size.unwrap());
  }
}
