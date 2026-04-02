import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { OnThisPage } from "@/components/OnThisPage";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "MantleUI — React Component Library",
  description:
    "A modern React component library showcasing design patterns, accessibility, and clean architecture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 antialiased">
        <Providers>
          <MobileNav />
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-10 lg:px-16">
              <div className="mx-auto max-w-3xl">
                <PageTransition>{children}</PageTransition>
              </div>
            </main>
            <aside className="sticky top-0 hidden h-screen w-48 shrink-0 overflow-y-auto py-10 pr-6 xl:block">
              <OnThisPage />
            </aside>
          </div>
        </Providers>
      </body>
    </html>
  );
}
