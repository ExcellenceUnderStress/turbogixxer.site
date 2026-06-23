export const shopProducts = [
  {
    slug: "booking-deposit",
    title: "Booking Deposit",
    category: "Deposit",
    price: "$200",
    for: "Approved service scheduling after intake review.",
    summary:
      "Applied toward approved service. This is a scheduling deposit, not the full dyno tuning price.",
    cta: "Start Intake"
  },
  {
    slug: "remote-tune-deposit",
    title: "Remote Tune Deposit",
    category: "Deposit",
    price: "$200",
    for: "Mechanically ready builds that can provide complete logs.",
    summary:
      "Placeholder deposit path for future Stripe checkout and remote revision scheduling.",
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
    cta: "Reserve Slot"
  },
  {
    slug: "haltech-fitment-review",
    title: "Haltech Fitment Review",
    category: "Review",
    price: "$200",
    for: "Customers choosing ECU, IO, sensors, CAN, or fitment path.",
    summary:
      "Dealer-backed planning placeholder for future paid review and parts path.",
    cta: "Plan Setup"
  },
  {
    slug: "build-consultation",
    title: "Build Consultation",
    category: "Consult",
    price: "$200",
    for: "Customers with a larger tuning, wiring, or staged build plan.",
    summary:
      "A focused technical consult placeholder for scope, priorities, and next steps.",
    cta: "Book Consult"
  }
] as const;
