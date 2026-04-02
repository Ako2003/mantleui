import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { OnThisPage } from "@/components/OnThisPage";
import { PageTransition } from "@/components/PageTransition";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileNav />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col overflow-x-hidden px-4 py-6 sm:px-8 sm:py-10 lg:px-16">
          <div className="mx-auto max-w-3xl flex-1">
            <PageTransition>{children}</PageTransition>
          </div>
          <footer className="mx-auto mt-16 w-full max-w-3xl border-t border-slate-200 py-6 text-xs text-slate-500 dark:border-zinc-800 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} MantleUI. All rights reserved.
          </footer>
        </main>
        <aside className="sticky top-0 hidden h-screen w-48 shrink-0 overflow-y-auto py-10 pr-6 xl:block">
          <OnThisPage />
        </aside>
      </div>
    </>
  );
}
