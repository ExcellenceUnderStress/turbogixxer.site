import { ShopCollectionPage } from "@/components/sections/shop-collection-page";

export const metadata = {
  title: "Reviews"
};

export default function ReviewsPage() {
  return (
    <ShopCollectionPage
      collection="reviews"
      title="Reviews"
      copy="Paid reviews cover fitment, build details, and support needs before parts, scheduling, or calibration decisions are made."
    />
  );
}
