"use client";

import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requestServiceOptions } from "@/content/services";
import { shopProducts } from "@/content/shop-products";
import type { ShopProduct } from "@/content/shop-products";
import { site } from "@/content/site";
import { getShopProductDisplayTitle } from "@/lib/shop/display";

type IntakeFormState = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  engine: string;
  ecu: string;
  fuel: string;
  majorModifications: string;
  intent: string;
  service: string;
  currentIssues: string;
  goals: string;
  fileOrDatalog: string;
  notes: string;
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

const generalTuningIntent = "tuning-request";
const tuningDepositIntent = "tuning-deposit";

const generalIntentOption: IntentOption = {
  slug: generalTuningIntent,
  title: "Request Tuning",
  category: "Request",
  price: "Review first",
  for: "No deposit is required to submit the request.",
  summary:
    "Tell us about the vehicle, current setup, and what you want to accomplish before TurboGixxer recommends the next step."
};

const defaultForm: IntakeFormState = {
  name: "",
  email: "",
  phone: "",
  vehicle: "",
  engine: "",
  ecu: "",
  fuel: "",
  majorModifications: "",
  intent: generalTuningIntent,
  service: "",
  currentIssues: "",
  goals: "",
  fileOrDatalog: "",
  notes: ""
};

function productContext(product: ShopProduct) {
  switch (product.productType) {
    case "service_deposit":
      return "Tuning deposit applied toward approved dyno or remote tuning.";
    case "paid_consultation":
      return "Paid consultation that requires intake and calendar scheduling.";
    case "paid_review":
      return "Paid planning product that requires intake before async follow-up.";
    case "hardware_product":
      return product.requiresIntake ? "Hardware order routed through intake." : "Hardware order handled through Shop.";
    case "wiring_add_on":
    case "in_house_product":
    case "merch":
    default:
      return "Shop order prepared for checkout.";
  }
}

const intentOptions: IntentOption[] = [
  generalIntentOption,
  ...shopProducts
    .filter((product) => product.slug === tuningDepositIntent && product.status !== "hidden")
    .map((product) => ({
      slug: product.slug,
      title: getShopProductDisplayTitle(product),
      category: product.category,
      price: product.priceLabel,
      for: productContext(product),
      summary: product.shortDescription,
      serviceSlug: product.serviceSlug
    }))
];

const legacyIntentServices: Record<string, string> = {
  "booking-deposit": "dyno-tuning",
  "dyno-session-deposit": "dyno-tuning",
  "remote-tune-deposit": "remote-tuning"
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const textFields = [
  { label: "Name", name: "name", placeholder: "Full name", type: "text", required: true },
  { label: "Email", name: "email", placeholder: "name@example.com", type: "email", required: true },
  { label: "Phone", name: "phone", placeholder: "(555) 123-4567", type: "tel", required: true },
  { label: "Year, make, and model", name: "vehicle", placeholder: "1999 Civic, 2018 Mustang, etc.", type: "text", required: true },
  { label: "Engine", name: "engine", placeholder: "Engine and displacement", type: "text", required: false },
  { label: "ECU or tuning platform", name: "ecu", placeholder: "Factory ECU, Haltech, Link, etc.", type: "text", required: false },
  { label: "Fuel", name: "fuel", placeholder: "Pump gas, E85, race fuel", type: "text", required: false }
] as const;

const detailFields = [
  {
    label: "Major modifications",
    name: "majorModifications",
    placeholder: "Turbo, supercharger, injectors, fuel system, cam, exhaust, sensors, wiring, drivetrain.",
    rows: 4,
    required: false
  },
  {
    label: "Current issues",
    name: "currentIssues",
    placeholder: "Idle, drivability, starting, boost control, fuel pressure, sensor, wiring, or datalog concerns.",
    rows: 4,
    required: false
  },
  {
    label: "Goals",
    name: "goals",
    placeholder: "Power target, drivability target, intended use, and what you want the build to do.",
    rows: 4,
    required: true
  },
  {
    label: "File or datalog upload",
    name: "fileOrDatalog",
    placeholder: "Paste a datalog, file, or shared folder link when available.",
    rows: 3,
    required: false
  },
  {
    label: "Additional notes",
    name: "notes",
    placeholder: "Anything else TurboGixxer should review before recommending the next step.",
    rows: 3,
    required: false
  }
] as const;

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
    errors.vehicle = "Year, make, and model are required.";
  }

  if (!form.service) {
    errors.service = "Choose the requested service.";
  }

  if (!form.goals.trim()) {
    errors.goals = "Add the goals for the car or build.";
  }

  return errors;
}

