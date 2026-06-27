# Product Integration Plan

Saved: 2026-06-27

## Summary

Build v1 commerce as a repo-managed product catalog backed by Stripe Checkout. Keep AWS focused on the existing media/CDN setup and optional low-cost order notification email. Do not make AWS the payment layer.

Use Stripe Checkout Sessions for one-time purchases because they fit the current static Next storefront, avoid a custom card form, and keep PCI/security scope low.

## Pricing And Fit

Stripe is the best overall fit for v1 product purchases:

- Stripe standard online card pricing is 2.9% + 30 cents per successful domestic card transaction, with additional fees for international cards, currency conversion, and manually entered cards.
- AWS SES outbound email pricing is low enough for order notification email at normal shop volume: 10 cents per 1,000 outbound emails, plus attachment data costs if used.
- DynamoDB is useful later for an internal order dashboard or fulfillment status workflow, but it adds tables, IAM, schema, failure handling, and reporting code that v1 does not need.

Reference pages:

- [Stripe pricing](https://stripe.com/pricing)
- [AWS SES pricing](https://aws.amazon.com/ses/pricing/)
- [AWS DynamoDB pricing](https://aws.amazon.com/dynamodb/pricing/)

## Key Changes

- Extend the existing `ShopProduct` model so every active purchasable product has a stable `sku`, `amountCents`, and fixed display price.
- Treat `src/content/shop-products.ts` as the v1 source of truth. Never trust product names, prices, or totals from the browser.
- Replace the current mailto checkout submit with a server endpoint that validates cart slugs and quantities before creating a Stripe Checkout Session.
- Add a Stripe webhook route for `checkout.session.completed`; use Stripe as the payment/order record and send an internal order email from the webhook.
- Use manual fulfillment for v1. Collect customer and shipping details through Stripe Checkout, but do not build inventory automation, tax automation, or shipping-rate automation yet.

## Interfaces

`POST /api/checkout`

Input:

```json
{
  "items": [{ "slug": "haltech-nexus-r3", "quantity": 1 }],
  "customerContext": {
    "vehicle": "1999 Civic",
    "notes": "Fitment notes or tuning context"
  }
}
```

Output:

```json
{
  "url": "https://checkout.stripe.com/..."
}
```

Validation rules:

- Reject unknown product slugs.
- Reject inactive, hidden, archived, staged, or unpriced products.
- Clamp or reject quantities that exceed the product maximum.
- Compute line items only from the server-side catalog.

Required environment variables:

```txt
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_SITE_URL=
ORDER_NOTIFY_EMAIL=
```

Optional SES variables:

```txt
AWS_REGION=
AWS_SES_FROM=
```

Stripe metadata should include:

- `slug`
- `sku`
- `productType`
- `collection`
- vehicle/context fields needed for fulfillment

## Test Plan

- API tests: unknown slug rejected, inactive product rejected, unpriced product rejected, invalid quantity rejected, and browser price spoofing impossible.
- Checkout tests: fixed-price cart creates the expected Stripe Checkout Session line items.
- Webhook tests: invalid signature returns 400 and completed checkout produces the expected internal order summary.
- Browser checks: add Haltech hardware to cart, click Checkout, route to Stripe Checkout, and confirm no cart copy shows review/quote language.
- Validation commands: `npm run lint`, `npm run typecheck`, and `npm run build`.

## Assumptions

- Fixed prices will be supplied for Haltech products before enabling live checkout.
- V1 sells to US customers only unless Stripe settings are expanded.
- Shipping and tax are manual for v1.
- Stripe remains the payment authority and order record for v1.
- DynamoDB is deferred until there is a real need for an internal order dashboard, fulfillment status system, or reporting workflow.
