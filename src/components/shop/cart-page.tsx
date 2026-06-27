"use client";

import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/content/site";
import { formatCartPrice, getCartProductDescriptor } from "@/lib/shop/cart";
import type { ResolvedCartItem } from "@/lib/shop/cart";
import { useCart } from "./cart-provider";

type CheckoutFormState = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  notes: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutFormState, string>>;

const defaultForm: CheckoutFormState = {
  name: "",
  email: "",
  phone: "",
  vehicle: "",
  notes: ""
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "theme-transition min-h-12 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/10 dark:bg-graphite-950 dark:text-track-white dark:placeholder:text-zinc-600";
const labelClass = "text-xs font-black uppercase text-zinc-700 dark:text-zinc-300";
const errorClass = "text-xs font-bold text-red-600 dark:text-red-300";

function formatValue(value: string) {
  return value.trim() || "Not provided";
}

function validateForm(form: CheckoutFormState) {
  const errors: CheckoutErrors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone is required.";
  }

  if (!form.vehicle.trim()) {
    errors.vehicle = "Year, make, and model are required.";
  }

  return errors;
}

function cartLinesForEmail(items: ResolvedCartItem[]) {
  return items
    .map((item) => {
      const linePrice = item.lineTotalCents ?? item.product.amountCents;
      return [
        `${item.quantity} x ${item.product.title}`,
        `Collection: ${item.product.collection}`,
        `Category: ${item.product.category}`,
        `Product type: ${getCartProductDescriptor(item.product)}`,
        `Price: ${formatCartPrice(linePrice)}`,
        `Notes: ${item.product.notes}`
      ].join("\n");
    })
    .join("\n\n");
}

function buildEmailBody(form: CheckoutFormState, items: ResolvedCartItem[], subtotalCents: number) {
  return [
    "TurboGixxer purchase order",
    "",
    "Customer",
    `Name: ${formatValue(form.name)}`,
    `Email: ${formatValue(form.email)}`,
    `Phone: ${formatValue(form.phone)}`,
    `Vehicle: ${formatValue(form.vehicle)}`,
    "",
    "Cart",
    cartLinesForEmail(items),
    "",
    `Subtotal shown: ${formatCartPrice(subtotalCents)}`,
    "",
    "Additional notes",
    formatValue(form.notes)
  ].join("\n");
}

function CheckoutField({
  error,
  label,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value
}: {
  error?: string;
  label: string;
  name: keyof CheckoutFormState;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className="grid gap-2">
      <span className={labelClass}>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        className={fieldClass}
        onChange={onChange}
      />
      {error ? <span className={errorClass}>{error}</span> : null}
    </label>
  );
}

