# Shop, Booking, And Product Model

TurboGixxer separates service taxonomy from ecommerce products.

## Service Taxonomy

Top-level service categories:

- Dyno Tuning
- Remote Tuning
- Wiring 

Dyno tuning is the in-person calibration service. Remote tuning is a separate delivery method. Both can support factory ECU or standalone ECU paths when the build, data, and tooling support it.

## Shop Collections

Shop remains the ecommerce system:

- Haltech
- In-House Products
- Fuel Injector Clinic
- Merch

Haltech products live under:

- `/shop/haltech`
- `/shop/haltech/[slug]`
