import { ContactIntakeForm } from "@/components/forms/contact-intake-form";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Contact"
};

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | Array<string> | undefined>>;
};

function firstParam(value: string | Array<string> | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = searchParams ? await searchParams : {};
  const initialIntent = firstParam(params.intent);
  const initialService = firstParam(params.service);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start with the build details."
        copy="Choose the service path, document the build, confirm the deposit policy, and prepare the intake for deposit checkout, day selection, and review."
      />
      <Section>
        <ContactIntakeForm initialIntent={initialIntent} initialService={initialService} />
      </Section>
      <CTASection
        title="Deposit and day selection come before review."
        copy="This form prepares the build details and deposit-policy acknowledgement first. The $200 deposit and selected day are handled before TurboGixxer reviews readiness, scope, and service-path fit."
      />
    </>
  );
}
