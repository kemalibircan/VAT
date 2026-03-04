import { ReactNode } from "react";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-8 md:px-8 md:py-14">
        <div className="w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
}


