import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { footerServiceLinks, navItems, policyLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="theme-transition border-t border-zinc-200 bg-white dark:border-white/10 dark:bg-graphite-950">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_2fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600 dark:text-track-muted">
            EFI calibration, dyno tuning, remote revisions, wiring support, and Haltech planning for mechanically ready vehicles.
          </p>
          <div className="mt-6">
            <ButtonLink href="/contact" variant="secondary">
              Start Intake
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <FooterColumn title="Navigation" links={navItems} />
          <FooterColumn title="Services" links={footerServiceLinks} />
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Contact</p>
            <div className="mt-4 grid gap-3 text-sm text-zinc-600 dark:text-track-muted">
              <a href={`mailto:${site.email}`} className="hover:text-zinc-950 dark:hover:text-track-white">
                {site.email}
              </a>
              <span>{site.serviceArea}</span>
              {policyLinks.map((item) => (
                <Link key={item.label} href={item.href} className="hover:text-zinc-950 dark:hover:text-track-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <p className="technical-label text-cyan-700 dark:text-cyan-300">{title}</p>
      <div className="mt-4 grid gap-3">
        {links.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-track-muted dark:hover:text-track-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