function buildEmailBody(form: IntakeFormState, intentTitle: string) {
  return [
    "TurboGixxer tuning request",
    "",
    `Request type: ${intentTitle}`,
    `Service requested: ${formatValue(form.service)}`,
    "",
    "Customer",
    `Name: ${formatValue(form.name)}`,
    `Email: ${formatValue(form.email)}`,
    `Phone: ${formatValue(form.phone)}`,
    "",
    "Vehicle",
    `Year, make, and model: ${formatValue(form.vehicle)}`,
    `Engine: ${formatValue(form.engine)}`,
    `ECU or tuning platform: ${formatValue(form.ecu)}`,
    `Fuel: ${formatValue(form.fuel)}`,
    `Major modifications: ${formatValue(form.majorModifications)}`,
    "",
    "Current issues",
    formatValue(form.currentIssues),
    "",
    "Goals",
    formatValue(form.goals),
    "",
    "File or datalog",
    formatValue(form.fileOrDatalog),
    "",
    "Additional notes",
    formatValue(form.notes)
  ].join("\n");
}

function getServiceBySlug(slug?: string) {
  return requestServiceOptions.find((service) => service.slug === slug);
}

function createInitialForm(initialIntent?: string, initialService?: string): IntakeFormState {
  const aliasedServiceSlug = initialIntent ? legacyIntentServices[initialIntent] : undefined;
  const normalizedIntent = initialIntent === tuningDepositIntent || aliasedServiceSlug ? tuningDepositIntent : initialIntent;
  const matchedIntent = intentOptions.find((option) => option.slug === normalizedIntent);
  const matchedService = getServiceBySlug(initialService);
  const intentService = getServiceBySlug(aliasedServiceSlug ?? matchedIntent?.serviceSlug);

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
    const subject = `TurboGixxer tuning request - ${subjectDetail}`;
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

        <label className="grid gap-2">
          <span className={labelClass}>Requested service *</span>
          <select
            name="service"
            value={form.service}
            aria-invalid={Boolean(errors.service)}
            className={fieldClass}
            onChange={handleFieldChange}
            required
          >
            <option value="">Select service</option>
            {requestServiceOptions.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          {errors.service ? <span className={errorClass}>{errors.service}</span> : null}
        </label>

        {detailFields.map((field) => (
          <label key={field.name} className="grid gap-2">
            <span className={labelClass}>
              {field.label}
              {field.required ? " *" : ""}
            </span>
            <textarea
              name={field.name}
              value={form[field.name]}
              placeholder={field.placeholder}
              rows={field.rows}
              aria-invalid={Boolean(errors[field.name])}
              className={`${fieldClass} py-3`}
              onChange={handleFieldChange}
              required={field.required}
            />
            {errors[field.name] ? <span className={errorClass}>{errors[field.name]}</span> : null}
          </label>
        ))}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" className="w-full gap-2 sm:w-fit">
            <CheckCircle2 className="h-4 w-4" />
            Submit Tuning Request
          </Button>
          <Button type="button" variant="ghost" className="w-full sm:w-fit" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </form>

      <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-graphite-925">
        <p className="technical-label text-cyan-700 dark:text-cyan-300">Request details</p>
        <h2 className="mt-4 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">
          Request Tuning
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
          <span>Requested service</span>
          <span>Current issues and goals</span>
          <span>Datalog link when available</span>
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
                {isPrepared ? "Request received" : "Complete required fields"}
              </p>
              <p className="mt-2 text-sm leading-6">
                {isPrepared
                  ? "Thanks for contacting TurboGixxer. Your build information has been received and will be reviewed before we recommend the next step."
                  : "The form checks customer details, vehicle setup, requested service, and goals before preparing an email draft."}
              </p>
            </div>
          </div>

          {isPrepared ? (
            <ButtonLink href={mailtoHref} className="mt-4 w-full gap-2">
              <Mail className="h-4 w-4" />
              Submit Tuning Request
            </ButtonLink>
          ) : null}
        </div>
      </aside>
    </Card>
  );
}
