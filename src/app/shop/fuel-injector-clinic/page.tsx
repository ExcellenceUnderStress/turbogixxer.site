import { ShopCollectionPage } from "@/components/sections/shop-collection-page";

export const metadata = {
  title: "Fuel Injector Clinic"
};

export default function FuelInjectorClinicPage() {
  return (
    <ShopCollectionPage
      collection="fuel-injector-clinic"
      title="Fuel Injector Clinic"
      copy="Injector and fuel-system products will be staged here with build review before ordering where required."
    />
  );
}
