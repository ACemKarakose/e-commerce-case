import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 lg:px-8">
        <Outlet />
      </main>

      {/* Footer - extra margin for newsletter overlap */}
      <div className="mt-40 md:mt-40">
        <Footer />
      </div>
    </div>
  );
}
