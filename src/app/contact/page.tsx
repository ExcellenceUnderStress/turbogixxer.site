import { ContactFormPlaceholder } from "@/components/forms/contact-form-placeholder";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start with the build details."
        copy="This frontend form is shaped for future intake automation. For now, it establishes the technical questions TurboGixxer needs before scheduling or quoting."
      />
      <Section>
        <ContactFormPlaceholder />
      </Section>
      <CTASection
        title="Backend wiring comes later."
        copy="DynamoDB, SES, Stripe, and calendar integrations can connect to this intake shape without changing the customer journey."
      />
    </>
  );
}
