import { ShopCollectionPage } from "@/components/sections/shop-collection-page";

export const metadata = {
  title: "Deposits"
};

export default function DepositsPage() {
  return (
    <ShopCollectionPage
      collection="deposits"
      title="Deposits"
      copy="The same $200 tuning deposit starts approved dyno or remote tuning intake. It is applied toward the approved tune and is not the full tuning price."
    />
  );
}
