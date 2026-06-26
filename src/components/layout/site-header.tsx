"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { CartNavButton } from "@/components/shop/cart-nav-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navItems, serviceMenuItems } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const isServicesActive = pathname === "/services" || pathname === "/tuning" || pathname === "/wiring";

  function closeMenus() {
    setIsOpen(false);
    setIsServicesOpen(false);
  }

  return (
    <header className="theme-transition sticky top-0 z-50 border-b border-zinc-200 bg-white/88 backdrop-blur-xl dark:border-white/10 dark:bg-graphite-950/88">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary navigation">
          {navItems.map((item) =>
            item.href === "/services" ? (
              <div key={item.href} className="relative" onMouseLeave={() => setIsServicesOpen(false)}>
                <button
                  type="button"
                  className={cn(
                    "technical-label inline-flex items-center gap-1 text-[0.66rem] text-zinc-500 transition hover:text-cyan-700 dark:text-track-muted dark:hover:text-cyan-300",
                    isServicesActive && "text-cyan-700 dark:text-cyan-300"
                  )}
                  aria-expanded={isServicesOpen}
                  aria-haspopup="menu"
                  onClick={() => setIsServicesOpen((value) => !value)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                >
                  {item.label}
                  <ChevronDown className={cn("h-3 w-3 transition", isServicesOpen && "rotate-180")} />
                </button>
                {isServicesOpen ? (
                  <div className="absolute left-0 top-full z-50 pt-4">
                    <div
                      className="theme-transition grid min-w-56 gap-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-panel dark:border-white/10 dark:bg-graphite-925"
                      role="menu"
                    >
                      {serviceMenuItems.map((service) => (
                        <Link
                          key={service.href + service.label}
                          href={service.href}
                          className="rounded-md px-3 py-2 text-xs font-black uppercase text-zinc-600 transition hover:bg-zinc-100 hover:text-cyan-700 dark:text-track-muted dark:hover:bg-white/10 dark:hover:text-cyan-300"
                          role="menuitem"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "technical-label text-[0.66rem] text-zinc-500 transition hover:text-cyan-700 dark:text-track-muted dark:hover:text-cyan-300",
                  pathname === item.href && "text-cyan-700 dark:text-cyan-300"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <CartNavButton showLabel />
          <ButtonLink href="/contact" className="min-h-10 px-4">
            Request Tuning
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <CartNavButton />
          <button
            type="button"
            className="theme-transition inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-900 dark:border-white/15 dark:bg-white/[0.04] dark:text-track-white"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="theme-transition border-t border-zinc-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-graphite-925 lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "theme-transition rounded-md border border-zinc-200 px-4 py-3 text-sm font-black uppercase text-zinc-600 dark:border-white/10 dark:text-track-muted",
                  (pathname === item.href || (item.href === "/services" && isServicesActive)) &&
                    "border-cyan-500/50 text-cyan-700 dark:text-cyan-300"
                )}
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className={cn(
                "theme-transition rounded-md border border-zinc-200 px-4 py-3 text-sm font-black uppercase text-zinc-600 dark:border-white/10 dark:text-track-muted",
                pathname === "/cart" && "border-cyan-500/50 text-cyan-700 dark:text-cyan-300"
              )}
              onClick={closeMenus}
            >
              Cart
            </Link>
            <div className="grid gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-2 dark:border-white/10 dark:bg-white/[0.04]">
              {serviceMenuItems.map((service) => (
                <Link
                  key={service.href + service.label}
                  href={service.href}
                  className="theme-transition rounded-md px-3 py-2 text-xs font-black uppercase text-zinc-600 dark:text-track-muted"
                  onClick={closeMenus}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
