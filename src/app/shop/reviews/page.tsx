import { ShopCollectionPage } from "@/components/sections/shop-collection-page";

export const metadata = {
  title: "Reviews"
};

export default function ReviewsPage() {
  return (
    <ShopCollectionPage
      collection="reviews"
      title="Reviews"
      copy="Paid review products cover fitment, build details, and support paths before parts, scheduling, or calibration decisions are made."
    />
  );
}
