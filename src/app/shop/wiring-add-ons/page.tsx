import { ShopCollectionPage } from "@/components/sections/shop-collection-page";

export const metadata = {
  title: "Wiring Add-ons"
};

export default function WiringAddOnsPage() {
  return (
    <ShopCollectionPage
      collection="wiring-add-ons"
      title="Wiring Add-ons"
      copy="Harness, sensor, relay, and CAN add-ons will live here as Shop products without replacing wiring service scope."
    />
  );
}
