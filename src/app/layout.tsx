import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { useLocation } from "react-router-dom";

export function Layout() {
  const isHome = useLocation().pathname === "/";
  return (
    <div className="min-h-screen flex flex-col">
      {/* {isHome && (
        <img
          className="absolute w-full h-96 object-cover"
          src="/images/image-hero.jpg"
          alt="Hero"
        />
      )} */}
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
