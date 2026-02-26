export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating?: number;
  imageUrl: string;
  inStock: boolean;
  quantity?: number;
}

export interface ProductResponse {
  count: number;
  page: number;
  page_count: number;
  products: Product[];
}

interface OpenFoodFactsProduct {
  code?: string;
  product_name?: string;
  categories?: string;
  image_url?: string;
  generic_name?: string;
}

interface OpenFoodFactsSearchResponse {
  count?: number;
  products?: OpenFoodFactsProduct[];
}

const BASE_URL = "https://world.openfoodfacts.org/api/v2/product/search";

function computeBasePrice(categories?: string) {
  const lower = (categories || "").toLowerCase();
  if (lower.includes("vegetables")) return 300;
  if (lower.includes("grains")) return 800;
  if (lower.includes("oil")) return 1200;
  if (lower.includes("spices")) return 600;
  return 500;
}

function toProduct(p: OpenFoodFactsProduct): Product {
  const basePrice = computeBasePrice(p.categories);

  return {
    id: p.code || crypto.randomUUID(),
    name: p.product_name || p.generic_name || "Unnamed Product",
    description: p.generic_name || p.product_name || "Sustainably sourced agricultural produce",
    price: Math.round(basePrice * (0.8 + Math.random() * 0.4)),
    category: p.categories?.split(",").shift()?.trim() || "Other",
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    imageUrl: p.image_url || `https://picsum.photos/400/400?random=${p.code || Math.random()}`,
    inStock: Math.random() > 0.1,
    quantity: 1,
  };
}

function getMockProducts(): Product[] {
  const names = [
    "Organic Cassava Flour",
    "Fresh Plantain Bunch",
    "Local Rice (5kg)",
    "Palm Oil (1L)",
    "Groundnut Oil (500ml)",
    "Dried Beans (2kg)",
    "Tomato Paste (70g)",
    "Ginger Root (500g)",
    "Onion Bulbs (1kg)",
    "Pepper (Mixed)",
    "Soybean Meal",
    "Maize Grain",
  ];
  const categories = ["fruits", "vegetables", "grains", "oil", "spices"];

  return Array.from({ length: 36 }, (_, i) => {
    const category = categories[i % categories.length];
    const basePrice = computeBasePrice(category);
    return {
      id: `mock-${i + 1}`,
      name: `${names[i % names.length]}${i >= names.length ? ` Batch ${Math.floor(i / names.length) + 1}` : ""}`,
      description: "Sustainably sourced, smallholder farmer certified",
      price: Math.round(basePrice * (0.8 + Math.random() * 0.4)),
      category,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      imageUrl: `https://picsum.photos/seed/henobel-${i}/400/400`,
      inStock: Math.random() > 0.1,
      quantity: 1,
    };
  });
}

function filterAndPaginate(products: Product[], params: Required<FetchParams>): ProductResponse {
  const category = params.category.toLowerCase();
  const query = params.query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const categoryMatch = !category || product.category.toLowerCase().includes(category);
    const queryMatch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });

  const count = filtered.length;
  const page_count = Math.max(1, Math.ceil(count / params.pageSize));
  const safePage = Math.min(Math.max(1, params.page), page_count);
  const start = (safePage - 1) * params.pageSize;

  return {
    count,
    page: safePage,
    page_count,
    products: filtered.slice(start, start + params.pageSize),
  };
}

export interface FetchParams {
  category?: string;
  query?: string;
  page?: number;
  pageSize?: number;
}

export const fetchAgriProducts = async (params: FetchParams = {}): Promise<ProductResponse> => {
  const normalized: Required<FetchParams> = {
    category: params.category ?? "fruits",
    query: params.query ?? "",
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 12,
  };

  try {
    const url = new URL(BASE_URL);
    url.searchParams.set("json", "1");
    url.searchParams.set("page", String(normalized.page));
    url.searchParams.set("page_size", String(normalized.pageSize));
    url.searchParams.set("country", "ng");
    url.searchParams.set("sort_by", "popularity");
    if (normalized.category) url.searchParams.set("category", normalized.category);
    if (normalized.query) url.searchParams.set("q", normalized.query);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = (await res.json()) as OpenFoodFactsSearchResponse;
    const mapped = (Array.isArray(data.products) ? data.products : []).map(toProduct);

    const count = typeof data.count === "number" ? data.count : mapped.length;
    return {
      count,
      page: normalized.page,
      page_count: Math.max(1, Math.ceil(count / normalized.pageSize)),
      products: mapped,
    };
  } catch (error) {
    console.warn("API failed, using mock data:", error);
    return filterAndPaginate(getMockProducts(), normalized);
  }
};
