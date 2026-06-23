import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const textFields = [
  { label: "Name", name: "name", placeholder: "Full name", type: "text" },
  { label: "Email", name: "email", placeholder: "name@example.com", type: "email" },
  { label: "Phone", name: "phone", placeholder: "(555) 123-4567", type: "tel" },
  { label: "Vehicle", name: "vehicle", placeholder: "Year / make / model", type: "text" },
  { label: "Engine", name: "engine", placeholder: "Engine and displacement", type: "text" },
  { label: "ECU", name: "ecu", placeholder: "Factory ECU, Haltech, Link, etc.", type: "text" },
  { label: "Fuel", name: "fuel", placeholder: "Pump gas, E85, race fuel", type: "text" },
  { label: "Power adder", name: "powerAdder", placeholder: "Turbo, supercharger, nitrous, NA", type: "text" }
] as const;

const selectFields = [
  {
    label: "Service requested",
    name: "service",
    options: ["Dyno Tuning", "Remote Tuning", "Standalone ECU Setup", "Factory ECU Tuning", "Wiring / Harness Support", "Haltech Fitment Help"]
  },
  {
    label: "Timeline",
    name: "timeline",
    options: ["Planning", "Ready now", "Within 30 days", "Event deadline"]
  },
  {
    label: "Budget range",
    name: "budget",
    options: ["Not sure yet", "$500-$1,000", "$1,000-$2,500", "$2,500+"]
  }
] as const;

export function ContactFormPlaceholder() {
  return (
    <Card className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[1fr_0.7fr]">
      <form className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          {textFields.map((field) => (
            <label key={field.name} className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300">{field.label}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="theme-transition min-h-12 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/10 dark:bg-graphite-950 dark:text-track-white dark:placeholder:text-zinc-600"
              />
            </label>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {selectFields.map((field) => (
            <label key={field.name} className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300">{field.label}</span>
              <select
                name={field.name}
                defaultValue=""
                className="theme-transition min-h-12 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none focus:border-cyan-500 dark:border-white/10 dark:bg-graphite-950 dark:text-track-white"
              >
                <option value="" disabled>
                  Select
                </option>
                {field.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300">Goals</span>
          <textarea
            name="goals"
            placeholder="Power goal, drivability target, current issues, and intended use."
            rows={4}
            className="theme-transition rounded-md border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/10 dark:bg-graphite-950 dark:text-track-white dark:placeholder:text-zinc-600"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300">Notes</span>
          <textarea
            name="notes"
            placeholder="Parts list, sensor details, fuel system, injectors, turbo, boost control, links, or constraints."
            rows={4}
            className="theme-transition rounded-md border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/10 dark:bg-graphite-950 dark:text-track-white dark:placeholder:text-zinc-600"
          />
        </label>

        <Button type="button" className="w-full sm:w-fit">
          Submit Intake Placeholder
        </Button>
      </form>

      <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-graphite-925">
        <p className="technical-label text-cyan-700 dark:text-cyan-300">Future integrations</p>
        <h2 className="mt-4 text-2xl font-black uppercase text-zinc-950 dark:text-track-white">
          Intake-ready frontend only.
        </h2>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-track-muted">
          This form is intentionally frontend-only. DynamoDB, SES, Stripe deposits, and calendar scheduling can
          attach later without changing the visible customer flow.
        </p>
        <div className="mt-6 grid gap-3 text-sm font-bold uppercase text-zinc-600 dark:text-track-muted">
          <span>Vehicle + ECU details</span>
          <span>Service path selection</span>
          <span>Timeline + budget range</span>
          <span>Technical notes</span>
        </div>
      </aside>
    </Card>
  );
}
