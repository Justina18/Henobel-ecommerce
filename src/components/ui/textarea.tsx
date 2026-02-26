import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[96px] w-full rounded-2xl border border-black/5 bg-surface-container-low px-3 py-2 text-sm text-onSurface shadow-md3-1",
        "placeholder:text-onSurfaceVariant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ac803] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
