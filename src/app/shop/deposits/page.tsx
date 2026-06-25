import { ShopCollectionPage } from "@/components/sections/shop-collection-page";

export const metadata = {
  title: "Deposits"
};

export default function DepositsPage() {
  return (
    <ShopCollectionPage
      collection="deposits"
      title="Deposits"
      copy="Service deposits start approved dyno or remote tuning workflows. They are applied toward approved service and are not full tuning prices."
    />
  );
}
