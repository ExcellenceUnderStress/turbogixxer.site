import { ShopCollectionPage } from "@/components/sections/shop-collection-page";

export const metadata = {
  title: "Planning Products"
};

export default function PlanningProductsPage() {
  return (
    <ShopCollectionPage
      collection="reviews"
      title="Planning Products"
      copy="Paid planning products cover fitment, build details, and support needs before parts, scheduling, or calibration decisions are made."
    />
  );
}