function CartLineItem({ item }: { item: ResolvedCartItem }) {
  const { removeItem, updateQuantity } = useCart();
  const linePrice = item.lineTotalCents ?? item.product.amountCents;
  const canAdjust = item.maxQuantity > 1;

  return (
    <li className="grid gap-5 border-b border-zinc-200 py-5 last:border-b-0 dark:border-white/10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <p className="technical-label text-cyan-700 dark:text-cyan-300">{item.product.category}</p>
          <h2 className="mt-2 text-xl font-black uppercase text-zinc-950 dark:text-track-white">{item.product.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-track-muted">
            {item.product.shortDescription}
          </p>
          <p className="mt-3 text-xs font-bold uppercase leading-5 text-zinc-500 dark:text-zinc-400">
            {getCartProductDescriptor(item.product)}
          </p>
        </div>
        <p className="text-xl font-black text-zinc-950 dark:text-track-white">{formatCartPrice(linePrice)}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {canAdjust ? (
          <div className="inline-flex min-h-10 items-center overflow-hidden rounded-md border border-zinc-200 dark:border-white/10">
            <button
              type="button"
              className="theme-transition flex h-10 w-10 items-center justify-center text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-track-muted dark:hover:bg-white/10 dark:hover:text-track-white"
              aria-label={`Decrease ${item.product.title} quantity`}
              onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-10 text-center text-xs font-black text-zinc-950 dark:text-track-white">
              {item.quantity}
            </span>
            <button
              type="button"
              className="theme-transition flex h-10 w-10 items-center justify-center text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-track-muted dark:hover:bg-white/10 dark:hover:text-track-white"
              aria-label={`Increase ${item.product.title} quantity`}
              onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="inline-flex min-h-10 items-center rounded-md border border-zinc-200 px-3 text-xs font-black uppercase text-zinc-600 dark:border-white/10 dark:text-track-muted">
            Qty 1
          </div>
        )}
        <button
          type="button"
          className="theme-transition inline-flex min-h-10 items-center gap-2 rounded-md border border-zinc-300 px-4 text-xs font-black uppercase text-zinc-600 hover:border-red-400 hover:text-red-600 dark:border-white/15 dark:text-track-muted dark:hover:border-red-300/60 dark:hover:text-red-300"
          onClick={() => removeItem(item.product.slug)}
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
      </div>
    </li>
  );
}

export function CartPage() {
  const { clearCart, resolvedItems, subtotalCents } = useCart();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});

  const mailtoHref = useMemo(() => {
    const subjectDetail = form.vehicle.trim() || form.name.trim() || "shop cart";
    const subject = `TurboGixxer purchase order - ${subjectDetail}`;
    const body = buildEmailBody(form, resolvedItems, subtotalCents);

    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form, resolvedItems, subtotalCents]);

  function clearError(field: keyof CheckoutFormState) {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as keyof CheckoutFormState;
    const { value } = event.currentTarget;

    setForm((current) => ({
      ...current,
      [field]: value
    }));
    clearError(field);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      window.location.href = mailtoHref;
    }
  }

  if (!resolvedItems.length) {
    return (
      <Card className="grid min-h-[360px] place-items-center p-8 text-center">
        <div>
          <ShoppingCart className="mx-auto h-12 w-12 text-cyan-700 dark:text-cyan-300" />
          <h2 className="mt-5 text-3xl font-black uppercase text-zinc-950 dark:text-track-white">Cart is empty.</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-600 dark:text-track-muted">
            Add Haltech hardware, tuning deposits, planning products, or consults from the Shop before checkout.
          </p>
          <Link
            href="/shop"
            className="theme-transition mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-cyan-500 bg-cyan-500 px-5 py-3 text-center text-xs font-black uppercase leading-none text-graphite-950 shadow-cyan hover:border-cyan-400 hover:bg-cyan-400"
          >
            Shop products
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-white/10 sm:flex-row sm:items-end">
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Selected items</p>
            <h2 className="mt-3 text-3xl font-black uppercase text-zinc-950 dark:text-track-white">Order summary.</h2>
          </div>
          <Button type="button" variant="ghost" onClick={clearCart}>
            Clear cart
          </Button>
        </div>
        <ul>
          {resolvedItems.map((item) => (
            <CartLineItem key={item.product.slug} item={item} />
          ))}
        </ul>
      </Card>

      <Card className="h-fit p-5 sm:p-6">
        <p className="technical-label text-cyan-700 dark:text-cyan-300">Customer details</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black uppercase text-zinc-950 dark:text-track-white">Subtotal</h2>
          <p className="text-2xl font-black text-zinc-950 dark:text-track-white">{formatCartPrice(subtotalCents)}</p>
        </div>
        <p className="mt-3 text-xs font-bold uppercase leading-5 text-zinc-500 dark:text-zinc-400">
          Items without a configured price show price at checkout. Paid items count toward the subtotal.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <CheckoutField
            label="Name"
            name="name"
            value={form.name}
            placeholder="Full name"
            required
            error={errors.name}
            onChange={handleFieldChange}
          />
          <CheckoutField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            placeholder="name@example.com"
            required
            error={errors.email}
            onChange={handleFieldChange}
          />
          <CheckoutField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            placeholder="(555) 123-4567"
            required
            error={errors.phone}
            onChange={handleFieldChange}
          />
          <CheckoutField
            label="Year, make, and model"
            name="vehicle"
            value={form.vehicle}
            placeholder="1999 Civic, 2018 Mustang, etc."
            required
            error={errors.vehicle}
            onChange={handleFieldChange}
          />
          <label className="grid gap-2">
            <span className={labelClass}>Additional notes</span>
            <textarea
              name="notes"
              value={form.notes}
              rows={4}
              placeholder="Fitment notes, preferred timing, shipping questions, or tuning context."
              className={`${fieldClass} min-h-28 py-3 leading-6`}
              onChange={handleFieldChange}
            />
          </label>

          <Button type="submit" className="w-full gap-2">
            <ShoppingBag className="h-4 w-4" />
            Place order
          </Button>
        </form>
      </Card>
    </div>
  );
}
