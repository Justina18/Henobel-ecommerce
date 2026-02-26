import { Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { HenobelFooter } from "@/components/ui/henobel-footer";
import { HenobelHeader } from "@/components/ui/henobel-header";
import { HenobelProductCard } from "@/components/ui/henobel-product-card";
import { Input } from "@/components/ui/input";
import { fetchAgriProducts, type Product } from "@/lib/api";
import { Cart, subscribeToCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("fruits");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cartCount, setCartCount] = useState<number>(() => Cart.getTotalItems());
  const [notice, setNotice] = useState<string | null>(null);

  const categories = useMemo(() => ["fruits", "vegetables", "grains", "oil", "spices"], []);

  useEffect(() => subscribeToCart(() => setCartCount(Cart.getTotalItems())), []);

  useEffect(() => {
    const onGlobalSearch = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail ?? "";
      setSearchQuery(detail);
      setPage(1);
    };

    window.addEventListener("henobel:search", onGlobalSearch as EventListener);
    return () => window.removeEventListener("henobel:search", onGlobalSearch as EventListener);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAgriProducts({ category, query: searchQuery, page, pageSize: 12 });
        if (cancelled) return;
        setProducts(res.products);
        setTotalPages(Math.max(1, res.page_count));
      } catch (err) {
        console.error("Failed to load products:", err);
        if (!cancelled) {
          setProducts([]);
          setError("Unable to load products at the moment. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [category, searchQuery, page]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 1800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleAddToCart = (product: Product) => {
    Cart.addItem(product);
    setNotice(`${product.name} added to cart.`);
  };

  return (
    <div className="min-h-screen bg-surface-container-highest text-onSurface motion-safe:animate-page-enter">
      <HenobelHeader cartCount={cartCount} />

      <section className="bg-gradient-to-r from-[#225609]/10 via-[#7ac803]/10 to-[#ffc600]/12 px-4 py-16 text-[#040c01]">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Farm-Fresh Produce, Delivered</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-onSurfaceVariant">
            Ethically sourced from Nigerian smallholder farmers with transparent supply chains and sustainable handling.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {notice && (
          <div className="mb-5 rounded-2xl bg-[#f3fae8] px-4 py-3 text-sm text-[#225609] shadow-md3-1" role="status" aria-live="polite">
            {notice}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 shadow-md3-1" role="alert">
            {error}
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="pl-10"
              aria-label="Search products"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                className={cn("capitalize", category === cat ? "bg-[#225609] text-white shadow-md3-1 hover:bg-[#1a4207] hover:shadow-md3-2" : "border-[#225609]/20 bg-surface-container-high text-[#040c01] hover:bg-[#eef7e8]")}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#225609]" aria-hidden="true" />
            <span className="sr-only">Loading products</span>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl bg-surface-container-low py-14 text-center text-onSurfaceVariant shadow-md3-1">
            No products found for "{searchQuery || category}". Try another search term or category.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <HenobelProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                >
                  Previous
                </Button>
                <span className="px-3 py-2 text-sm text-[#040c01]">Page {page} of {totalPages}</span>
                <Button
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <HenobelFooter />
    </div>
  );
}

