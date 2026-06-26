"use client";

import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { depositNote, servicePaths } from "@/content/services";
import { shopProducts } from "@/content/shop-products";
import type { ShopProduct } from "@/content/shop-products";
import { site } from "@/content/site";

type IntakeFormState = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  engine: string;
  ecu: string;
  fuel: string;
  powerAdder: string;
  intent: string;
  service: string;
  timeline: string;
  budget: string;
  goals: string;
  notes: string;
  depositAcknowledged: boolean;
};

type FieldErrors = Partial<Record<keyof IntakeFormState, string>>;

type IntentOption = {
  slug: string;
  title: string;
  category: string;
  price: string;
  for: string;
  summary: string;
  serviceSlug?: string;
};

const defaultForm: IntakeFormState = {
  name: "",
  email: "",
  phone: "",
  vehicle: "",
  engine: "",
  ecu: "",
  fuel: "",
  powerAdder: "",
  intent: "general-intake",
  service: "",
  timeline: "",
  budget: "Not sure yet",
  goals: "",
  notes: "",
  depositAcknowledged: false
};

function productContext(product: ShopProduct) {
  switch (product.productType) {
    case "service_deposit":
      return product.requiresCalendar
        ? "Service deposit that requires intake and calendar scheduling."
        : "Service deposit that requires intake and manual follow-up.";
    case "paid_consultation":
      return "Paid consultation that requires intake and calendar scheduling.";
    case "paid_review":
      return "Paid review that requires intake before async follow-up.";
    case "hardware_product":
      return product.requiresIntake ? "Hardware request routed through intake." : "Hardware quote path in Shop.";
    case "wiring_add_on":
    case "in_house_product":
    case "merch":
    default:
      return "Shop path prepared for future checkout behavior.";
  }
}

const intentOptions: IntentOption[] = [
  {
    slug: "general-intake",
    title: "General Intake",
    category: "Intake",
    price: "Scope after review",
    for: "Customers who need the right service path selected first.",
    summary: "Start with build details, readiness, goals, and the intended use before scheduling."
  },
  ...shopProducts
    .filter((product) => product.status !== "hidden")
    .map((product) => ({
      slug: product.slug,
      title: product.title,
      category: product.category,
      price: product.priceLabel,
      for: productContext(product),
      summary: product.shortDescription,
      serviceSlug: product.serviceSlug
    }))
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const textFields = [
  { label: "Name", name: "name", placeholder: "Full name", type: "text", required: true },
  { label: "Email", name: "email", placeholder: "name@example.com", type: "email", required: true },
  { label: "Phone", name: "phone", placeholder: "(555) 123-4567", type: "tel", required: true },
  { label: "Vehicle", name: "vehicle", placeholder: "Year / make / model", type: "text", required: true },
  { label: "Engine", name: "engine", placeholder: "Engine and displacement", type: "text", required: false },
  { label: "ECU", name: "ecu", placeholder: "Factory ECU, Haltech, Link, etc.", type: "text", required: false },
  { label: "Fuel", name: "fuel", placeholder: "Pump gas, E85, race fuel", type: "text", required: false },
  { label: "Power adder", name: "powerAdder", placeholder: "Turbo, supercharger, nitrous, NA", type: "text", required: false }
] as const;

const timelineOptions = ["Planning", "Ready now", "Within 30 days", "Event deadline"] as const;
const budgetOptions = ["Not sure yet", "$500-$1,000", "$1,000-$2,500", "$2,500+"] as const;

const fieldClass =
  "theme-transition min-h-12 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/10 dark:bg-graphite-950 dark:text-track-white dark:placeholder:text-zinc-600";
const labelClass = "text-xs font-black uppercase text-zinc-700 dark:text-zinc-300";
const errorClass = "text-xs font-bold text-red-600 dark:text-red-300";

function formatValue(value: string) {
  return value.trim() || "Not provided";
}

function validateForm(form: IntakeFormState) {
  const errors: FieldErrors = {};

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
    errors.vehicle = "Vehicle is required.";
  }

  if (!form.service) {
    errors.service = "Choose the service path that best fits.";
  }

  if (!form.timeline) {
    errors.timeline = "Choose a timeline.";
  }

  if (!form.goals.trim()) {
    errors.goals = "Add the goal, current issue, or intended use.";
  }

  if (!form.depositAcknowledged) {
    errors.depositAcknowledged = "Confirm the deposit policy before preparing the intake.";
  }

  return errors;
}

