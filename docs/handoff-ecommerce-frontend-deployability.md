# Ecommerce Frontend And Deployability Handoff

Date: 2026-06-30
Repo: `/Users/hhhh/Documents/GitHub/turbogixxer.site`
Baseline commit: `df48f34 Finalize ecommerce cart gating`

## Current State

Ecommerce is in a safe order-request state, not a live payment-checkout state.

- Haltech catalog is active at `/shop/haltech`.
- Product detail routes are generated for all 246 Haltech products under `/shop/haltech/[slug]`.
- Optimized Haltech media uses the production CDN `/shop/` prefix through `mediaUrl()`.
- Priced active products can be added to cart and reviewed at `/cart`.
- Active products without `amountCents` now show `Confirm price` and route to `/contact?...` instead of entering the cart.
- The cart page prepares a mailto order request; it does not create a Stripe Checkout Session yet.
- `npm run verify:shop` audits catalog safety rules:
  - no duplicate product slugs or SKUs
  - active products have required fields
  - Haltech media stays on optimized `https://media.turbogixxertuning.com/shop/...` WebP/AVIF URLs
  - cart-eligible products have fixed prices
  - price-confirmation products route to contact

Known catalog split at the baseline commit:

- Total products: 249
- Haltech products: 246
- Priced active products: 126
- Price-confirmation products: 123

## Frontend Next Steps

1. Add shop filtering and navigation for a large catalog.
   - Category filters: ECU / VCU, Display, CAN Control, Harness.
   - Price state filters: fixed price, confirm price.
   - Optional search by title, family, SKU, and category.

2. Improve the Haltech collection page for scanning.
   - Add category count summary near the top.
   - Add a direct section jump nav for ECU / VCU, Display, CAN Control, and Harness.
   - Keep SKUs hidden on customer-facing Haltech cards unless there is a deliberate reason to expose them.

3. Tighten product detail conversion paths.
   - Priced products: keep `Add to cart`.
   - Unpriced products: keep `Confirm price` and make the confirmation copy explicit about inventory, fitment, and final price.
   - Consider showing a compact "what to confirm" list on unpriced product detail pages.

4. Finish mobile QA across the shop.
   - Mobile header/cart drawer.
   - Long Haltech product titles.
   - Product gallery image containment.
   - Category sections and filter controls once added.

5. Keep rendered verification as part of done.
   - `/shop`
   - `/shop/haltech`
   - one priced Haltech product
   - one unpriced Haltech product
   - `/cart`
   - `/contact?intent=<haltech-slug>`

## Deployability Next Steps

The current site can build and deploy as a static/order-request storefront. It is not ready for live card checkout until the server-side checkout path is implemented.

Required before live payment checkout:

1. Add Stripe Checkout.
   - Add the Stripe SDK.
   - Implement `POST /api/checkout`.
   - Validate cart slugs and quantities server-side from the repo catalog.
   - Reject unknown, inactive, hidden, staged, unpriced, or quantity-invalid products.
   - Build Stripe line items only from server-side `amountCents`, title, SKU, and quantity.

2. Add Stripe webhook handling.
   - Implement `checkout.session.completed`.
   - Verify webhook signatures.
   - Use Stripe as the payment/order authority.
   - Send internal order notification email from the webhook.

3. Configure deployment environment variables.

```txt
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_SITE_URL=
ORDER_NOTIFY_EMAIL=
```

Optional email variables if using SES for internal notifications:

```txt
AWS_REGION=
AWS_SES_FROM=
```

4. Decide fulfillment limits before enabling live checkout.
   - US-only or broader shipping.
   - Manual shipping and tax for v1, or Stripe-managed tax/shipping rules.
   - Whether any Haltech products require inventory gating before payment.

5. Run deployment validation before switching payment copy live.

```bash
npm install
npm run verify:shop
npm run lint
npm run typecheck
npm run build
```

Browser checks before deploy:

- Add a priced Haltech product to cart.
- Confirm order review shows the correct item, quantity, and subtotal.
- Confirm an unpriced Haltech product routes to contact and does not enter the cart.
- Confirm mobile cart drawer and order-review page work.
- After Stripe is implemented, confirm checkout redirects to Stripe and webhook events are received in the target environment.

## Current Deployment Caveat

Do not describe the current cart as completed checkout or payment capture. Until Stripe Checkout is implemented, the correct language is order review, order request, fitment confirmation, or price confirmation.

## Suggested Next Thread Prompt

Implement the next ecommerce deployability step in `/Users/hhhh/Documents/GitHub/turbogixxer.site` using a task worktree. Start from `origin/main`, preserve the current optimized Haltech media gate, and keep npm-only validation. Build Stripe Checkout only for fixed-price cart-eligible products, reject unpriced products server-side, and keep browser QA for `/shop/haltech`, priced product cart flow, unpriced confirm-price flow, and `/cart`.
