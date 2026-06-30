#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const mediaBaseUrl = "https://media.turbogixxertuning.com";

function loadTs(relativePath, stubs = {}) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    }
  }).outputText;
  const compiledModule = { exports: {} };
  const localRequire = (id) => {
    if (id in stubs) {
      return stubs[id];
    }

    throw new Error(`Unstubbed import ${id} while loading ${relativePath}`);
  };

  new Function("require", "exports", "module", js)(localRequire, compiledModule.exports, compiledModule);

  return compiledModule.exports;
}

function duplicateValues(values) {
  const counts = new Map();

  for (const value of values.filter(Boolean)) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts].filter(([, count]) => count > 1).map(([value]) => value);
}

function productMediaUrls(product) {
  return [product.image, product.previewImage, product.detailImage, ...(product.galleryImages ?? [])].filter(Boolean);
}

function collectionCounts(products) {
  return products.reduce((counts, product) => {
    counts[product.collection] = (counts[product.collection] ?? 0) + 1;
    return counts;
  }, {});
}

function addFailure(failures, message, products = []) {
  const suffix = products.length ? ` (${products.slice(0, 8).join(", ")}${products.length > 8 ? ", ..." : ""})` : "";
  failures.push(`${message}${suffix}`);
}

const haltechModule = loadTs("src/content/haltech-products.ts", {
  "@/lib/media": {
    mediaUrl: (mediaPath) => `${mediaBaseUrl}${mediaPath}`
  },
  "@/lib/shop/types": {}
});
const shopModule = loadTs("src/content/shop-products.ts", {
  "@/content/haltech-products": haltechModule,
  "@/lib/shop/types": {}
});
const cartModule = loadTs("src/lib/shop/cart.ts");

const products = shopModule.shopProducts;
const activeProducts = products.filter((product) => product.status === "active");
const haltechProducts = products.filter((product) => product.collection === "haltech");
const pricedActiveProducts = activeProducts.filter(cartModule.hasFixedCartPrice);
const confirmationProducts = activeProducts.filter(cartModule.needsPriceConfirmation);
const failures = [];

const requiredFields = [
  "slug",
  "title",
  "brand",
  "collection",
  "category",
  "productType",
  "paymentMode",
  "fulfillmentType",
  "status",
  "priceLabel",
  "shortDescription",
  "longDescription",
  "image",
  "ctaLabel",
  "ctaHref",
  "notes"
];

const duplicateSlugs = duplicateValues(products.map((product) => product.slug));
const duplicateSkus = duplicateValues(products.map((product) => product.sku));
const missingCoreFields = activeProducts.filter((product) =>
  requiredFields.some((field) => product[field] === undefined || product[field] === null || product[field] === "")
);
const badHaltechMedia = haltechProducts.filter((product) =>
  productMediaUrls(product).some((url) => {
    const value = String(url);
    return !value.startsWith(`${mediaBaseUrl}/shop/`) || !/\.(avif|webp)$/.test(value);
  })
);
const priceLabelMismatches = activeProducts.filter((product) => {
  const fixedPriceLabel = /^\$[\d,]+$/.test(product.priceLabel);
  return fixedPriceLabel !== cartModule.hasFixedCartPrice(product);
});
const cartEligibleWithoutPrice = activeProducts.filter(
  (product) => cartModule.isCartEligibleProduct(product) && !cartModule.hasFixedCartPrice(product)
);
const confirmationWithoutContact = confirmationProducts.filter((product) => !product.ctaHref.startsWith("/contact?"));

if (duplicateSlugs.length) {
  addFailure(failures, "Duplicate product slugs", duplicateSlugs);
}

if (duplicateSkus.length) {
  addFailure(failures, "Duplicate product SKUs", duplicateSkus);
}

if (missingCoreFields.length) {
  addFailure(failures, "Active products missing required fields", missingCoreFields.map((product) => product.slug));
}

if (badHaltechMedia.length) {
  addFailure(failures, "Haltech products must use optimized /shop/ WebP or AVIF media", badHaltechMedia.map((product) => product.slug));
}

if (priceLabelMismatches.length) {
  addFailure(failures, "Fixed price labels and amountCents do not match", priceLabelMismatches.map((product) => product.slug));
}

if (cartEligibleWithoutPrice.length) {
  addFailure(failures, "Cart-eligible products must have fixed prices", cartEligibleWithoutPrice.map((product) => product.slug));
}

if (confirmationWithoutContact.length) {
  addFailure(failures, "Price-confirmation products must route to contact", confirmationWithoutContact.map((product) => product.slug));
}

console.log("Shop catalog audit");
console.log(`- Total products: ${products.length}`);
console.log(`- Active products: ${activeProducts.length}`);
console.log(`- Priced active products: ${pricedActiveProducts.length}`);
console.log(`- Price-confirmation products: ${confirmationProducts.length}`);
console.log(`- Haltech products: ${haltechProducts.length}`);
console.log(`- Collections: ${JSON.stringify(collectionCounts(products))}`);

if (failures.length) {
  console.error("\nFailures:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("OK: shop catalog is internally consistent.");
