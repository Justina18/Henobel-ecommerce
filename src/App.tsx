import AboutPage from "@/pages/about";
import CartPage from "@/pages/cart";
import ContactPage from "@/pages/contact";
import HomePage from "@/pages/home";
import ProductsPage from "@/pages/products";
import { usePathname } from "@/lib/router";

function App() {
  const pathname = usePathname();

  switch (pathname) {
    case "/products":
      return <ProductsPage />;
    case "/about":
      return <AboutPage />;
    case "/contact":
      return <ContactPage />;
    case "/cart":
      return <CartPage />;
    case "/":
    default:
      return <HomePage />;
  }
}

export default App;
