import type { Product } from "@/lib/api";

export interface CartItem extends Omit<Product, "quantity"> {
  quantity: number;
}

const CART_KEY = "henobel_cart";
const CART_EVENT = "henobel:cart-updated";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function emitCartUpdate() {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(CART_EVENT));
}

export class Cart {
  static get(): CartItem[] {
    if (!isBrowser()) return [];

    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
      return Array.isArray(parsed)
        ? parsed.filter((item) => item && typeof item.id === "string" && typeof item.quantity === "number")
        : [];
    } catch {
      return [];
    }
  }

  static set(items: CartItem[]): void {
    if (!isBrowser()) return;

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      emitCartUpdate();
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }

  static addItem(product: Product): void {
    const items = this.get();
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
      this.set(
        items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      return;
    }

    this.set([...items, { ...product, quantity: product.quantity ?? 1 }]);
  }

  static updateQuantity(id: string, quantity: number): void {
    const next = Math.max(1, Math.floor(quantity));
    this.set(this.get().map((item) => (item.id === id ? { ...item, quantity: next } : item)));
  }

  static removeItem(id: string): void {
    this.set(this.get().filter((item) => item.id !== id));
  }

  static clear(): void {
    this.set([]);
  }

  static getTotalItems(): number {
    return this.get().reduce((sum, item) => sum + item.quantity, 0);
  }

  static getTotalPrice(): number {
    return this.get().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

export function subscribeToCart(callback: () => void) {
  if (!isBrowser()) return () => undefined;

  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(CART_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(CART_EVENT, handler);
  };
}
