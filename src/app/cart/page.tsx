import { CartPage } from "@/components/shop/cart-page";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Cart"
};

export default function CartRoutePage() {
  return (
    <>
      <PageHeader
        eyebrow="Cart"
        title="Order review."
        copy="Review priced Haltech hardware, deposits, planning products, and consults before sending the order request."
      />
      <Section>
        <CartPage />
      </Section>
    </>
  );
}
