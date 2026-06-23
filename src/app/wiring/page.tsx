import { ServiceFocusPage } from "@/components/sections/service-focus-page";
import { servicePages } from "@/content/services";

export const metadata = {
  title: "Wiring"
};

export default function WiringPage() {
  return <ServiceFocusPage page={servicePages.wiring} />;
}
