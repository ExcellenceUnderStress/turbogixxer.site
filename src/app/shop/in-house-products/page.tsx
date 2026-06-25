import { ShopCollectionPage } from "@/components/sections/shop-collection-page";

export const metadata = {
  title: "In-House Products"
};

export default function InHouseProductsPage() {
  return (
    <ShopCollectionPage
      collection="in-house-products"
      title="In-House Products"
      copy="TurboGixxer-built parts and service starters will be staged here when product, fulfillment, and checkout rules are ready."
    />
  );
}
