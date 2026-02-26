import { Leaf, ShieldCheck, Sprout, Truck } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HenobelFooter } from "@/components/ui/henobel-footer";
import { HenobelHeader } from "@/components/ui/henobel-header";
import { HenobelProductCard } from "@/components/ui/henobel-product-card";
import { fetchAgriProducts, type Product } from "@/lib/api";
import { Cart, subscribeToCart } from "@/lib/cart";
import { AppLink, navigate } from "@/lib/router";

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(() => Cart.getTotalItems());

  useEffect(() => subscribeToCart(() => setCartCount(Cart.getTotalItems())), []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAgriProducts({ category: "fruits", pageSize: 8 });
        if (!cancelled) setFeatured(res.products.slice(0, 4));
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setFeatured([]);
          setError("We could not load featured products right now.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const addToCart = (product: Product) => {
    Cart.addItem(product);
  };

  return (
    <div className="min-h-screen bg-surface-container-highest text-onSurface motion-safe:animate-page-enter">
      <HenobelHeader cartCount={cartCount} />

      <section className="relative overflow-hidden bg-gradient-to-r from-[#225609]/10 via-[#7ac803]/12 to-[#ffc600]/14 px-4 py-20 text-[#040c01]">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-[#ffc600] blur-3xl" />
          <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-[#225609]/10 bg-surface-container-high px-4 py-1 text-sm font-medium text-[#225609] shadow-md3-1">
              Your Partner in Sustainable Agriculture
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Sustainable produce from trusted farms to your doorstep.
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-onSurfaceVariant">
              Henobel Agro Tech connects Nigerian smallholder farmers to modern markets with fair pricing, transparent sourcing, and climate-smart logistics.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#225609] text-white hover:bg-[#1a4207]" onClick={() => navigate("/products")}>
                Shop Products
              </Button>
              <Button variant="outline" className="bg-surface-container-high text-[#040c01] hover:bg-surface-container-medium" onClick={() => navigate("/about")}>
                Learn Our Story
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Sprout, title: "Regenerative Farming", text: "Soil-first practices and farmer training across communities." },
              { icon: Truck, title: "Efficient Delivery", text: "Cold-chain routing that reduces spoilage and delays." },
              { icon: ShieldCheck, title: "Traceable Supply", text: "Clear sourcing signals from farm clusters to retail." },
              { icon: Leaf, title: "Sustainability Impact", text: "Lower waste and more resilient harvest cycles." },
            ].map((item) => (
              <Card key={item.title} className="p-4 text-[#040c01] shadow-md3-1 bg-surface-container-highest/90">
                <item.icon className="mb-3 h-6 w-6 text-[#ffc600]" />
                <h2 className="mb-2 font-semibold">{item.title}</h2>
                <p className="text-sm leading-relaxed text-onSurfaceVariant">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-sm text-gray-600">Live catalog powered by Open Food Facts with NG agricultural filtering and mock fallback.</p>
          </div>
          <AppLink to="/products" className="text-sm font-semibold text-[#225609] hover:underline">
            View full catalog
          </AppLink>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[26rem] animate-pulse rounded-2xl bg-surface-container-medium shadow-md3-1" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <HenobelProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#f7fbf2] px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Card className="p-7">
            <h2 className="mb-3 text-2xl font-bold">Why buyers choose Henobel</h2>
            <p className="mb-6 text-gray-700">
              We prioritize quality, traceability, and farmer prosperity. Every order supports a more resilient agricultural ecosystem.
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#7ac803]" /> Transparent sourcing and category-based curation</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#7ac803]" /> Reliable order tracking and responsive support</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#7ac803]" /> Sustainable agriculture partnerships with measurable impact</li>
            </ul>
          </Card>
          <Card className="p-7 bg-surface-container-high">
            <div className="mb-3 inline-flex rounded-full bg-[#ffc600]/25 px-3 py-1 text-xs font-semibold text-[#040c01]">Henobel Promise</div>
            <h2 className="mb-3 text-2xl font-bold">Fresh, fair, and farm-connected.</h2>
            <p className="mb-6 leading-relaxed text-onSurfaceVariant">
              Browse products, build your cart, and send us sourcing or partnership enquiries from a single client-side storefront.
            </p>
            <Button className="bg-[#225609] text-white shadow-md3-1 hover:bg-[#1a4207] hover:shadow-md3-2" onClick={() => navigate("/contact")}>
              Contact Our Team
            </Button>
          </Card>
        </div>
      </section>

      <HenobelFooter />
    </div>
  );
}

