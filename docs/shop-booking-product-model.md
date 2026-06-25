# Shop, Booking, And Product Model

TurboGixxer separates service taxonomy from ecommerce products.

## Service Taxonomy

Top-level service categories:

- Dyno Tuning
- Remote Tuning
- Wiring / Harness Work
- Haltech Sales & Support

Factory ECU and standalone ECU are not top-level services. They are ECU/platform paths inside tuning:

- Factory ECU calibration
- Standalone ECU calibration

Dyno tuning is the in-person calibration service. Remote tuning is a separate delivery method. Both can support factory ECU or standalone ECU paths when the build, data, and tooling support it.

## Shop Collections

Shop remains the ecommerce system:

- Haltech
- Deposits
- Consults
- Reviews
- Wiring Add-ons
- In-House Products
- Fuel Injector Clinic
- Merch later

Haltech products live under:

- `/shop/haltech`
- `/shop/haltech/[slug]`

## Product Fields

Products should describe what is being sold and how it is fulfilled, instead of creating fake service categories.

- `productType`: `service_deposit`, `paid_consultation`, `paid_review`, `hardware_product`, `wiring_add_on`, `in_house_product`, or `merch`
- `paymentMode`: `deposit`, `paid_upfront`, `request_quote`, `coming_soon`, or `direct_checkout`
- `fulfillmentType`: `service_booking`, `manual_followup`, `scheduled_call`, `async_review`, or `shipped_product`
- `tuningDelivery`: `dyno`, `remote`, `road`, or `support`
- `ecuType`: `factory_ecu`, `standalone_ecu`, `piggyback`, or `unknown`
- `requiresCalendar`: whether scheduling is required
- `requiresIntake`: whether structured intake is required

## Examples

| Product | productType | paymentMode | fulfillmentType | tuningDelivery | ecuType | requiresCalendar | requiresIntake |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Dyno Session Deposit | `service_deposit` | `deposit` | `service_booking` | `dyno` | `unknown` | `true` | `true` |
| Remote Tune Deposit | `service_deposit` | `deposit` | `manual_followup` | `remote` | `unknown` | `false` | `true` |
| Build Consultation | `paid_consultation` | `paid_upfront` | `scheduled_call` | `support` | `unknown` | `true` | `true` |
| Haltech Fitment Review | `paid_review` | `paid_upfront` | `async_review` | `support` | `unknown` | `false` | `true` |
| Haltech Hardware | `hardware_product` | `request_quote` | `manual_followup` | `support` | `standalone_ecu` | `false` | `false` |

## Routing Rules

- Services page shows service lanes only.
- Tuning page explains dyno and remote tuning, then nests ECU platform paths under tuning.
- Shop page shows ecommerce collections.
- Deposit products start service workflows; they do not create separate services.
- Haltech products stay in Shop and can link to intake or quote workflows.
