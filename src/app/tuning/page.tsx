import { ServiceFocusPage } from "@/components/sections/service-focus-page";
import { servicePages } from "@/content/services";

export const metadata = {
  title: "Tuning"
};

export default function TuningPage() {
  return <ServiceFocusPage page={servicePages.tuning} />;
}