function buildEmailBody(form: IntakeFormState, intentTitle: string) {
  return [
    "TurboGixxer intake request",
    "",
    `Requested path: ${intentTitle}`,
    `Service requested: ${formatValue(form.service)}`,
    `Timeline: ${formatValue(form.timeline)}`,
    `Budget range: ${formatValue(form.budget)}`,
    `Deposit policy acknowledged: ${form.depositAcknowledged ? "Yes" : "No"}`,
    "",
    "Customer",
    `Name: ${formatValue(form.name)}`,
    `Email: ${formatValue(form.email)}`,
    `Phone: ${formatValue(form.phone)}`,
    "",
    "Vehicle",
    `Vehicle: ${formatValue(form.vehicle)}`,
    `Engine: ${formatValue(form.engine)}`,
    `ECU: ${formatValue(form.ecu)}`,
    `Fuel: ${formatValue(form.fuel)}`,
    `Power adder: ${formatValue(form.powerAdder)}`,
    "",
    "Goals",
    formatValue(form.goals),
    "",
    "Build notes",
    formatValue(form.notes)
  ].join("\n");
}

function getServiceBySlug(slug?: string) {
  return servicePaths.find((service) => service.slug === slug);
}

function createInitialForm(initialIntent?: string, initialService?: string): IntakeFormState {
  const matchedIntent = intentOptions.find((option) => option.slug === initialIntent);
  const matchedService = getServiceBySlug(initialService);
  const intentService = matchedIntent?.serviceSlug ? getServiceBySlug(matchedIntent.serviceSlug) : undefined;

  return {
    ...defaultForm,
    intent: matchedIntent?.slug ?? defaultForm.intent,
    service: matchedService?.title ?? intentService?.title ?? defaultForm.service
  };
}

