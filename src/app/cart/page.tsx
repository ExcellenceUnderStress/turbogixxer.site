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
        title="Review shop cart."
        copy="Review Haltech hardware, deposits, fitment reviews, and consults before submitting a checkout request."
      />
      <Section>
        <CartPage />
      </Section>
    </>
  );
}
