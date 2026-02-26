import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/api";
import { cn } from "@/lib/utils";

interface HenobelProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function HenobelProductCard({ product, onAddToCart }: HenobelProductCardProps) {
  return (
    <div className="group relative z-0 overflow-hidden rounded-2xl bg-surface-container-low shadow-md3-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md3-2">
      {!product.inStock && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
          Out of Stock
        </div>
      )}

      <div className="relative h-64 w-full overflow-hidden bg-surface-container-medium">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <span className="rounded-full bg-[#7ac803]/15 px-2 py-1 text-xs font-medium uppercase tracking-wider text-[#225609]">
            {product.category}
          </span>
          {typeof product.rating === "number" && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-onSurfaceVariant">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-[1.35] text-[#040c01]">{product.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-onSurfaceVariant">{product.description}</p>

        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#ffc600]/25 px-3 py-1 text-base font-bold text-[#040c01]">
            {"\u20A6"}{product.price.toLocaleString()}
          </span>
          <Button
            onClick={() => onAddToCart?.(product)}
            disabled={!product.inStock}
            className={cn(
              "px-4 py-2 text-sm",
              product.inStock
                ? "bg-[#225609] text-white shadow-md3-1 hover:bg-[#1a4207] hover:shadow-md3-2"
                : "cursor-not-allowed bg-surface-container-medium text-gray-500 hover:bg-surface-container-medium"
            )}
          >
            {product.inStock ? "Add to Cart" : "Unavailable"}
          </Button>
        </div>
      </div>
    </div>
  );
}
