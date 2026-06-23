import { ServiceFocusPage } from "@/components/sections/service-focus-page";
import { servicePages } from "@/content/services";

export const metadata = {
  title: "Haltech"
};

export default function HaltechPage() {
  return <ServiceFocusPage page={servicePages.haltech} />;
}
