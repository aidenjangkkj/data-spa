import type { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
