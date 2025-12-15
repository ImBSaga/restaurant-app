import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/header";
import { HomeHeader } from "@/components/home-header";
import { Footer } from "@/components/footer";

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      {isHome ? <HomeHeader onSearch={setSearchTerm} /> : <Header />}
      <main className="container mx-auto px-4 py-8 flex-1">
        <Outlet context={{ searchTerm }} />
      </main>
      <Footer />
    </div>
  );
}
