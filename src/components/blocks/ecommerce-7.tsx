"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Gauge } from "lucide-react";

type TabKey = "Haltech" | "Tuning Deposits" | "Fuel Injector Clinic";

type ShopCard = {
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  image: string;
  cta: string;
  status: "Active" | "Draft";
};

const tabs: Array<{ key: TabKey; summary: string }> = [
  {
    key: "Haltech",
    summary: "ECU, VCU, display, CAN, and wideband hardware paths with fitment context."
  },
  {
    key: "Tuning Deposits",
    summary: "The $200 deposit path for approved dyno or remote tuning intake."
  },
  {
    key: "Fuel Injector Clinic",
    summary: "Fuel-system product staging stays separate until ordering rules are ready."
  }
];

const shopSections: Record<TabKey, ShopCard[]> = {
  Haltech: [
    {
      eyebrow: "VCU / ECU",
      title: "Haltech Nexus R3",
      summary: "Compact Nexus hardware for builds that need ECU control, power distribution, and CAN expansion.",
      href: "/shop/haltech/haltech-nexus-r3",
      image: "/media/gallery/ecu-bench.png",
      cta: "Shop Haltech",
      status: "Active"
    },
    {
      eyebrow: "VCU / ECU",
      title: "Haltech Nexus R5",
      summary: "Higher-capability Nexus hardware for advanced IO, power management, CAN, and motorsport wiring plans.",
      href: "/shop/haltech/haltech-nexus-r5",
      image: "/media/gallery/harness-inspection.png",
      cta: "Shop Haltech",
      status: "Active"
    },
    {
      eyebrow: "Standalone ECU",
      title: "Haltech Elite 2500",
      summary: "Standalone ECU hardware for calibrated street, strip, and motorsport applications.",
      href: "/shop/haltech/haltech-elite-2500",
      image: "/media/gallery/logging-pass.png",
      cta: "Shop Haltech",
      status: "Active"
    },
    {
      eyebrow: "Display",
      title: "Haltech IC-7 Display",
      summary: "CAN display planning for monitored data, warnings, and clean driver feedback.",
      href: "/shop/haltech/haltech-ic-7-display",
      image: "/media/gallery/drive-validation.png",
      cta: "Shop Haltech",
      status: "Active"
    },
    {
      eyebrow: "CAN Control",
      title: "Haltech CAN Keypad",
      summary: "CAN keypad planning for boost, launch, fan, pump, lighting, and auxiliary control strategies.",
      href: "/shop/haltech/haltech-can-keypad",
      image: "/media/gallery/harness-inspection.png",
      cta: "Shop Haltech",
      status: "Active"
    },
    {
      eyebrow: "Sensor / Wideband",
      title: "Haltech WB1 Wideband",
      summary: "Wideband controller planning for calibration feedback and monitored safety data.",
      href: "/shop/haltech/haltech-wb1-wideband",
      image: "/media/gallery/logging-pass.png",
      cta: "Shop Haltech",
      status: "Active"
    }
  ],
  "Tuning Deposits": [
    {
      eyebrow: "Deposit",
      title: "Tuning Deposit",
      summary: "One $200 deposit for approved dyno tuning or remote tuning intake, with day selection before review.",
      href: "/shop/deposits",
      image: "/media/gallery/mainline-hub.png",
      cta: "Request Tuning",
      status: "Active"
    },
    {
      eyebrow: "Dyno Path",
      title: "Dyno Tuning Intake",
      summary: "Mainline hub dyno calibration starts with vehicle details, deposit checkout, and a selected day.",
      href: "/contact?intent=tuning-deposit&service=dyno-tuning",
      image: "/media/gallery/mainline-hub.png",
      cta: "Start Intake",
      status: "Active"
    },
    {
      eyebrow: "Remote Path",
      title: "Remote Tuning Intake",
      summary: "Remote tuning requests stay tied to readiness details, logs, and the same deposit policy.",
      href: "/contact?intent=tuning-deposit&service=remote-tuning",
      image: "/media/gallery/track-notes.png",
      cta: "Start Intake",
      status: "Active"
    }
  ],
  "Fuel Injector Clinic": [
    {
      eyebrow: "Fuel System",
      title: "Injector Products",
      summary: "Injector and fuel-system products will be staged here with vehicle details required before ordering.",
      href: "/shop/fuel-injector-clinic",
      image: "/media/gallery/ecu-bench.png",
      cta: "View Staged Products",
      status: "Draft"
    },
    {
      eyebrow: "Sizing",
      title: "Injector Matching",
      summary: "Injector selection must match fuel, power target, ECU support, and the way the vehicle is used.",
      href: "/shop/fuel-injector-clinic",
      image: "/media/gallery/logging-pass.png",
      cta: "View Staged Products",
      status: "Draft"
    },
    {
      eyebrow: "Readiness",
      title: "Fuel Data Required",
      summary: "Ordering stays gated behind fuel type, pressure strategy, injector data, and calibration context.",
      href: "/shop/fuel-injector-clinic",
      image: "/media/gallery/drive-validation.png",
      cta: "View Staged Products",
      status: "Draft"
    }
  ]
};

