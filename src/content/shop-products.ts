export const shopProducts = [
  {
    slug: "booking-deposit",
    title: "Booking Deposit",
    category: "Deposit",
    price: "$200",
    for: "Approved service scheduling after intake review.",
    summary:
      "Applied toward approved service. This is a scheduling deposit, not the full dyno tuning price.",
    serviceSlug: "dyno-tuning",
    cta: "Start Intake"
  },
  {
    slug: "remote-tune-deposit",
    title: "Remote Tune Deposit",
    category: "Deposit",
    price: "$200",
    for: "Mechanically ready builds that can provide complete logs.",
    summary:
      "Routes remote-ready builds into log review before payment, revision scope, or scheduling.",
    serviceSlug: "remote-tuning",
    cta: "Request Review"
  },
  {
    slug: "dyno-session-deposit",
    title: "Dyno Session Deposit",
    category: "Deposit",
    price: "$200",
    for: "Sorted cars ready for a scheduled hub dyno session.",
    summary:
      "Applied toward approved dyno tuning. Dyno tuning starts at $750 before final scope.",
    serviceSlug: "dyno-tuning",
    cta: "Reserve Slot"
  },
  {
    slug: "haltech-fitment-review",
    title: "Haltech Fitment Review",
    category: "Review",
    price: "$200",
    for: "Customers choosing ECU, IO, sensors, CAN, or fitment path.",
    summary:
      "Dealer-backed planning review for ECU selection, IO, sensors, CAN, and fitment path.",
    serviceSlug: "haltech-fitment",
    cta: "Plan Setup"
  },
  {
    slug: "build-consultation",
    title: "Build Consultation",
    category: "Consult",
    price: "$200",
    for: "Customers with a larger tuning, wiring, or staged build plan.",
    summary:
      "A focused technical consult for scope, priorities, readiness, and next steps.",
    serviceSlug: "wiring-harness",
    cta: "Book Consult"
  }
] as const;
