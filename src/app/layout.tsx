import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
