"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Cable, Cpu, Gauge, RadioTower, type LucideIcon } from "lucide-react";
import { servicePaths } from "@/content/services";
import { cn } from "@/lib/utils";

type ServicePath = (typeof servicePaths)[number];

type Features6Props = {
  eyebrow?: string;
  title?: string;
  copy?: string;
  services?: readonly ServicePath[];
};

const pathVisuals = {
  "dyno-tuning": {
    label: "Controlled load",
    icon: Gauge,
    accent: "from-cyan-500 to-sky-500",
    border: "group-hover:border-cyan-400/70",
    iconTone: "bg-cyan-500/10 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200"
  },
  "remote-tuning": {
    label: "Log driven",
    icon: RadioTower,
    accent: "from-blue-500 to-indigo-500",
    border: "group-hover:border-blue-400/70",
    iconTone: "bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200"
  },
  "wiring-harness": {
    label: "Signal quality",
    icon: Cable,
    accent: "from-amber-400 to-orange-500",
    border: "group-hover:border-amber-400/70",
    iconTone: "bg-amber-500/10 text-amber-800 dark:bg-amber-300/10 dark:text-amber-200"
  },
  "haltech-fitment": {
    label: "Fitment first",
    icon: Cpu,
    accent: "from-emerald-500 to-teal-500",
    border: "group-hover:border-emerald-400/70",
    iconTone: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"
  }
} satisfies Record<
  ServicePath["slug"],
  {
    label: string;
    icon: LucideIcon;
    accent: string;
    border: string;
    iconTone: string;
  }
>;

export default function Features6({
  eyebrow = "Services",
  title = "Choose the service before chasing power.",
  copy = "TurboGixxer scopes each build around the work being approved: dyno tuning, remote tuning, wiring foundation, or Haltech fitment.",
  services = servicePaths
}: Features6Props) {
  return (
    <section className="theme-transition w-full bg-white px-4 py-16 dark:bg-graphite-950 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3 }}
            className="technical-label text-cyan-700 dark:text-cyan-300"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, delay: 0.04 }}
            className="display-heading mt-4 break-words text-2xl text-zinc-950 dark:text-track-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 dark:text-track-muted"
          >
            {copy}
          </motion.p>
        </div>

        <div
          className={cn(
            "mt-10 grid min-w-0 grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2",
            services.length > 2 ? "xl:grid-cols-4" : "max-w-4xl"
          )}
        >
          {services.map((service, index) => (
            <ServicePathCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicePathCard({ service, index }: { service: ServicePath; index: number }) {
  const visual = pathVisuals[service.slug];
  const Icon = visual.icon;
  const ariaLabel =
    service.slug === "dyno-tuning"
      ? "View Dyno Tuning"
      : service.slug === "remote-tuning"
        ? "View Remote Tuning"
        : "View Services";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex min-h-[390px] min-w-0 flex-col overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]",
        visual.border
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", visual.accent)} />
      <div className="relative flex items-center justify-between gap-4">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg", visual.iconTone)}>
          <Icon className="h-5 w-5" />
        </div>
        <p className="technical-label hidden min-w-0 text-right leading-4 text-zinc-500 dark:text-zinc-400 sm:block">
          {visual.label}
        </p>
      </div>

      <h3 className="relative mt-8 min-w-0 break-words text-xl font-black uppercase leading-7 text-zinc-950 dark:text-track-white sm:text-2xl">
        {service.title}
      </h3>
      <p className="relative mt-5 min-w-0 break-words text-sm leading-6 text-zinc-600 dark:text-track-muted">
        {service.summary}
      </p>
      <div className="relative mt-6 grid gap-2">
        {service.points.map((point, pointIndex) => (
          <motion.div
            key={point}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.08 * pointIndex }}
            className="flex gap-3 text-sm text-zinc-600 dark:text-track-muted"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyan-500" />
            <span>{point}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-auto flex items-center justify-between gap-5 pt-8">
        <div>
          <p className="min-w-0 break-words text-xl font-black uppercase text-zinc-950 dark:text-track-white sm:text-2xl">
            {service.price}
          </p>
          <p className="mt-2 max-w-[17rem] break-words text-xs font-bold uppercase leading-5 text-cyan-700 dark:text-cyan-300">
            {service.note}
          </p>
        </div>
        <Link
          href={service.href}
          aria-label={ariaLabel}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-800 transition-colors group-hover:bg-cyan-500 group-hover:text-white dark:bg-white/10 dark:text-zinc-200"
        >
          <motion.span whileHover={{ x: 2 }} transition={{ duration: 0.2 }} className="inline-flex">
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}
