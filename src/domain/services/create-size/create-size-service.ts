import { Shape } from "@/domain/enums/shape";
import { Size, SizeProps } from "@/domain/value-objects/size";

export interface CreateSizeService {
  create: (shape: Shape, size?: SizeProps) => Size;
}
