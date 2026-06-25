export type TuningDelivery = "dyno" | "remote" | "road" | "support";

export type EcuType = "factory_ecu" | "standalone_ecu" | "piggyback" | "unknown";

export type FulfillmentType =
  | "service_booking"
  | "manual_followup"
  | "scheduled_call"
  | "async_review"
  | "shipped_product";

export type BookingRequirements = {
  requiresCalendar: boolean;
  requiresIntake: boolean;
  tuningDelivery?: TuningDelivery;
  ecuType?: EcuType;
};
