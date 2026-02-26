import { HenobelLogo } from "@/components/ui/henobel-logo";
import { AppLink } from "@/lib/router";

interface HenobelFooterProps {
  compact?: boolean;
}

export function HenobelFooter({ compact = false }: HenobelFooterProps) {
  if (compact) {
    return (
      <footer className="bg-surface-inverse-surface px-4 py-10 text-surface-inverse-on">
        <div className="mx-auto max-w-7xl text-center text-sm opacity-70">
          &copy; {new Date().getFullYear()} Henobel Agro Tech. All rights reserved.
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface-inverse-surface px-4 py-12 text-surface-inverse-on">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <HenobelLogo compact className="mb-4" />
            <div className="font-bold">Henobel Agro Tech</div>
            <p className="mt-2 text-sm leading-relaxed opacity-80">Your Partner in Sustainable Agriculture</p>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Shop</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><AppLink to="/products" className="hover:underline">Products</AppLink></li>
              <li><AppLink to="/cart" className="hover:underline">Cart</AppLink></li>
              <li><a href="#" className="hover:underline">Farmer Partners</a></li>
              <li><a href="#" className="hover:underline">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Company</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><AppLink to="/about" className="hover:underline">About</AppLink></li>
              <li><AppLink to="/contact" className="hover:underline">Contact</AppLink></li>
              <li><a href="#" className="hover:underline">Impact Reports</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Contact</h3>
            <address className="not-italic text-sm leading-relaxed opacity-80">
              Lagos, Nigeria<br />
              hello@henobel.com<br />
              +234 800 000 0000
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} Henobel Agro Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
