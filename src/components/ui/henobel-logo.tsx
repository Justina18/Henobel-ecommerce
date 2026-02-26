import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

interface HenobelLogoProps {
  compact?: boolean;
  className?: string;
}

export function HenobelLogo({ compact = false, className }: HenobelLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-container-high shadow-md3-1">
        <span className="text-base font-extrabold leading-none text-[#040c01]">H</span>
        <Leaf className="absolute -right-1 top-0 h-4 w-4 text-[#7ac803]" strokeWidth={2} aria-hidden="true" />
      </div>
      {!compact && (
        <div>
          <div className="text-base font-bold leading-[1.25] text-[#040c01] sm:text-xl">Henobel Agro Tech</div>
          <div className="hidden text-xs font-medium leading-[1.4] text-[#225609] sm:block">
            Your Partner in Sustainable Agriculture
          </div>
        </div>
      )}
    </div>
  );
}
