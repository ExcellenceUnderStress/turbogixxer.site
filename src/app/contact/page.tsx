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
        copy="Choose the service path, document the build, confirm the deposit policy, and prepare a complete intake email before scheduling or payment."
      />
      <Section>
        <ContactIntakeForm initialIntent={initialIntent} initialService={initialService} />
      </Section>
      <CTASection
        title="Payment follows approval."
        copy="The frontend prepares the intake details first. TurboGixxer reviews the build, confirms scope, and then handles deposit and scheduling."
      />
    </>
  );
}
