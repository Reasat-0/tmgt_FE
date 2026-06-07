import { ChangeEvent, ReactNode } from "react";

export interface InputFieldProps {
  id?: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  icon?: ReactNode;
  /** If provided, renders the eye toggle */
  showPassword?: boolean;
  onToggle?: () => void;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
  /** Slot rendered below the input (e.g. strength bar) */
  hint?: ReactNode;
  classNames?: string;
}
