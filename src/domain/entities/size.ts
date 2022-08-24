export type Unit = "px";

export interface SizeProps {
  width: number;
  height: number;
  unit: Unit;
}

export class Size {
  private constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly unit: Unit,
  ) {}

  public static new(props: SizeProps): Size {
    return new Size(props.width, props.height, props.unit);
  }
}
