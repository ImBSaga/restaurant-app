import { ShoppingCart, LogOut, User as UserIcon, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCartQuery } from "@/services/queries/useCart";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/features/store";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/auth-slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth?tab=login");
  };

  const { data: cartData } = useGetCartQuery();
  const totalQuantity = cartData?.data?.summary?.totalItems || 0;

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
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

            {/* Open Dropdown Menu when clicked */}
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center gap-2 md:gap-4 cursor-pointer">
                  <div className="hover:scale-110 transition-transform p-2">
                    <img
                      src="/images/image-avatar.jpg"
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>

                  <p className="text-lg font-semibold text-neutral-950">
                    {user?.name}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border-neutral-200 bg-white"
              >
                <div className="px-2 py-1.5 text-sm font-semibold border-b border-neutral-200 pb-3 mb-1">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-full">
                      <span className="text-sm text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-md font-semibold text-neutral-950">
                        {user?.name}
                      </p>
                    </div>
                  </div>
                </div>

                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile" className="flex items-center gap-3">
                    <UserIcon className="h-4 w-4 text-neutral-600" />
                    <span className="text-sm text-neutral-950">My Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/orders" className="flex items-center gap-3">
                    <FileText className="text-primary-100 h-4 w-4" />
                    <span className="text-sm text-primary-100 font-semibold">
                      My Orders
                    </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-muted" />

                <DropdownMenuItem
                  className="cursor-pointer flex items-center gap-3 focus:bg-red-50 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
    </header>
  );
}