export default function Ecommerce7() {
  const [active, setActive] = useState<TabKey>(tabs[0].key);
  const activeTab = tabs.find((tab) => tab.key === active) ?? tabs[0];

  return (
    <section className="theme-transition w-full bg-zinc-50 py-16 dark:bg-graphite-925 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="technical-label text-cyan-700 dark:text-cyan-300"
            >
              Shop sections
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.04 }}
              className="mt-4 max-w-3xl text-3xl font-black uppercase text-zinc-950 dark:text-track-white sm:text-5xl"
            >
              Shop by active path.
            </motion.h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-track-muted sm:text-base">
              Haltech hardware, tuning deposits, and staged fuel-system products stay separated so requests match the actual path being handled.
            </p>
          </div>

          <Link
            href="/contact"
            className="theme-transition inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-5 py-3 text-center text-xs font-black uppercase text-zinc-950 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/20 dark:bg-white/[0.04] dark:text-track-white dark:hover:border-cyan-300/60 dark:hover:text-cyan-200 sm:w-fit"
          >
            <Gauge className="h-4 w-4" />
            Request Tuning
          </Link>
        </div>

        <div className="relative mt-10 flex items-center gap-8 overflow-x-auto overflow-y-hidden border-b border-zinc-200 [-ms-overflow-style:none] [scrollbar-width:none] dark:border-white/10 [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              aria-pressed={active === tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative whitespace-nowrap pb-3 text-sm font-black uppercase transition-colors ${
                active === tab.key
                  ? "text-zinc-950 dark:text-track-white"
                  : "text-zinc-500 hover:text-zinc-950 dark:text-track-muted dark:hover:text-track-white"
              }`}
            >
              {tab.key}
              {active === tab.key ? (
                <motion.span
                  layoutId="shop-section-tab"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-cyan-500"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              ) : null}
            </button>
          ))}
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-track-muted">{activeTab.summary}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shopSections[active].map((item, index) => (
              <motion.div
                key={`${active}-${item.title}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, delay: (index % 3) * 0.04 }}
                className="h-full"
              >
                <Link
                  href={item.href}
                  className="theme-transition group flex h-full min-h-[390px] flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-900/5 transition hover:-translate-y-1 hover:border-cyan-500/60 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/20"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-graphite-950">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.05]"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <p className="technical-label absolute left-4 top-4 rounded-md bg-white/90 px-3 py-2 text-zinc-700 shadow-sm dark:bg-graphite-950/90 dark:text-track-muted">
                      {item.status}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="technical-label text-cyan-700 dark:text-cyan-300">{item.eyebrow}</p>
                    <h3 className="mt-4 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">{item.summary}</p>
                    <p className="mt-auto inline-flex items-center gap-1 pt-8 text-xs font-black uppercase text-cyan-700 dark:text-cyan-300">
                      {item.cta}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
