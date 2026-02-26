import React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-full font-medium leading-[1.5] transition-all duration-200 ease-out active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#7ac803] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

    const variantClasses =
      variant === "outline"
        ? "border border-black/5 bg-surface-container-high text-onSurface shadow-md3-1 hover:shadow-md3-2"
        : variant === "ghost"
          ? "bg-transparent text-onSurface hover:bg-surface-container-medium"
          : "bg-surface-container-medium text-onSurface shadow-md3-1 hover:bg-surface-container-high hover:shadow-md3-2";

    const sizeClasses =
      size === "icon"
        ? "h-10 w-10 p-0"
        : size === "sm"
          ? "h-8 px-3 text-sm"
          : size === "lg"
            ? "h-11 px-6 text-base"
            : "h-10 px-4 py-2";

    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variantClasses, sizeClasses, className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
