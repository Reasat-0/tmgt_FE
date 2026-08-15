import type { ReactNode } from "react";
import { Button } from "../../../ui/button";
import type { TmgtButtonProps } from "./type";

export function TmgtButton({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}: TmgtButtonProps): ReactNode {
  return (
    <Button
      variant={variant}
      size={size}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
