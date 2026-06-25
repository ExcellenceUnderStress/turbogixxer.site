import { ShopCollectionPage } from "@/components/sections/shop-collection-page";

export const metadata = {
  title: "Consults"
};

export default function ConsultsPage() {
  return (
    <ShopCollectionPage
      collection="consults"
      title="Consults"
      copy="Paid consults cover scope, readiness, priorities, and next steps before a larger tuning, wiring, or staged build plan moves forward."
    />
  );
}
