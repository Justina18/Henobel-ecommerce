import { useEffect, useState } from "react";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

export type AppPath = "/" | "/products" | "/about" | "/contact" | "/cart";

const VALID_PATHS: AppPath[] = ["/", "/products", "/about", "/contact", "/cart"];
const VALID_SET = new Set<string>(VALID_PATHS);

export function normalizePath(pathname: string): AppPath {
  const normalized = pathname === "" ? "/" : pathname.replace(/\/+$/, "") || "/";
  return (VALID_SET.has(normalized) ? normalized : "/") as AppPath;
}

export function getCurrentPath(): AppPath {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname);
}

export function navigate(to: AppPath, options?: { replace?: boolean }) {
  if (typeof window === "undefined") return;
  const path = normalizePath(to);
  const method = options?.replace ? "replaceState" : "pushState";
  window.history[method](null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function usePathname(): AppPath {
  const [pathname, setPathname] = useState<AppPath>(getCurrentPath());

  useEffect(() => {
    const onChange = () => setPathname(getCurrentPath());
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  return pathname;
}

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: AppPath;
  replace?: boolean;
}

export function AppLink({ to, replace, onClick, target, ...props }: AppLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (target && target !== "_self") return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;

    event.preventDefault();
    navigate(to, { replace });
  };

  return <a href={to} target={target} onClick={handleClick} {...props} />;
}
