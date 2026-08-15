import type { ComponentProps, ReactNode } from "react";
import type { Button } from "../../../ui/button";

export interface TmgtButtonProps extends ComponentProps<typeof Button> {
  children?: ReactNode;
  className?: string;
}