export function ContactIntakeForm({
  initialIntent,
  initialService
}: {
  initialIntent?: string;
  initialService?: string;
}) {
  const [form, setForm] = useState<IntakeFormState>(() => createInitialForm(initialIntent, initialService));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isPrepared, setIsPrepared] = useState(false);

  const selectedIntent = useMemo(
    () => intentOptions.find((option) => option.slug === form.intent) ?? intentOptions[0],
    [form.intent]
  );

  const mailtoHref = useMemo(() => {
    const subjectDetail = form.vehicle.trim() || form.service || selectedIntent.title;
    const subject = `TurboGixxer intake - ${subjectDetail}`;
    const body = buildEmailBody(form, selectedIntent.title);

    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form, selectedIntent.title]);

  function clearError(field: keyof IntakeFormState) {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as keyof IntakeFormState;
    const { value } = event.currentTarget;

    setForm((current) => ({
      ...current,
      [field]: value
    }));
    clearError(field);
    setIsPrepared(false);
  }

  function handlePolicyChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.currentTarget;

    setForm((current) => ({
      ...current,
      depositAcknowledged: checked
    }));
    clearError("depositAcknowledged");
    setIsPrepared(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setIsPrepared(Object.keys(nextErrors).length === 0);
  }

  function resetForm() {
    setForm(defaultForm);
    setErrors({});
    setIsPrepared(false);
  }

  return (
    <Card className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[1fr_0.74fr]">
      <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          {textFields.map((field) => (
            <label key={field.name} className="grid gap-2">
              <span className={labelClass}>
                {field.label}
                {field.required ? " *" : ""}
              </span>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                aria-invalid={Boolean(errors[field.name])}
                className={fieldClass}
                onChange={handleFieldChange}
              />
              {errors[field.name] ? <span className={errorClass}>{errors[field.name]}</span> : null}
            </label>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className={labelClass}>Requested path</span>
            <select name="intent" value={form.intent} className={fieldClass} onChange={handleFieldChange}>
              {intentOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.title}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Service requested *</span>
            <select
              name="service"
              value={form.service}
              aria-invalid={Boolean(errors.service)}
              className={fieldClass}
              onChange={handleFieldChange}
              required
            >
              <option value="">Select service</option>
              {servicePaths.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            {errors.service ? <span className={errorClass}>{errors.service}</span> : null}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className={labelClass}>Timeline *</span>
            <select
              name="timeline"
              value={form.timeline}
              aria-invalid={Boolean(errors.timeline)}
              className={fieldClass}
              onChange={handleFieldChange}
              required
            >
              <option value="">Select timeline</option>
              {timelineOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            {errors.timeline ? <span className={errorClass}>{errors.timeline}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Budget range</span>
            <select name="budget" value={form.budget} className={fieldClass} onChange={handleFieldChange}>
              {budgetOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className={labelClass}>Goals *</span>
          <textarea
            name="goals"
            value={form.goals}
            placeholder="Power goal, drivability target, current issues, and intended use."
            rows={4}
            aria-invalid={Boolean(errors.goals)}
            className={`${fieldClass} py-3`}
            onChange={handleFieldChange}
            required
          />
          {errors.goals ? <span className={errorClass}>{errors.goals}</span> : null}
        </label>

        <label className="grid gap-2">
          <span className={labelClass}>Build notes</span>
          <textarea
            name="notes"
            value={form.notes}
            placeholder="Parts list, sensor details, fuel system, injectors, turbo, boost control, links, or constraints."
            rows={4}
            className={`${fieldClass} py-3`}
            onChange={handleFieldChange}
          />
        </label>

        <label className="theme-transition flex gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700 dark:border-white/10 dark:bg-graphite-925 dark:text-track-muted">
          <input
            type="checkbox"
            name="depositAcknowledged"
            checked={form.depositAcknowledged}
            className="mt-1 h-4 w-4 accent-cyan-500"
            onChange={handlePolicyChange}
          />
          <span>
            I understand that {depositNote} Scheduling is handled after TurboGixxer reviews the intake and
            confirms the requested service path.
            {errors.depositAcknowledged ? <span className={`mt-2 block ${errorClass}`}>{errors.depositAcknowledged}</span> : null}
          </span>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" className="w-full gap-2 sm:w-fit">
            <CheckCircle2 className="h-4 w-4" />
            Prepare Intake
          </Button>
          <Button type="button" variant="ghost" className="w-full sm:w-fit" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </form>

      <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-graphite-925">
        <p className="technical-label text-cyan-700 dark:text-cyan-300">Selected path</p>
        <h2 className="mt-4 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">
          {selectedIntent.title}
        </h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-zinc-600 dark:text-track-muted">
          <p>{selectedIntent.summary}</p>
          <div className="grid gap-2 rounded-md border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-graphite-950">
            <span className="text-xs font-black uppercase text-cyan-700 dark:text-cyan-300">
              {selectedIntent.category}
            </span>
            <span className="text-2xl font-black text-zinc-950 dark:text-track-white">{selectedIntent.price}</span>
            <span className="font-bold uppercase text-zinc-700 dark:text-zinc-300">{selectedIntent.for}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-sm font-bold uppercase text-zinc-600 dark:text-track-muted">
          <span>Vehicle + ECU details</span>
          <span>Service path selection</span>
          <span>Deposit policy acknowledgement</span>
          <span>Email draft prepared for intake</span>
        </div>

        <div
          className={`mt-6 rounded-lg border p-4 ${
            isPrepared
              ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-950 dark:text-cyan-100"
              : "border-zinc-200 bg-white text-zinc-600 dark:border-white/10 dark:bg-graphite-950 dark:text-track-muted"
          }`}
        >
          <div className="flex items-start gap-3">
            {isPrepared ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-300" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400" />
            )}
            <div>
              <p className="text-sm font-black uppercase">
                {isPrepared ? "Ready to send" : "Complete required fields"}
              </p>
              <p className="mt-2 text-sm leading-6">
                {isPrepared
                  ? "Open the prepared email draft, review the details, and send it to TurboGixxer intake."
                  : "The form checks the service path, customer details, goals, timeline, and deposit acknowledgement before preparing an email draft."}
              </p>
            </div>
          </div>

          {isPrepared ? (
            <ButtonLink href={mailtoHref} className="mt-4 w-full gap-2">
              <Mail className="h-4 w-4" />
              Open Email Draft
            </ButtonLink>
          ) : null}
        </div>
      </aside>
    </Card>
  );
}
