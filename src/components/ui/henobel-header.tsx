import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { HenobelLogo } from "@/components/ui/henobel-logo";
import { AppLink, navigate, usePathname, type AppPath } from "@/lib/router";
import { cn } from "@/lib/utils";

interface HenobelHeaderProps {
  cartCount?: number;
}

const navItems: Array<{ label: string; to: AppPath }> = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function HenobelHeader({ cartCount = 0 }: HenobelHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeLabel = useMemo(() => navItems.find((item) => item.to === pathname)?.label, [pathname]);

  const submitSearch = () => {
    navigate("/products");
    window.dispatchEvent(new CustomEvent("henobel:search", { detail: searchQuery.trim() }));
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-surface-container-highest/95 shadow-md3-1 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <AppLink to="/" className="min-w-0">
            <HenobelLogo />
          </AppLink>

          <nav className="hidden items-center space-x-2 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = pathname === item.to;
              return (
                <AppLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium leading-[1.5] transition-all duration-200",
                    active
                      ? "bg-[#eef7e8] text-[#225609] shadow-md3-1"
                      : "text-[#040c01] hover:bg-surface-container-medium hover:text-[#225609]"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </AppLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#040c01] hover:bg-surface-container-medium hover:text-[#225609] md:hidden"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#040c01] hover:bg-[#eef7e8] hover:text-[#225609]"
              aria-label={`Open cart (${cartCount} item${cartCount === 1 ? "" : "s"})`}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#ffc600] px-1 text-[10px] font-bold text-[#040c01]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Button>

            <button
              type="button"
              className="rounded-full p-2 text-[#040c01] transition-all duration-200 hover:bg-surface-container-medium hover:text-[#225609] md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="border-t border-gray-200/70 py-3 md:hidden">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitSearch();
                  }}
                  placeholder="Search products..."
                  className="w-full rounded-full bg-surface-container-low py-2 pl-10 pr-3 text-[#040c01] shadow-md3-1 outline-none ring-0 focus:ring-2 focus:ring-[#7ac803]"
                />
              </div>
              <Button className="bg-[#225609] text-white shadow-md3-1 hover:bg-[#1a4207] hover:shadow-md3-2" onClick={submitSearch}>
                Go
              </Button>
            </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="border-t border-gray-200/70 py-4 md:hidden">
            <div className="mb-3 px-1 text-xs font-medium uppercase tracking-wide text-gray-500">
              {activeLabel ? `Current: ${activeLabel}` : "Menu"}
            </div>
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const active = pathname === item.to;
                return (
                  <AppLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-2 font-medium transition-all duration-200",
                      active
                        ? "bg-[#eef7e8] text-[#225609] shadow-md3-1"
                        : "text-[#040c01] hover:bg-surface-container-medium hover:text-[#225609]"
                    )}
                  >
                    {item.label}
                  </AppLink>
                );
              })}
              <AppLink
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-2 font-medium text-[#040c01] transition-all duration-200 hover:bg-surface-container-medium hover:text-[#225609]"
              >
                Cart ({cartCount})
              </AppLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
