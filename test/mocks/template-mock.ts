import { Template } from "@/domain/entities/template";

export function templateFactory(props?: Partial<Template>): Template {
  return Template.new({
    theme: "dark",
    shape: "pinterest_post",
    size: {
      width: 1080,
      height: 1920,
      unit: "px",
    },
    ...props,
  });
}
