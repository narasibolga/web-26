import { useRender } from "@base-ui/react/use-render";
import { cn } from "@/lib/utils";

export const Container = ({
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<"section">) =>
  useRender({
    defaultTagName: "div",
    render,
    props: {
      className: cn(
        "mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-20 md:px-8",
        className,
      ),
      children,
      ...props,
    },
  });
