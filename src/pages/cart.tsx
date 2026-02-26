import { CreditCard, Minus, Plus, Shield, Trash2, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HenobelFooter } from "@/components/ui/henobel-footer";
import { HenobelHeader } from "@/components/ui/henobel-header";
import { Cart, subscribeToCart, type CartItem } from "@/lib/cart";
import { navigate } from "@/lib/router";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  const refresh = () => {
    setItems(Cart.get());
  };

  useEffect(() => {
    refresh();
    return subscribeToCart(refresh);
  }, []);

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const shipping = subtotal === 0 || subtotal >= 10000 ? 0 : 500;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    Cart.updateQuantity(id, quantity);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface-container-highest text-onSurface motion-safe:animate-page-enter">
        <HenobelHeader cartCount={0} />
        <main className="mx-auto max-w-4xl px-4 py-20 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-container-medium shadow-md3-1">
            <Truck className="h-10 w-10 text-gray-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Your cart is empty</h1>
          <p className="mb-6 text-gray-600">Looks like you have not added any products yet.</p>
          <Button className="bg-[#225609] text-white shadow-md3-1 hover:bg-[#1a4207] hover:shadow-md3-2" onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </main>
        <HenobelFooter compact />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-highest text-onSurface motion-safe:animate-page-enter">
      <HenobelHeader cartCount={cartCount} />

      <section className="bg-gradient-to-r from-[#225609]/10 via-[#7ac803]/10 to-[#ffc600]/12 px-4 py-14 text-[#040c01]">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">Your Cart</h1>
          <p className="text-lg leading-relaxed text-onSurfaceVariant">Review quantities, shipping, and order totals before checkout.</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-4" aria-label="Cart items">
            {items.map((item) => (
              <Card key={item.id} className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-container-medium shadow-md3-1">
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="mb-1 line-clamp-2 font-bold">{item.name}</h2>
                    <p className="mb-2 text-sm text-gray-600">{item.category}</p>
                    <p className="mb-4 text-sm font-semibold text-[#225609]">{"\u20A6"}{item.price.toLocaleString()} each</p>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="inline-flex min-w-[2.5rem] justify-center rounded-full bg-surface-container-medium px-3 py-1 text-sm font-medium shadow-md3-1">
                        {item.quantity}
                      </span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity of ${item.name}`}>
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => Cart.removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </section>

          <aside className="space-y-5" aria-label="Order summary">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
                  <span>{"\u20A6"}{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between border-t pt-3 text-base font-bold">
                  <span>Total</span>
                  <span className="text-[#225609]">{"\u20A6"}{total.toLocaleString()}</span>
                </div>
              </div>

              <Button className="mt-6 w-full bg-[#225609] text-white shadow-md3-1 hover:bg-[#1a4207] hover:shadow-md3-2">
                <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="mt-3 w-full border-[#225609] text-[#225609] hover:bg-[#f0f7f0]"
                onClick={() => Cart.clear()}
              >
                Clear Cart
              </Button>
            </Card>

            <div className="grid grid-cols-3 gap-3">
              <Card className="p-3 text-center">
                <Truck className="mx-auto mb-2 h-5 w-5 text-[#225609]" />
                <p className="text-xs font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">over ₦10k</p>
              </Card>
              <Card className="p-3 text-center">
                <Shield className="mx-auto mb-2 h-5 w-5 text-[#225609]" />
                <p className="text-xs font-medium">Secure</p>
                <p className="text-xs text-gray-500">Checkout</p>
              </Card>
              <Card className="p-3 text-center">
                <CreditCard className="mx-auto mb-2 h-5 w-5 text-[#225609]" />
                <p className="text-xs font-medium">Flexible Pay</p>
                <p className="text-xs text-gray-500">Flutterwave</p>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <HenobelFooter />
    </div>
  );
}

