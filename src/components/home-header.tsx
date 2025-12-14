import {
  ShoppingCart,
  LogOut,
  User as UserIcon,
  FileText,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCartQuery } from "@/services/queries/useCart";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/features/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/auth-slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HomeHeaderProps {
  onSearch: (term: string) => void;
}

export function HomeHeader({ onSearch }: HomeHeaderProps) {
  const [inputValue, setInputValue] = useState("");
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
    <div className="relative">
      {/* Header */}
      <header className="absolute top-0 right-0 left-0 z-50">
        <div className=" flex h-15.75 md:h-19.75 items-center justify-between px-4 md:px-30">
          <Link to="/" className="hidden md:block items-center w-37.5 h-10.5">
            <img
              className="w-full h-full object-contain"
              src="/icons/icon-logo-white-text.svg"
              alt="Logo"
            />
          </Link>

          <Link to="/" className="block md:hidden items-center w-10 h-10">
            <img src="/icons/icon-logo-white.svg" alt="Logo" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/cart"
                className="relative hover:scale-110 transition-transform p-2"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                      <UserIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-lg font-semibold text-white">
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
                      <span className="text-sm text-neutral-950">
                        My Profile
                      </span>
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

      {/* Hero Section */}
      <section className="relative h-162 md:h-207 w-full overflow-hidden">
        {/* Image + Overlay */}
        <div className="-z-1 absolute top-0 left-0 w-full h-full">
          <img
            className="w-full h-full object-cover"
            src="/images/image-hero.png"
            alt="Header"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full from-transparent to-black/80 bg-linear-to-b z-2"></div>

        {/* Content */}
        <div className="z-3 relative flex flex-col items-center px-5.5 justify-center h-full">
          <div className="flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col gap-1 md:gap-2 text-white text-center">
              <h1 className="text-display-lg font-extrabold md:text-display-2xl">
                Explore Culinary Experiences
              </h1>
              <p className="text-lg font-bold md:text-display-xs">
                Search and refine your choice to discover the perfect
                restaurant.
              </p>
            </div>
            <div className="relative w-full md:px-13.5 ">
              <Search className="absolute md:left-16.5 left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                placeholder="Search restaurants, food and drink"
                className="pl-10 rounded-full bg-white"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearch(inputValue);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
