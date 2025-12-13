import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCartQuery } from "@/services/queries/useCart";
import { useSelector } from "react-redux";
import type { RootState } from "@/features/store";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const { data: cartData } = useGetCartQuery();
  const totalQuantity = cartData?.data?.summary?.totalItems || 0;

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      {/* Mobile */}
      <div className=" flex h-15.75 md:h-19.75 items-center justify-between px-4 md:px-30">
        <Link to="/" className="flex items-center w-10 h-10">
          <img src="/icons/icon-logo.svg" alt="Logo" />
        </Link>

        {user ? (
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

            <p>{user?.name}</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant={"secondary"}
              onClick={() => navigate("/auth?tab=login")}
            >
              Sign In
            </Button>
            <Button
              variant={"default"}
              onClick={() => navigate("/auth?tab=register")}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>

      {/* <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span>Foody</span>
        </Link>

        {user ? (
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
        ) : (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        )}
      </div> */}
    </header>
  );
}
