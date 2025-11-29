import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCartQuery } from "@/services/queries/useCart";

export function Header() {
  const { data: cartData } = useGetCartQuery();
  const totalQuantity = cartData?.data?.summary?.totalItems || 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span>Foody</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative hover:scale-110 transition-transform p-2"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalQuantity > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center text-xs font-bold animate-in zoom-in">
                {totalQuantity}
              </div>
            )}
          </Link>

          <Link
            to="/profile"
            className="hover:scale-110 transition-transform p-2"
          >
            <img
              src="/images/image-avatar.jpg"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
