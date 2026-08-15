import { Eye, EyeOff } from "lucide-react";
import { ReactNode } from "react";
import { Input } from "../../../ui/input";
import { InputFieldProps } from "./type";
import { Field, FieldError, FieldLabel } from "../../../ui/field";

/** Reusable labelled input with icon + optional eye toggle */
export function TmgtInput({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  showPassword,
  onToggle,
  value,
  onChange,
  autoComplete,
  required,
  hint,
  error,
}: InputFieldProps): ReactNode {
  const isPassword = onToggle !== undefined;
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex">
      <Field className="flex flex-col gap-1">
        {label && (
          <FieldLabel
            htmlFor={id}
            className="text-[13px] font-semibold text-textPrimary"
          >
            {label}
          </FieldLabel>
        )}

        <div className="relative">
          {/* Leading icon */}
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textDisabled pointer-events-none">
            {icon}
          </span>

          <Input
            id={id}
            type={resolvedType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
            required={required}
            className="
                    border border-borderDefault 
                    rounded-lg 
                    w-full ps-11 pe-12 py-3.5
                    text-[15px] text-textPrimary
                    placeholder:text-textDisabled
                    focus:outline-none focus:ring-[3px] 
                    focus:ring-surfaceBrandSubtle focus:border-borderBrand
                    transition-all
                    "
          />

          {/* Eye toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={onToggle}
              aria-label={
                showPassword ? "Hide password" : "showPassword password"
              }
              className="
              absolute right-3.5 top-1/2 -translate-y-1/2
              text-textDisabled hover:text-textTertiary
              transition-colors
            "
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          )}
        </div>
        {error && (
          <FieldError className="text-red-500 text-sm">{error}</FieldError>
        )}
      </Field>

      {hint}
    </div>
  );
}
