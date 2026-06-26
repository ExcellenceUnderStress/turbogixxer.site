import { requestServiceOptions } from "@/content/services";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Builds", href: "/builds" },
  { label: "Shop", href: "/shop" }
] as const;

export const serviceMenuItems = requestServiceOptions.map((service) => ({
  label: service.title,
  href: service.href
}));

export const footerServiceLinks = serviceMenuItems;

export const policyLinks = [
  { label: "Terms", href: "/shop" },
  { label: "Privacy", href: "/shop" },
  { label: "Deposit Policy", href: "/shop/deposits" }
] as const;
